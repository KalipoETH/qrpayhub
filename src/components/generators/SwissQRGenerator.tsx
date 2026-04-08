'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import { validateSwissIBAN } from '@/lib/validators/swiss-qr';
import { formatIBAN } from '@/lib/validators/iban';
import {
  generateSwissQRPayload,
  validateSwissQRData,
  type SwissQRData,
} from '@/lib/standards/swiss-qr';

// ── Types ─────────────────────────────────────────────────────────────────────

type ReferenceType = 'QRR' | 'SCOR' | 'NON';
type Currency = 'CHF' | 'EUR';

type FormState = {
  iban: string;
  creditorName: string;
  creditorStreet: string;
  creditorCity: string;
  creditorCountry: 'CH' | 'LI';
  amount: string;
  currency: Currency;
  referenceType: ReferenceType;
  reference: string;
  message: string;
  debtorName: string;
  debtorCity: string;
  debtorCountry: string;
};

const INITIAL_FORM: FormState = {
  iban: '',
  creditorName: '',
  creditorStreet: '',
  creditorCity: '',
  creditorCountry: 'CH',
  amount: '',
  currency: 'CHF',
  referenceType: 'NON',
  reference: '',
  message: '',
  debtorName: '',
  debtorCity: '',
  debtorCountry: 'CH',
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function SwissQRGenerator() {
  const t = useTranslations('swissQr');

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [debtorOpen, setDebtorOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  const ibanValid = form.iban.trim() ? validateSwissIBAN(form.iban).valid : false;
  const ibanError = form.iban.trim() ? validateSwissIBAN(form.iban).error : undefined;

  const canGenerate = ibanValid && form.creditorName.trim().length > 0 && form.creditorCity.trim().length > 0;

  const currentPayload = canGenerate
    ? generateSwissQRPayload({
        iban: form.iban,
        creditorName: form.creditorName,
        creditorStreet: form.creditorStreet || undefined,
        creditorCity: form.creditorCity,
        creditorCountry: form.creditorCountry,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        currency: form.currency,
        referenceType: form.referenceType,
        reference: form.reference || undefined,
        message: form.message || undefined,
        debtorName: form.debtorName || undefined,
        debtorCity: form.debtorCity || undefined,
        debtorCountry: form.debtorCountry || undefined,
      } as SwissQRData)
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
    const stripped = raw.replace(/[^A-Za-z0-9 ]/g, '').toUpperCase();
    const formatted = formatIBAN(stripped);
    setForm((f) => ({ ...f, iban: formatted }));
  }, []);

  const handleBlur = useCallback(
    (field: keyof FormState) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const newErrors = validateSwissQRData({
        iban: form.iban,
        creditorName: form.creditorName,
        creditorStreet: form.creditorStreet || undefined,
        creditorCity: form.creditorCity,
        creditorCountry: form.creditorCountry,
        amount: form.amount ? parseFloat(form.amount) : undefined,
        currency: form.currency,
        referenceType: form.referenceType,
        reference: form.reference || undefined,
        message: form.message || undefined,
      } as SwissQRData);
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
      a.download = `swiss-qr-${form.creditorName.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [qrReady, form.creditorName]);

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
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">

        {/* ── Creditor Section ──────────────────────────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Creditor (You)
          </h3>

          {/* IBAN */}
          <FormField
            label={t('ibanLabel')}
            required
            error={touched.iban ? ibanError : undefined}
            hint={
              ibanValid && form.iban.trim() ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckIcon /> Valid Swiss IBAN
                </span>
              ) : undefined
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
                maxLength={30}
                className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  touched.iban && ibanError
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

          {/* Name */}
          <FormField
            label={t('creditorNameLabel')}
            required
            error={touched.creditorName ? errors.creditorName : undefined}
          >
            <input
              type="text"
              value={form.creditorName}
              onChange={(e) => setForm((f) => ({ ...f, creditorName: e.target.value }))}
              onBlur={() => handleBlur('creditorName')}
              placeholder="Muster AG"
              maxLength={70}
              className={inputClass(!!touched.creditorName && !!errors.creditorName)}
            />
          </FormField>

          {/* Street (optional) */}
          <FormField label="Street (optional)">
            <input
              type="text"
              value={form.creditorStreet}
              onChange={(e) => setForm((f) => ({ ...f, creditorStreet: e.target.value }))}
              placeholder="Musterstrasse 1"
              maxLength={70}
              className={inputClass(false)}
            />
          </FormField>

          {/* City + Country row */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label={t('creditorCityLabel')}
              required
              error={touched.creditorCity ? errors.creditorCity : undefined}
            >
              <input
                type="text"
                value={form.creditorCity}
                onChange={(e) => setForm((f) => ({ ...f, creditorCity: e.target.value }))}
                onBlur={() => handleBlur('creditorCity')}
                placeholder="Zürich"
                maxLength={35}
                className={inputClass(!!touched.creditorCity && !!errors.creditorCity)}
              />
            </FormField>

            <FormField label={t('creditorCountryLabel')}>
              <select
                value={form.creditorCountry}
                onChange={(e) =>
                  setForm((f) => ({ ...f, creditorCountry: e.target.value as 'CH' | 'LI' }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                <option value="CH">🇨🇭 CH</option>
                <option value="LI">🇱🇮 LI</option>
              </select>
            </FormField>
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* ── Payment Details ───────────────────────────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Payment Details
          </h3>

          {/* Amount + Currency */}
          <FormField
            label={t('amountLabel')}
            error={touched.amount ? errors.amount : undefined}
          >
            <div className="flex gap-2">
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                onBlur={() => handleBlur('amount')}
                placeholder="0.00"
                min="0.01"
                max="999999999.99"
                step="0.01"
                className={`flex-1 px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  touched.amount && errors.amount
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              />
              {/* Currency toggle */}
              <div className="flex rounded-xl border border-slate-200 overflow-hidden flex-shrink-0">
                {(['CHF', 'EUR'] as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, currency: cur }))}
                    className={`px-3 py-2.5 text-sm font-semibold transition-colors ${
                      form.currency === cur
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </FormField>

          {/* Reference Type */}
          <FormField label={t('referenceTypeLabel')}>
            <div className="flex flex-wrap gap-2">
              {([
                { value: 'QRR', label: 'QR-Referenz (QRR)' },
                { value: 'SCOR', label: 'Creditor Ref (SCOR)' },
                { value: 'NON', label: 'Keine (NON)' },
              ] as { value: ReferenceType; label: string }[]).map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm cursor-pointer transition-colors ${
                    form.referenceType === value
                      ? 'bg-red-50 border-red-200 text-red-700 font-medium'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="referenceType"
                    value={value}
                    checked={form.referenceType === value}
                    onChange={() =>
                      setForm((f) => ({ ...f, referenceType: value, reference: '' }))
                    }
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </FormField>

          {/* Reference field (conditional) */}
          {form.referenceType !== 'NON' && (
            <FormField
              label={t('referenceLabel')}
              required
              error={touched.reference ? errors.reference : undefined}
            >
              <input
                type="text"
                value={form.reference}
                onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                onBlur={() => handleBlur('reference')}
                placeholder={
                  form.referenceType === 'QRR'
                    ? '210000000003139471430009017'
                    : 'RF18539007547034'
                }
                maxLength={form.referenceType === 'QRR' ? 27 : 25}
                className={`${inputClass(!!touched.reference && !!errors.reference)} font-mono`}
              />
            </FormField>
          )}

          {/* Message */}
          <FormField
            label={t('messageLabel')}
            error={touched.message ? errors.message : undefined}
            hint={
              <span
                className={
                  form.message.length > 120 ? 'text-amber-500 text-xs' : 'text-slate-400 text-xs'
                }
              >
                {form.message.length}/140
              </span>
            }
          >
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              onBlur={() => handleBlur('message')}
              placeholder="Rechnung Nr. 2026-001"
              maxLength={140}
              rows={2}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 resize-none ${
                touched.message && errors.message
                  ? 'border-red-300 bg-red-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            />
          </FormField>
        </div>

        {/* ── Debtor Section (collapsible) ──────────────────────────────── */}
        <div className="border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setDebtorOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${debtorOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {t('debtorSection')}
          </button>

          {debtorOpen && (
            <div className="mt-4 space-y-4">
              <FormField label={t('debtorNameLabel')}>
                <input
                  type="text"
                  value={form.debtorName}
                  onChange={(e) => setForm((f) => ({ ...f, debtorName: e.target.value }))}
                  placeholder="Max Muster"
                  maxLength={70}
                  className={inputClass(false)}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField label={t('debtorCityLabel')}>
                  <input
                    type="text"
                    value={form.debtorCity}
                    onChange={(e) => setForm((f) => ({ ...f, debtorCity: e.target.value }))}
                    placeholder="Bern"
                    maxLength={35}
                    className={inputClass(false)}
                  />
                </FormField>

                <FormField label="Country">
                  <select
                    value={form.debtorCountry}
                    onChange={(e) => setForm((f) => ({ ...f, debtorCountry: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  >
                    <option value="CH">🇨🇭 CH</option>
                    <option value="LI">🇱🇮 LI</option>
                    <option value="DE">🇩🇪 DE</option>
                    <option value="AT">🇦🇹 AT</option>
                    <option value="FR">🇫🇷 FR</option>
                    <option value="IT">🇮🇹 IT</option>
                  </select>
                </FormField>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: QR Preview ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center gap-6">
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
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
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

            {/* Swiss QR Note */}
            <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              ⚠️ {t('swissQrNote')}
            </div>
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
              Fill in IBAN, name and city to generate Swiss QR Code
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
