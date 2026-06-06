'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import { validateCLABE, validateCoDiPhone } from '@/lib/validators/codi';
import {
  generateCoDiPayload,
  validateCoDiData,
  type CoDiData,
} from '@/lib/standards/codi';

// ── Types ─────────────────────────────────────────────────────────────────────

type RecipientType = 'clabe' | 'phone';

type FormState = {
  recipientType: RecipientType;
  clabe: string;
  phone: string;
  merchantName: string;
  concept: string;
  amount: string;
  reference: string;
};

const INITIAL_FORM: FormState = {
  recipientType: 'clabe',
  clabe: '',
  phone: '',
  merchantName: '',
  concept: '',
  amount: '',
  reference: '',
};

function formatMXN(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function CoDiGenerator() {
  const t = useTranslations('codi');

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  const clabeValidation = form.clabe.trim() ? validateCLABE(form.clabe) : null;
  const phoneValidation = form.phone.trim() ? validateCoDiPhone(form.phone) : null;

  const recipientValid =
    form.recipientType === 'clabe'
      ? (clabeValidation?.valid ?? false)
      : (phoneValidation?.valid ?? false);

  const canGenerate =
    recipientValid &&
    form.merchantName.trim().length > 0 &&
    form.concept.trim().length > 0 &&
    form.amount !== '' &&
    !isNaN(parseFloat(form.amount)) &&
    parseFloat(form.amount) > 0 &&
    /^\d{1,7}$/.test(form.reference.trim());

  const coDiData: CoDiData | null = canGenerate
    ? {
        concept: form.concept,
        amount: parseFloat(form.amount),
        reference: form.reference,
        clabe: form.recipientType === 'clabe' ? form.clabe : undefined,
        phone: form.recipientType === 'phone' ? form.phone : undefined,
        merchantName: form.merchantName,
      }
    : null;

  const currentPayload = coDiData ? generateCoDiPayload(coDiData) : null;

  // ── QR Code generation ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!canvasRef.current || !currentPayload) {
      setQrReady(false);
      return;
    }
    QRCode.toCanvas(canvasRef.current, currentPayload, {
      width: 256,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#0F172A', light: '#FFFFFF' },
    })
      .then(() => setQrReady(true))
      .catch(() => setQrReady(false));
  }, [currentPayload]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleBlur = useCallback(
    (field: keyof FormState) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (coDiData) {
        setErrors(validateCoDiData(coDiData));
      }
    },
    [coDiData],
  );

  const handleRecipientTypeChange = (type: RecipientType) => {
    setForm((f) => ({ ...f, recipientType: type, clabe: '', phone: '' }));
    setTouched({});
    setErrors({});
  };

  const handleDownload = useCallback(() => {
    if (!canvasRef.current || !qrReady) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `codi-${(form.clabe || form.phone).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [qrReady, form.clabe, form.phone]);

  const handleCopy = useCallback(async () => {
    if (!currentPayload) return;
    try {
      await navigator.clipboard.writeText(currentPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available — silent fail
    }
  }, [currentPayload]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── Left: Form ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">

        {/* CoDi Warning Banner */}
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-3">
          <span className="text-lg leading-none mt-0.5">⚠️</span>
          <p className="text-sm text-orange-800 leading-snug">{t('codiWarning')}</p>
        </div>

        {/* Recipient Type Toggle */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('recipientTypeLabel')}
          </label>
          <div className="flex gap-2">
            {(['clabe', 'phone'] as RecipientType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleRecipientTypeChange(type)}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium border transition-colors ${
                  form.recipientType === type
                    ? 'bg-green-700 text-white border-green-700 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {type === 'clabe' ? '🏦 CLABE' : '📱 Teléfono'}
              </button>
            ))}
          </div>
        </div>

        {/* CLABE or Phone */}
        {form.recipientType === 'clabe' ? (
          <FormField
            label={t('clabeLabel')}
            required
            error={touched.clabe ? (clabeValidation?.valid === false ? clabeValidation.error : undefined) : undefined}
            hint={
              clabeValidation?.valid && clabeValidation.bankName ? (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full text-xs font-medium">
                  🏦 {clabeValidation.bankName}
                </span>
              ) : clabeValidation?.valid ? (
                <span className="text-blue-600 flex items-center gap-1 text-xs">
                  <CheckIcon /> {t('bankDetected')}
                </span>
              ) : undefined
            }
          >
            <div className="relative">
              <input
                type="text"
                value={form.clabe}
                onChange={(e) => setForm((f) => ({ ...f, clabe: e.target.value.replace(/\D/g, '').slice(0, 18) }))}
                onBlur={() => handleBlur('clabe')}
                placeholder={t('clabePlaceholder')}
                autoComplete="off"
                inputMode="numeric"
                className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  touched.clabe && clabeValidation?.valid === false
                    ? 'border-red-300 bg-red-50'
                    : clabeValidation?.valid
                      ? 'border-green-300 bg-green-50'
                      : 'border-slate-200 bg-white'
                }`}
              />
              {form.clabe.trim() && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {clabeValidation?.valid
                    ? <CheckIcon className="text-green-600" />
                    : <XIcon className="text-red-400" />}
                </div>
              )}
            </div>
            {form.clabe && (
              <p className="text-xs text-slate-400 mt-0.5">{form.clabe.length}/18 digits</p>
            )}
          </FormField>
        ) : (
          <FormField
            label={t('phoneLabel')}
            required
            error={touched.phone ? (phoneValidation?.valid === false ? phoneValidation.error : undefined) : undefined}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">
                +52
              </span>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                onBlur={() => handleBlur('phone')}
                placeholder={t('phonePlaceholder')}
                autoComplete="off"
                inputMode="numeric"
                className={`w-full pl-12 pr-10 py-2.5 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  touched.phone && phoneValidation?.valid === false
                    ? 'border-red-300 bg-red-50'
                    : phoneValidation?.valid
                      ? 'border-green-300 bg-green-50'
                      : 'border-slate-200 bg-white'
                }`}
              />
              {form.phone.trim() && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {phoneValidation?.valid
                    ? <CheckIcon className="text-green-600" />
                    : <XIcon className="text-red-400" />}
                </div>
              )}
            </div>
          </FormField>
        )}

        {/* Merchant/Beneficiary Name */}
        <FormField
          label={t('merchantNameLabel')}
          required
          error={touched.merchantName ? errors.merchantName : undefined}
        >
          <input
            type="text"
            value={form.merchantName}
            onChange={(e) => setForm((f) => ({ ...f, merchantName: e.target.value }))}
            onBlur={() => handleBlur('merchantName')}
            placeholder="JUAN PÉREZ GARCÍA"
            maxLength={50}
            className={inputClass(!!touched.merchantName && !!errors.merchantName)}
          />
        </FormField>

        {/* Concept */}
        <FormField
          label={t('conceptLabel')}
          required
          error={touched.concept ? errors.concept : undefined}
          hint={
            form.concept.trim() ? (
              <span className="text-xs text-slate-400">{form.concept.trim().length}/35</span>
            ) : undefined
          }
        >
          <input
            type="text"
            value={form.concept}
            onChange={(e) => setForm((f) => ({ ...f, concept: e.target.value }))}
            onBlur={() => handleBlur('concept')}
            placeholder={t('conceptPlaceholder')}
            maxLength={35}
            className={inputClass(!!touched.concept && !!errors.concept)}
          />
        </FormField>

        {/* Amount MXN (REQUIRED) */}
        <FormField
          label={t('amountLabel')}
          required
          error={touched.amount ? errors.amount : undefined}
          hint={
            form.amount && !isNaN(parseFloat(form.amount)) ? (
              <span className="text-slate-500 text-xs font-medium">{formatMXN(form.amount)}</span>
            ) : undefined
          }
        >
          <div className="space-y-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium select-none">
                $
              </span>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                onBlur={() => handleBlur('amount')}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                className={`${inputClass(!!touched.amount && !!errors.amount)} pl-7`}
              />
            </div>
            <p className="text-xs text-amber-600">{t('amountRequired')}</p>
          </div>
        </FormField>

        {/* Referencia Numérica */}
        <FormField
          label={t('referenceLabel')}
          required
          error={touched.reference ? errors.reference : undefined}
        >
          <div className="space-y-1">
            <input
              type="text"
              value={form.reference}
              onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value.replace(/\D/g, '').slice(0, 7) }))}
              onBlur={() => handleBlur('reference')}
              placeholder={t('referencePlaceholder')}
              inputMode="numeric"
              className={`${inputClass(!!touched.reference && !!errors.reference)} font-mono`}
            />
            <p className="text-xs text-slate-400">{t('referenceHelp')}</p>
          </div>
        </FormField>
      </div>

      {/* ── Right: QR Preview ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center gap-5">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider self-start">
          QR Code Preview
        </h2>

        {canGenerate ? (
          <>
            <div className={`transition-opacity duration-300 ${qrReady ? 'opacity-100' : 'opacity-0'}`}>
              <canvas ref={canvasRef} className="rounded-xl border border-slate-100 shadow-sm" />
            </div>

            {!qrReady && <div className="w-64 h-64 rounded-xl bg-slate-100 animate-pulse" />}

            {qrReady && (
              <>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">SPEI/CoDi</span>
                  <span>✓ Banxico format</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                    style={{ backgroundColor: '#006847' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005538')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#006847')}
                  >
                    <DownloadIcon />
                    {t('downloadPng')}
                  </button>
                  <button
                    onClick={handleCopy}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${
                      copied
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {copied ? <CheckIcon className="text-green-600" /> : <ClipboardIcon />}
                    {copied ? t('copied') : t('copyPayload')}
                  </button>
                </div>

                <p className="text-xs text-slate-400 text-center">{t('scanWith')}</p>
                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  BBVA México · Santander MX · Banorte · HSBC México · Citibanamex · Mercado Pago MX
                </p>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-400 max-w-[200px]">
              Fill in CLABE or phone, name, concept, amount and reference to generate
            </p>
          </div>
        )}

        {!canGenerate && <canvas ref={canvasRef} className="hidden" />}
      </div>
    </div>
  );
}

// ── Helper Components ──────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 ${
    hasError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'
  }`;
}

type FormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
};

function FormField({ label, required, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <XIcon className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10"
      />
    </svg>
  );
}
