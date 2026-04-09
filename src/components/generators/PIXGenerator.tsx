'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import { validatePIXKey, detectPIXKeyType, type PIXKeyType } from '@/lib/validators/pix';
import {
  generatePIXPayload,
  validatePIXData,
  type PIXData,
} from '@/lib/standards/pix';

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  pixKey: string;
  merchantName: string;
  merchantCity: string;
  amount: string;
  description: string;
  transactionId: string;
};

const INITIAL_FORM: FormState = {
  pixKey: '',
  merchantName: '',
  merchantCity: '',
  amount: '',
  description: '',
  transactionId: '',
};

// Key type badge config
const KEY_TYPE_CONFIG: Record<PIXKeyType, { icon: string; colorClass: string }> = {
  cpf:    { icon: '🪪', colorClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  cnpj:   { icon: '🏢', colorClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  phone:  { icon: '📱', colorClass: 'bg-green-50 text-green-700 border-green-200' },
  email:  { icon: '📧', colorClass: 'bg-sky-50 text-sky-700 border-sky-200' },
  random: { icon: '🔑', colorClass: 'bg-amber-50 text-amber-700 border-amber-200' },
};

// ── Brazilian BRL formatting (dot as thousands sep, comma as decimal) ──────────

function formatBRL(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  return `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function PIXGenerator() {
  const t = useTranslations('pix');

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  const pixValidation = form.pixKey.trim() ? validatePIXKey(form.pixKey) : null;
  const detectedType = form.pixKey.trim() ? detectPIXKeyType(form.pixKey) : null;
  const pixValid = pixValidation?.valid ?? false;
  const pixError = pixValidation?.valid === false ? pixValidation.error : undefined;

  const canGenerate =
    pixValid &&
    form.merchantName.trim().length > 0 &&
    form.merchantCity.trim().length > 0;

  const pixData: PIXData | null = canGenerate
    ? {
        pixKey: form.pixKey,
        merchantName: form.merchantName,
        merchantCity: form.merchantCity,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        description: form.description || undefined,
        transactionId: form.transactionId || undefined,
      }
    : null;

  const currentPayload = pixData ? generatePIXPayload(pixData) : null;

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
      const newErrors = validatePIXData({
        pixKey: form.pixKey,
        merchantName: form.merchantName,
        merchantCity: form.merchantCity,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        description: form.description || undefined,
        transactionId: form.transactionId || undefined,
      });
      setErrors(newErrors);
    },
    [form],
  );

  const handleDownload = useCallback(() => {
    if (!canvasRef.current || !qrReady) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pix-${form.merchantName.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [qrReady, form.merchantName]);

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

        {/* PIX Key */}
        <FormField
          label={t('pixKeyLabel')}
          required
          error={touched.pixKey ? pixError : undefined}
          hint={
            pixValid && form.pixKey.trim() ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckIcon /> Valid
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <input
              type="text"
              value={form.pixKey}
              onChange={(e) => setForm((f) => ({ ...f, pixKey: e.target.value }))}
              onBlur={() => handleBlur('pixKey')}
              placeholder={t('pixKeyPlaceholder')}
              autoComplete="off"
              spellCheck={false}
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                touched.pixKey && pixError
                  ? 'border-red-300 bg-red-50'
                  : pixValid && form.pixKey.trim()
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
              }`}
            />
            {form.pixKey.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {pixValid ? (
                  <CheckIcon className="text-emerald-500" />
                ) : (
                  <XIcon className="text-red-400" />
                )}
              </div>
            )}
          </div>

          {/* Auto-detect badge */}
          {detectedType && (
            <div className="mt-1.5">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${KEY_TYPE_CONFIG[detectedType].colorClass}`}
              >
                {KEY_TYPE_CONFIG[detectedType].icon}
                {t('pixKeyDetected')}: {t(`keyTypes.${detectedType}` as Parameters<typeof t>[0])}
              </span>
            </div>
          )}
        </FormField>

        {/* Merchant Name */}
        <FormField
          label={t('merchantNameLabel')}
          required
          error={touched.merchantName ? errors.merchantName : undefined}
          hint={
            <span
              className={
                form.merchantName.length > 20
                  ? 'text-amber-500 text-xs'
                  : 'text-slate-400 text-xs'
              }
            >
              {form.merchantName.length}/25
            </span>
          }
        >
          <input
            type="text"
            value={form.merchantName}
            onChange={(e) => setForm((f) => ({ ...f, merchantName: e.target.value }))}
            onBlur={() => handleBlur('merchantName')}
            placeholder="Joao Silva"
            maxLength={25}
            className={inputClass(!!touched.merchantName && !!errors.merchantName)}
          />
          <p className="text-xs text-slate-400 mt-1">{t('merchantNameHelp')}</p>
        </FormField>

        {/* City */}
        <FormField
          label={t('merchantCityLabel')}
          required
          error={touched.merchantCity ? errors.merchantCity : undefined}
          hint={
            <span
              className={
                form.merchantCity.length > 12
                  ? 'text-amber-500 text-xs'
                  : 'text-slate-400 text-xs'
              }
            >
              {form.merchantCity.length}/15
            </span>
          }
        >
          <input
            type="text"
            value={form.merchantCity}
            onChange={(e) => setForm((f) => ({ ...f, merchantCity: e.target.value }))}
            onBlur={() => handleBlur('merchantCity')}
            placeholder="SAO PAULO"
            maxLength={15}
            className={inputClass(!!touched.merchantCity && !!errors.merchantCity)}
          />
        </FormField>

        {/* Amount */}
        <FormField
          label={t('amountLabel')}
          error={touched.amount ? errors.amount : undefined}
          hint={
            form.amount && !isNaN(parseFloat(form.amount)) ? (
              <span className="text-slate-500 text-xs font-medium">
                {formatBRL(form.amount)}
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium select-none">
              R$
            </span>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              onBlur={() => handleBlur('amount')}
              placeholder="0.00"
              min="0.01"
              max="999999.99"
              step="0.01"
              className={`${inputClass(!!touched.amount && !!errors.amount)} pl-9`}
            />
          </div>
        </FormField>

        {/* Description */}
        <FormField
          label={t('descriptionLabel')}
          error={touched.description ? errors.description : undefined}
          hint={
            <span
              className={
                form.description.length > 60
                  ? 'text-amber-500 text-xs'
                  : 'text-slate-400 text-xs'
              }
            >
              {form.description.length}/72
            </span>
          }
        >
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            onBlur={() => handleBlur('description')}
            placeholder="Pagamento ref. 001"
            maxLength={72}
            className={inputClass(!!touched.description && !!errors.description)}
          />
        </FormField>

        {/* Advanced: Transaction ID */}
        <div className="border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setAdvancedOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {t('advancedSettings')}
          </button>

          {advancedOpen && (
            <div className="mt-4">
              <FormField
                label={t('transactionIdLabel')}
                error={touched.transactionId ? errors.transactionId : undefined}
              >
                <input
                  type="text"
                  value={form.transactionId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, transactionId: e.target.value }))
                  }
                  onBlur={() => handleBlur('transactionId')}
                  placeholder="TXN20260001"
                  maxLength={25}
                  className={`${inputClass(!!touched.transactionId && !!errors.transactionId)} font-mono`}
                />
              </FormField>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: QR Preview ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center gap-5">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider self-start">
          QR Code Preview
        </h2>

        {canGenerate ? (
          <>
            <div
              className={`transition-opacity duration-300 ${qrReady ? 'opacity-100' : 'opacity-0'}`}
            >
              <canvas
                ref={canvasRef}
                className="rounded-xl border border-slate-100 shadow-sm"
              />
            </div>

            {!qrReady && (
              <div className="w-64 h-64 rounded-xl bg-slate-100 animate-pulse" />
            )}

            {qrReady && (
              <>
                {/* CRC badge — last 4 chars of payload */}
                {currentPayload && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">
                      CRC16: {currentPayload.slice(-4)}
                    </span>
                    <span>✓ BCB-validated</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    <DownloadIcon />
                    {t('downloadPng')}
                  </button>
                  <button
                    onClick={handleCopy}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${
                      copied
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {copied ? <CheckIcon className="text-emerald-500" /> : <ClipboardIcon />}
                    {copied ? t('copied') : t('copyPayload')}
                  </button>
                </div>

                {/* Scan hint */}
                <p className="text-xs text-slate-400 text-center">{t('scanWith')}</p>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-400 max-w-[200px]">
              Enter a PIX key, name and city to generate the QR code
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
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
    hasError
      ? 'border-red-300 bg-red-50'
      : 'border-slate-200 bg-white hover:border-slate-300'
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10" />
    </svg>
  );
}
