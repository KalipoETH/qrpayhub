'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import {
  validateVietnameseBankAccount,
  validateVietQRBin,
  VIETQR_BANKS,
} from '@/lib/validators/vietqr';
import {
  generateVietQRPayload,
  validateVietQRData,
  type VietQRData,
} from '@/lib/standards/vietqr';

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  bankBinSelect:  string;   // preset dropdown value or 'other'
  bankBinManual:  string;   // free-text when 'other' selected
  accountNumber:  string;
  accountName:    string;
  amount:         string;
  description:    string;
};

const INITIAL_FORM: FormState = {
  bankBinSelect:  '',
  bankBinManual:  '',
  accountNumber:  '',
  accountName:    '',
  amount:         '',
  description:    '',
};

// ── Bank dropdown options ─────────────────────────────────────────────────────

type BankOption = { bin: string; label: string };

const BANK_OPTIONS: BankOption[] = [
  { bin: '970436', label: 'Vietcombank (970436)' },
  { bin: '970418', label: 'BIDV (970418)' },
  { bin: '970405', label: 'Agribank (970405)' },
  { bin: '970415', label: 'Vietinbank (970415)' },
  { bin: '970407', label: 'Techcombank (970407)' },
  { bin: '970422', label: 'MB Bank (970422)' },
  { bin: '970432', label: 'VPBank (970432)' },
  { bin: '970423', label: 'TPBank (970423)' },
  { bin: '970403', label: 'Sacombank (970403)' },
  { bin: '970425', label: 'ABBank (970425)' },
  { bin: '970431', label: 'Eximbank (970431)' },
];

// ── VND formatting ────────────────────────────────────────────────────────────

function formatVND(raw: string): string {
  const n = parseInt(raw, 10);
  if (isNaN(n) || n <= 0) return '';
  return `${n.toLocaleString('vi-VN')} đ`;
}

const QUICK_AMOUNTS = [50_000, 100_000, 200_000, 500_000];

// ── Main Component ─────────────────────────────────────────────────────────────

