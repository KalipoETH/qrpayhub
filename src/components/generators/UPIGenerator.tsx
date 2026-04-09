'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import { validateUPIId } from '@/lib/validators/upi';
import {
  generateUPIPayload,
  getUPIAppLinks,
  validateUPIData,
  type UPIData,
} from '@/lib/standards/upi';

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  payeeVPA: string;
  payeeName: string;
  amount: string;
  transactionNote: string;
  merchantCode: string;
  transactionRef: string;
};

const INITIAL_FORM: FormState = {
  payeeVPA: '',
  payeeName: '',
  amount: '',
  transactionNote: '',
  merchantCode: '',
  transactionRef: '',
};

// ── Indian number formatting (Lakh system) ─────────────────────────────────

function formatINR(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  const [integer, decimal] = num.toFixed(2).split('.');
  const lastThree = integer.slice(-3);
  const rest = integer.slice(0, -3);
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree : lastThree;
  return `₹${grouped}.${decimal}`;
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function UPIGenerator() {
  const t = useTranslations('upi');

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  const upiValid = form.payeeVPA.trim() ? validateUPIId(form.payeeVPA).valid : false;
  const upiError = form.payeeVPA.trim() ? validateUPIId(form.payeeVPA).error : undefined;

  const canGenerate = upiValid && form.payeeName.trim().length > 0;

  const upiData: UPIData | null = canGenerate
    ? {
        payeeVPA: form.payeeVPA,
        payeeName: form.payeeName,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        transactionNote: form.transactionNote || undefined,
        merchantCode: form.merchantCode || undefined,
        transactionRef: form.transactionRef || undefined,
      }
    : null;

  const currentPayload = upiData ? generateUPIPayload(upiData) : null;
  const appLinks = upiData ? getUPIAppLinks(upiData) : null;

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
      const newErrors = validateUPIData({
        payeeVPA: form.payeeVPA,
        payeeName: form.payeeName,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        transactionNote: form.transactionNote || undefined,
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
      a.download = `upi-${form.payeeName.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [qrReady, form.payeeName]);

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

        {/* UPI ID */}
        <FormField
          label={t('upiIdLabel')}
          required
          error={touched.payeeVPA ? upiError : undefined}
          hint={
            upiValid && form.payeeVPA.trim() ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckIcon /> Valid UPI ID
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <input
              type="text"
              value={form.payeeVPA}
              onChange={(e) => setForm((f) => ({ ...f, payeeVPA: e.target.value.trim() }))}
              onBlur={() => handleBlur('payeeVPA')}
              placeholder={t('upiIdPlaceholder')}
              autoComplete="off"
              spellCheck={false}
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                touched.payeeVPA && upiError
                  ? 'border-red-300 bg-red-50'
                  : upiValid && form.payeeVPA.trim()
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
              }`}
            />
            {form.payeeVPA.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {upiValid ? (
                  <CheckIcon className="text-emerald-500" />
                ) : (
                  <XIcon className="text-red-400" />
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">{t('upiIdHelp')}</p>
        </FormField>

        {/* Recipient Name */}
        <FormField
          label={t('payeeNameLabel')}
          required
          error={touched.payeeName ? errors.payeeName : undefined}
        >
          <input
            type="text"
            value={form.payeeName}
            onChange={(e) => setForm((f) => ({ ...f, payeeName: e.target.value }))}
            onBlur={() => handleBlur('payeeName')}
            placeholder="Rahul Sharma"
            maxLength={50}
            className={inputClass(!!touched.payeeName && !!errors.payeeName)}
          />
        </FormField>

        {/* Amount */}
        <FormField
          label={t('amountLabel')}
          error={touched.amount ? errors.amount : undefined}
          hint={
            form.amount && !isNaN(parseFloat(form.amount)) ? (
              <span className="text-slate-500 text-xs font-medium">
                {formatINR(form.amount)}
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium select-none">
              ₹
            </span>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              onBlur={() => handleBlur('amount')}
              placeholder="0.00"
              min="0.01"
              max="100000"
              step="0.01"
              className={`${inputClass(!!touched.amount && !!errors.amount)} pl-7`}
            />
          </div>
        </FormField>

        {/* Note */}
        <FormField
          label={t('noteLabel')}
          error={touched.transactionNote ? errors.transactionNote : undefined}
          hint={
            <span
              className={
                form.transactionNote.length > 40 ? 'text-amber-500 text-xs' : 'text-slate-400 text-xs'
              }
            >
              {form.transactionNote.length}/50
            </span>
          }
        >
          <input
            type="text"
            value={form.transactionNote}
            onChange={(e) => setForm((f) => ({ ...f, transactionNote: e.target.value }))}
            onBlur={() => handleBlur('transactionNote')}
            placeholder="Payment for Invoice #1234"
            maxLength={50}
            className={inputClass(!!touched.transactionNote && !!errors.transactionNote)}
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
            <div className="mt-4 space-y-4">
              <FormField label={t('merchantCodeLabel')}>
                <input
                  type="text"
                  value={form.merchantCode}
                  onChange={(e) => setForm((f) => ({ ...f, merchantCode: e.target.value }))}
                  placeholder="5411"
                  maxLength={4}
                  className={`${inputClass(false)} font-mono`}
                />
              </FormField>
              <FormField label={t('transactionRefLabel')}>
                <input
                  type="text"
                  value={form.transactionRef}
                  onChange={(e) => setForm((f) => ({ ...f, transactionRef: e.target.value }))}
                  placeholder="TXN2026001"
                  maxLength={35}
                  className={inputClass(false)}
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
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
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
                    {copied ? t('copied') : t('copyLink')}
                  </button>
                </div>

                {/* Scan hint */}
                <p className="text-xs text-slate-400 text-center">{t('scanWith')}</p>

                {/* App deep links – mobile only */}
                {appLinks && (
                  <div className="w-full border-t border-slate-100 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      {t('openInApp')}
                    </p>
                    <div className="flex md:hidden gap-2">
                      <a
                        href={appLinks.phonepe}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold rounded-xl hover:bg-purple-100 transition-colors"
                      >
                        📱 PhonePe
                      </a>
                      <a
                        href={appLinks.gpay}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        🔵 GPay
                      </a>
                      <a
                        href={appLinks.paytm}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold rounded-xl hover:bg-sky-100 transition-colors"
                      >
                        💙 Paytm
                      </a>
                    </div>
                    <p className="hidden md:block text-xs text-slate-400">
                      Open on mobile to launch UPI apps directly.
                    </p>
                  </div>
                )}
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
              Enter a UPI ID and recipient name to generate the QR code
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
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
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
