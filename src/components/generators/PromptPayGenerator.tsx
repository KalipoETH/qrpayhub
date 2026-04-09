'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import {
  validatePromptPayKey,
  detectPromptPayKeyType,
  type PromptPayKeyType,
} from '@/lib/validators/promptpay';
import {
  generatePromptPayPayload,
  validatePromptPayData,
  type PromptPayData,
} from '@/lib/standards/promptpay';

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  promptPayKey: string;
  amount: string;
  ref1: string;
};

const INITIAL_FORM: FormState = {
  promptPayKey: '',
  amount: '',
  ref1: '',
};

// Key type badge config
const KEY_TYPE_CONFIG: Record<PromptPayKeyType, { icon: string; colorClass: string }> = {
  phone:      { icon: '📱', colorClass: 'bg-green-50 text-green-700 border-green-200' },
  nationalId: { icon: '🪪', colorClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  taxId:      { icon: '🏢', colorClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  ewallet:    { icon: '💳', colorClass: 'bg-amber-50 text-amber-700 border-amber-200' },
};

// ── Thai THB formatting ───────────────────────────────────────────────────────

function formatTHB(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  return `฿${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function PromptPayGenerator() {
  const t = useTranslations('promptpay');

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  const keyValidation = form.promptPayKey.trim() ? validatePromptPayKey(form.promptPayKey) : null;
  const detectedType = form.promptPayKey.trim() ? detectPromptPayKeyType(form.promptPayKey) : null;
  const keyValid = keyValidation?.valid ?? false;
  const keyError = keyValidation?.valid === false ? keyValidation.error : undefined;

  const canGenerate = keyValid;

  const promptPayData: PromptPayData | null = canGenerate
    ? {
        promptPayKey: form.promptPayKey,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        ref1: form.ref1 || undefined,
      }
    : null;

  const currentPayload = promptPayData ? generatePromptPayPayload(promptPayData) : null;

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
      const newErrors = validatePromptPayData({
        promptPayKey: form.promptPayKey,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        ref1: form.ref1 || undefined,
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
      a.download = `promptpay-${form.promptPayKey.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [qrReady, form.promptPayKey]);

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

        {/* PromptPay Key */}
        <FormField
          label={t('keyLabel')}
          required
          error={touched.promptPayKey ? keyError : undefined}
          hint={
            keyValid && form.promptPayKey.trim() ? (
              <span className="text-blue-600 flex items-center gap-1">
                <CheckIcon /> Valid
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <input
              type="text"
              value={form.promptPayKey}
              onChange={(e) => setForm((f) => ({ ...f, promptPayKey: e.target.value }))}
              onBlur={() => handleBlur('promptPayKey')}
              placeholder={t('keyPlaceholder')}
              autoComplete="off"
              spellCheck={false}
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.promptPayKey && keyError
                  ? 'border-red-300 bg-red-50'
                  : keyValid && form.promptPayKey.trim()
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-slate-200 bg-white'
              }`}
            />
            {form.promptPayKey.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {keyValid ? (
                  <CheckIcon className="text-blue-500" />
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
                {t('keyDetected')}: {t(`keyTypes.${detectedType}` as Parameters<typeof t>[0])}
              </span>
            </div>
          )}

          <p className="text-xs text-slate-400 mt-1">{t('keyHelp')}</p>
        </FormField>

        {/* Amount (THB) */}
        <FormField
          label={t('amountLabel')}
          error={touched.amount ? errors.amount : undefined}
          hint={
            form.amount && !isNaN(parseFloat(form.amount)) ? (
              <span className="text-slate-500 text-xs font-medium">
                {formatTHB(form.amount)}
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium select-none">
              ฿
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
              className={`${inputClass(!!touched.amount && !!errors.amount)} pl-7`}
            />
          </div>
        </FormField>

        {/* Advanced: Reference */}
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
                label={t('refLabel')}
                error={touched.ref1 ? errors.ref1 : undefined}
              >
                <input
                  type="text"
                  value={form.ref1}
                  onChange={(e) => setForm((f) => ({ ...f, ref1: e.target.value }))}
                  onBlur={() => handleBlur('ref1')}
                  placeholder="INV-2026-001"
                  maxLength={25}
                  className={`${inputClass(!!touched.ref1 && !!errors.ref1)} font-mono`}
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
                {/* CRC badge */}
                {currentPayload && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">
                      CRC16: {currentPayload.slice(-4)}
                    </span>
                    <span>✓ PromptPay-validated</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                    style={{ backgroundColor: '#1A56DB' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1648C0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1A56DB')}
                  >
                    <DownloadIcon />
                    {t('downloadPng')}
                  </button>
                  <button
                    onClick={handleCopy}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${
                      copied
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {copied ? <CheckIcon className="text-blue-500" /> : <ClipboardIcon />}
                    {copied ? t('copied') : t('copyPayload')}
                  </button>
                </div>

                {/* Scan hint */}
                <p className="text-xs text-slate-400 text-center">{t('scanWith')}</p>

                {/* Compatible apps */}
                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  Bangkok Bank · Kasikorn (KBank) · SCB · Krungthai · TMBThanachart (ttb)
                </p>
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
              Enter a PromptPay key to generate the QR code
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