export default function VietQRGenerator() {
  const t = useTranslations('vietqr');

  const [form, setForm]               = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched]         = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [copied, setCopied]           = useState(false);
  const [qrReady, setQrReady]         = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Derived state ──────────────────────────────────────────────────────────

  const isOther    = form.bankBinSelect === 'other';
  const activeBin  = isOther ? form.bankBinManual : form.bankBinSelect;
  const binResult  = activeBin.trim() ? validateVietQRBin(activeBin) : null;
  const binValid   = binResult?.valid ?? false;
  const bankName   = binResult?.bankName ?? (activeBin ? VIETQR_BANKS[activeBin.trim()] : undefined);

  const acctResult = form.accountNumber.trim()
    ? validateVietnameseBankAccount(form.accountNumber)
    : null;
  const acctValid = acctResult?.valid ?? false;

  const canGenerate =
    binValid &&
    acctValid &&
    form.accountName.trim().length > 0;

  const amountInt = form.amount ? parseInt(form.amount, 10) : undefined;

  const vietqrData: VietQRData | null = canGenerate
    ? {
        bankBin:       activeBin.trim(),
        accountNumber: form.accountNumber.trim(),
        accountName:   form.accountName,
        amount:        amountInt && amountInt > 0 ? amountInt : undefined,
        description:   form.description || undefined,
      }
    : null;

  const currentPayload = vietqrData ? generateVietQRPayload(vietqrData) : null;

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
      if (!vietqrData) return;
      setErrors(validateVietQRData(vietqrData));
    },
    [vietqrData],
  );

  const handleDownload = useCallback(() => {
    if (!canvasRef.current || !qrReady) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href     = url;
      a.download = `vietqr-${form.accountName.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [qrReady, form.accountName]);

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

        {/* Bank Selection */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            {t('bankLabel')}
            <span className="text-red-400 ml-0.5">*</span>
          </label>
          <div className="relative">
            <select
              value={form.bankBinSelect}
              onChange={(e) => setForm((f) => ({
                ...f,
                bankBinSelect: e.target.value,
                bankBinManual: '',
              }))}
              onBlur={() => handleBlur('bankBinSelect')}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm appearance-none bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 ${
                !form.bankBinSelect ? 'text-slate-400' : 'text-slate-800'
              } border-slate-200 hover:border-slate-300`}
            >
              <option value="" disabled>Select a bank...</option>
              {BANK_OPTIONS.map(({ bin, label }) => (
                <option key={bin} value={bin}>{label}</option>
              ))}
              <option value="other">Other (enter BIN manually)</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Bank name badge */}
          {bankName && !isOther && (
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckIcon className="w-3 h-3" /> {bankName}
            </p>
          )}

          {/* Manual BIN input */}
          {isOther && (
            <div className="space-y-1">
              <input
                type="text"
                value={form.bankBinManual}
                onChange={(e) => setForm((f) => ({ ...f, bankBinManual: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                onBlur={() => handleBlur('bankBinManual')}
                placeholder="6-digit BIN"
                maxLength={6}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 ${
                  form.bankBinManual.length === 6 && binValid
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
                }`}
              />
              {bankName && (
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" /> {bankName}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Account Number */}
        <FormField
          label={t('accountNumberLabel')}
          required
          error={touched.accountNumber ? acctResult?.error : undefined}
          hint={
            acctValid && form.accountNumber.trim() ? (
              <span className="text-emerald-600 flex items-center gap-1 text-xs">
                <CheckIcon /> Valid
              </span>
            ) : undefined
          }
        >
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={form.accountNumber}
              onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value.replace(/\D/g, '') }))}
              onBlur={() => handleBlur('accountNumber')}
              placeholder="Số tài khoản"
              maxLength={19}
              className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 ${
                touched.accountNumber && acctResult?.error
                  ? 'border-red-300 bg-red-50'
                  : acctValid && form.accountNumber.trim()
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
              }`}
            />
            {form.accountNumber.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {acctValid
                  ? <CheckIcon className="text-emerald-500" />
                  : <XIcon className="text-red-400" />}
              </div>
            )}
          </div>
        </FormField>

        {/* Account Name */}
        <FormField
          label={t('accountNameLabel')}
          required
          error={touched.accountName ? errors.accountName : undefined}
          hint={
            <span className={form.accountName.length > 40 ? 'text-amber-500 text-xs' : 'text-slate-400 text-xs'}>
              {form.accountName.length}/50
            </span>
          }
        >
          <input
            type="text"
            value={form.accountName}
            onChange={(e) => setForm((f) => ({ ...f, accountName: e.target.value.toUpperCase() }))}
            onBlur={() => handleBlur('accountName')}
            placeholder="NGUYEN VAN A"
            maxLength={50}
            className={`${inputClass(!!touched.accountName && !!errors.accountName)} uppercase font-mono`}
          />
          <p className="text-xs text-slate-400 mt-1">{t('accountNameHelp')}</p>
        </FormField>

        {/* Amount VND */}
        <div className="space-y-2">
          <FormField
            label={t('amountLabel')}
            error={touched.amount ? errors.amount : undefined}
            hint={
              form.amount && parseInt(form.amount, 10) > 0 ? (
                <span className="text-slate-500 text-xs font-medium">
                  {formatVND(form.amount)}
                </span>
              ) : undefined
            }
          >
            <div className="relative">
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                onBlur={() => handleBlur('amount')}
                placeholder="0"
                min="1"
                step="1000"
                className={`${inputClass(!!touched.amount && !!errors.amount)} pr-8`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none pointer-events-none">
                đ
              </span>
            </div>
          </FormField>

          {/* Quick amount buttons */}
          <div className="flex gap-2">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setForm((f) => ({ ...f, amount: String(amt) }))}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  form.amount === String(amt)
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {t(`quickAmounts.${amt === 50_000 ? '50k' : amt === 100_000 ? '100k' : amt === 200_000 ? '200k' : '500k'}` as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <FormField
          label={t('descriptionLabel')}
          error={touched.description ? errors.description : undefined}
          hint={<span className="text-slate-400 text-xs">{form.description.length}/50</span>}
        >
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            onBlur={() => handleBlur('description')}
            placeholder="Thanh toan hoa don / Payment description"
            maxLength={50}
            className={inputClass(!!touched.description && !!errors.description)}
          />
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
                {currentPayload && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">
                      CRC16: {currentPayload.slice(-4)}
                    </span>
                    <span>✓ NAPAS-validated</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                    style={{ backgroundColor: '#DA251D' }}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-400 max-w-[200px]">
              Select a bank, enter account number and name to generate the QR code
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
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 ${
    hasError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'
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
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <XIcon className="w-3 h-3 flex-shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

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
