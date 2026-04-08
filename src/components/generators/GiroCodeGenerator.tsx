'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import { validateIBAN, formatIBAN } from '@/lib/validators/iban';
import {
  generateGiroCodePayload,
  validateGiroCodeData,
  type GiroCodeErrors,
} from '@/lib/standards/girocode';

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  iban: string;
  name: string;
  amount: string;
  reference: string;
  bic: string;
};

const INITIAL_FORM: FormState = {
  iban: '',
  name: '',
  amount: '',
  reference: '',
  bic: '',
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function GiroCodeGenerator() {
  const t = useTranslations('girocode');

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors] = useState<GiroCodeErrors>({});
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  const ibanValid = form.iban.trim()
    ? validateIBAN(form.iban).valid
    : false;

  const canGenerate = ibanValid && form.name.trim().length > 0;

  const currentPayload = canGenerate
    ? generateGiroCodePayload({
        iban: form.iban,
        name: form.name,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        reference: form.reference || undefined,
        bic: form.bic || undefined,
      })
    : null;

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

  const handleIBANChange = useCallback((raw: string) => {
    // Allow only letters, digits, spaces
    const stripped = raw.replace(/[^A-Za-z0-9 ]/g, '').toUpperCase();
    // Reformat with spaces every 4 chars
    const formatted = formatIBAN(stripped);
    setForm((f) => ({ ...f, iban: formatted }));
  }, []);

  const handleBlur = useCallback(
    (field: keyof FormState) => {
      setTouched((t) => ({ ...t, [field]: true }));
      const newErrors = validateGiroCodeData({
        iban: form.iban,
        name: form.name,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        reference: form.reference || undefined,
        bic: form.bic || undefined,
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
      a.download = `girocode-${form.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [qrReady, form.name]);

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

        {/* IBAN */}
        <FormField
          label={t('ibanLabel')}
          required
          error={touched.iban ? errors.iban : undefined}
          hint={
            ibanValid && form.iban.trim()
              ? <span className="text-emerald-600 flex items-center gap-1">
                  <CheckIcon /> Valid IBAN
                </span>
              : undefined
          }
        >
          <div className="relative">
            <input
              type="text"
              value={form.iban}
              onChange={(e) => handleIBANChange(e.target.value)}
              onBlur={() => handleBlur('iban')}
              placeholder={t('ibanPlaceholder')}
              autoComplete="off"
              spellCheck={false}
              maxLength={42} // 34 chars + spaces
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.iban && errors.iban
                  ? 'border-red-300 bg-red-50'
                  : ibanValid && form.iban.trim()
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
              }`}
            />
            {form.iban.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {ibanValid ? (
                  <CheckIcon className="text-emerald-500" />
                ) : (
                  <XIcon className="text-red-400" />
                )}
              </div>
            )}
          </div>
        </FormField>

        {/* Recipient Name */}
        <FormField
          label={t('nameLabel')}
          required
          error={touched.name ? errors.name : undefined}
        >
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            onBlur={() => handleBlur('name')}
            placeholder={t('namePlaceholder')}
            maxLength={70}
            className={inputClass(touched.name && !!errors.name)}
          />
        </FormField>

        {/* Amount */}
        <FormField
          label={t('amountLabel')}
          error={touched.amount ? errors.amount : undefined}
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium select-none">
              €
            </span>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              onBlur={() => handleBlur('amount')}
              placeholder="0.00"
              min="0.01"
              max="999999999.99"
              step="0.01"
              className={`${inputClass(touched.amount && !!errors.amount)} pl-7`}
            />
          </div>
        </FormField>

        {/* Reference */}
        <FormField
          label={t('referenceLabel')}
          error={touched.reference ? errors.reference : undefined}
          hint={
            <span className={form.reference.length > 120 ? 'text-amber-500' : 'text-slate-400'}>
              {form.reference.length}/140
            </span>
          }
        >
          <input
            type="text"
            value={form.reference}
            onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
            onBlur={() => handleBlur('reference')}
            placeholder={t('referencePlaceholder')}
            maxLength={140}
            className={inputClass(touched.reference && !!errors.reference)}
          />
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
            <div className="mt-4">
              <FormField label={t('bicLabel')}>
                <input
                  type="text"
                  value={form.bic}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bic: e.target.value.toUpperCase() }))
                  }
                  placeholder="DEUTDEDB"
                  maxLength={11}
                  autoComplete="off"
                  spellCheck={false}
                  className={`${inputClass(false)} font-mono`}
                />
              </FormField>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: QR Preview ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center gap-6">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider self-start">
          {t('qrPreview')}
        </h2>

        {canGenerate ? (
          <>
            {/* Canvas (always in DOM so useEffect can target it) */}
            <div className={`transition-opacity duration-300 ${qrReady ? 'opacity-100' : 'opacity-0'}`}>
              <canvas
                ref={canvasRef}
                className="rounded-xl border border-slate-100 shadow-sm"
              />
            </div>

            {!qrReady && (
              <div className="w-64 h-64 rounded-xl bg-slate-100 animate-pulse" />
            )}

            {/* Action buttons */}
            {qrReady && (
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
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
                  {copied ? t('copied') : t('copyClipboard')}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Placeholder when form is empty */
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <p className="text-sm text-slate-400 max-w-[200px]">
              {t('fillForm')}
            </p>
          </div>
        )}

        {/* Canvas hidden when not ready to prevent layout shift */}
        {!canGenerate && (
          <canvas ref={canvasRef} className="hidden" />
        )}
      </div>
    </div>
  );
}

// ── Helper Components ──────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
