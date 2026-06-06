'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import { validateDuitNowKey, detectDuitNowKeyType, type DuitNowKeyType } from '@/lib/validators/duitnow';
import {
  generateDuitNowPayload,
  validateDuitNowData,
  type DuitNowData,
} from '@/lib/standards/duitnow';

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  proxyValue:   string;
  merchantName: string;
  merchantCity: string;
  amount:       string;
  referenceId:  string;
  billDetails:  string;
};

const INITIAL_FORM: FormState = {
  proxyValue:   '',
  merchantName: '',
  merchantCity: '',
  amount:       '',
  referenceId:  '',
  billDetails:  '',
};

// ── MYR formatting ────────────────────────────────────────────────────────────

function formatMYR(raw: string): string {
  const n = parseFloat(raw);
  if (isNaN(n) || n <= 0) return '';
  return `RM ${n.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Key type badge ────────────────────────────────────────────────────────────

const KEY_TYPE_META: Record<DuitNowKeyType, { icon: string; labelKey: string }> = {
  mobile:   { icon: '📱', labelKey: 'mobile' },
  ic:       { icon: '🪪', labelKey: 'ic' },
  passport: { icon: '📘', labelKey: 'passport' },
  business: { icon: '🏢', labelKey: 'business' },
  others:   { icon: '🔑', labelKey: 'others' },
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function DuitNowGenerator() {
  const t = useTranslations('duitnow');

  const [form, setForm]               = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched]         = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [copied, setCopied]           = useState(false);
  const [qrReady, setQrReady]         = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  const keyValidation = form.proxyValue.trim()
    ? validateDuitNowKey(form.proxyValue)
    : null;
  const keyValid = keyValidation?.valid ?? false;
  const keyError = keyValidation?.valid === false ? keyValidation.error : undefined;
  const detectedType = form.proxyValue.trim()
    ? detectDuitNowKeyType(form.proxyValue)
    : null;

  const canGenerate =
    keyValid &&
    form.merchantName.trim().length > 0 &&
    form.merchantCity.trim().length > 0;

  const amountNum = form.amount ? parseFloat(form.amount) : undefined;

  const duitnowData: DuitNowData | null = canGenerate
    ? {
        proxyType:    keyValidation!.type!,
        proxyValue:   form.proxyValue,
        merchantName: form.merchantName,
        merchantCity: form.merchantCity,
        amount:       amountNum && amountNum > 0 ? amountNum : undefined,
        referenceId:  form.referenceId || undefined,
        billDetails:  form.billDetails || undefined,
      }
    : null;

  const currentPayload = duitnowData ? generateDuitNowPayload(duitnowData) : null;

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
      if (!duitnowData) return;
      setErrors(validateDuitNowData(duitnowData));
    },
    [duitnowData],
  );

  const handleDownload = useCallback(() => {
    if (!canvasRef.current || !qrReady) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href     = url;
      a.download = `duitnow-${form.merchantName.replace(/\s+/g, '-').toLowerCase()}.png`;
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

        {/* DuitNow ID */}
        <FormField
          label={t('keyLabel')}
          required
          error={touched.proxyValue ? keyError : undefined}
          hint={
            detectedType && keyValid ? (
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                {KEY_TYPE_META[detectedType].icon}{' '}
                {t(`keyTypes.${detectedType}` as Parameters<typeof t>[0])}
              </span>
            ) : detectedType && !keyValid ? (
              <span className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                {KEY_TYPE_META[detectedType].icon}{' '}
                {t(`keyTypes.${detectedType}` as Parameters<typeof t>[0])}
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <input
              type="text"
              value={form.proxyValue}
              onChange={(e) => setForm((f) => ({ ...f, proxyValue: e.target.value }))}
              onBlur={() => handleBlur('proxyValue')}
              placeholder={t('keyPlaceholder')}
              autoComplete="off"
              spellCheck={false}
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                touched.proxyValue && keyError
                  ? 'border-red-300 bg-red-50'
                  : keyValid && form.proxyValue.trim()
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
              }`}
            />
            {form.proxyValue.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {keyValid ? (
                  <CheckIcon className="text-emerald-500" />
                ) : (
                  <XIcon className="text-red-400" />
                )}
              </div>
            )}
          </div>
        </FormField>

        {/* Merchant Name */}
        <FormField
          label={t('merchantNameLabel')}
          required
          error={touched.merchantName ? errors.merchantName : undefined}
          hint={
            <span className={form.merchantName.length > 20 ? 'text-amber-500 text-xs' : 'text-slate-400 text-xs'}>
              {form.merchantName.length}/25
            </span>
          }
        >
          <input
            type="text"
            value={form.merchantName}
            onChange={(e) => setForm((f) => ({ ...f, merchantName: e.target.value }))}
            onBlur={() => handleBlur('merchantName')}
            placeholder="Ahmad Trading Sdn Bhd"
            maxLength={25}
            className={inputClass(!!touched.merchantName && !!errors.merchantName)}
          />
        </FormField>

        {/* Merchant City */}
        <FormField
          label={t('merchantCityLabel')}
          required
          error={touched.merchantCity ? errors.merchantCity : undefined}
          hint={
            <span className={form.merchantCity.length > 12 ? 'text-amber-500 text-xs' : 'text-slate-400 text-xs'}>
              {form.merchantCity.length}/15
            </span>
          }
        >
          <input
            type="text"
            value={form.merchantCity}
            onChange={(e) => setForm((f) => ({ ...f, merchantCity: e.target.value }))}
            onBlur={() => handleBlur('merchantCity')}
            placeholder="KUALA LUMPUR"
            maxLength={15}
            className={inputClass(!!touched.merchantCity && !!errors.merchantCity)}
          />
        </FormField>

        {/* Amount MYR */}
        <FormField
          label={t('amountLabel')}
          error={touched.amount ? errors.amount : undefined}
          hint={
            form.amount && parseFloat(form.amount) > 0 ? (
              <span className="text-slate-500 text-xs font-medium">
                {formatMYR(form.amount)}
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium select-none">
              RM
            </span>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              onBlur={() => handleBlur('amount')}
              placeholder="0.00"
              min="0.01"
              max="9999999.99"
              step="0.01"
              className={`${inputClass(!!touched.amount && !!errors.amount)} pl-10`}
            />
          </div>
        </FormField>

        {/* Advanced Settings */}
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
            <div className="mt-4 space-y-4">
              <FormField
                label={t('referenceIdLabel')}
                error={touched.referenceId ? errors.referenceId : undefined}
              >
                <input
                  type="text"
                  value={form.referenceId}
                  onChange={(e) => setForm((f) => ({ ...f, referenceId: e.target.value }))}
                  onBlur={() => handleBlur('referenceId')}
                  placeholder="INV-2026-001"
                  maxLength={25}
                  className={`${inputClass(!!touched.referenceId && !!errors.referenceId)} font-mono`}
                />
              </FormField>
              <FormField
                label={t('billDetailsLabel')}
                error={touched.billDetails ? errors.billDetails : undefined}
                hint={
                  <span className="text-slate-400 text-xs">{form.billDetails.length}/99</span>
                }
              >
                <input
                  type="text"
                  value={form.billDetails}
                  onChange={(e) => setForm((f) => ({ ...f, billDetails: e.target.value }))}
                  onBlur={() => handleBlur('billDetails')}
                  placeholder="Monthly invoice"
                  maxLength={99}
                  className={inputClass(!!touched.billDetails && !!errors.billDetails)}
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
            <div className={`transition-opacity duration-300 ${qrReady ? 'opacity-100' : 'opacity-0'}`}>
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
                {currentPayload && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">
                      CRC16: {currentPayload.slice(-4)}
                    </span>
                    <span>✓ PayNet-validated</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                    style={{ backgroundColor: '#CC0001' }}
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

                <p className="text-xs text-slate-400 text-center">{t('scanWith')}</p>
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
              Enter your DuitNow ID, merchant name and city to generate the QR code
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
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
    hasError
      ? 'border-red-300 bg-red-50'
      : 'border-slate-200 bg-white hover:border-slate-300'
  }`;
}

type FormFieldProps = {
  label:    string;
  required?: boolean;
  error?:   string;
  hint?:    React.ReactNode;
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
