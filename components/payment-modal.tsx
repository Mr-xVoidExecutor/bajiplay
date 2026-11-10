'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Check, Copy, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type PaymentMode = 'deposit' | 'withdraw'

const depositMethods = ['bKash', 'Nagad', 'Rocket'] as const
const withdrawMethods = ['bKash', 'Nagad'] as const

export function PaymentModal({ mode, onClose }: { mode: PaymentMode | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [depositMethod, setDepositMethod] = useState<(typeof depositMethods)[number]>('bKash')
  const [withdrawMethod, setWithdrawMethod] = useState<(typeof withdrawMethods)[number]>('bKash')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (mode && !dialog.open) dialog.showModal()
    if (!mode && dialog.open) dialog.close()
    setSubmitted(false)
  }, [mode])

  const merchantNumber = process.env.NEXT_PUBLIC_PAYMENT_MERCHANT_NUMBER || '01XXXXXXXXX'

  async function copyMerchantNumber() {
    try {
      await navigator.clipboard.writeText(merchantNumber)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const isDeposit = mode === 'deposit'
  const title = isDeposit ? 'Deposit funds' : 'Request a withdrawal'

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
      aria-labelledby="payment-modal-title"
      className="m-auto max-h-[min(90dvh,48rem)] w-[calc(100%-1.25rem)] max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:w-[calc(100%-2rem)]"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-surface/95 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            {isDeposit ? <ArrowDownToLine className="size-5" /> : <ArrowUpFromLine className="size-5" />}
          </span>
          <div>
            <h2 id="payment-modal-title" className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {isDeposit ? 'Choose a local payment method' : 'Choose where to receive your payout'}
            </p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <X className="size-5" />
        </button>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center gap-3 px-5 py-10 text-center sm:px-8">
          <span className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success"><Check className="size-7" /></span>
          <h3 className="font-display text-xl font-bold">Request recorded</h3>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            This is a front-end demo only. No payment or withdrawal was processed. Connect a secure payment backend before accepting real transactions.
          </p>
          <button type="button" onClick={onClose} className="mt-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-bold text-primary-foreground">Done</button>
        </div>
      ) : isDeposit ? (
        <form className="flex flex-col gap-5 p-4 sm:gap-6 sm:p-6" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Payment method</legend>
            <div className="grid grid-cols-3 gap-2">
              {depositMethods.map((method) => (
                <button key={method} type="button" aria-pressed={depositMethod === method} onClick={() => setDepositMethod(method)} className={cn('min-h-12 rounded-xl border px-2 py-2.5 text-sm font-bold transition-colors', depositMethod === method ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground hover:border-primary/50')}>
                  {method}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="rounded-xl border border-primary/25 bg-primary/5 p-3.5 sm:p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Send money to {depositMethod} merchant number</p>
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-lg font-bold tracking-wider text-foreground sm:text-xl">{merchantNumber}</span>
              <button type="button" onClick={copyMerchantNumber} className="flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-semibold text-muted-foreground hover:text-foreground" aria-label="Copy merchant number">
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">Configure the official merchant number with NEXT_PUBLIC_PAYMENT_MERCHANT_NUMBER before going live. Never send money to an unverified number.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="deposit-amount" label="Deposit amount (৳)" type="number" min="1" step="1" placeholder="Enter amount" />
            <Field id="deposit-trxid" label="Transaction ID (TrxID)" type="text" autoComplete="off" placeholder="Enter TrxID" />
          </div>
          <button type="submit" className="min-h-12 rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_20px_-6px] shadow-primary/50 transition hover:brightness-110">Submit Deposit</button>
          <p className="-mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">Do not share your PIN or OTP. Payment verification requires a secure backend.</p>
        </form>
      ) : (
        <form className="flex flex-col gap-5 p-4 sm:gap-6 sm:p-6" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Payment method</legend>
            <div className="grid grid-cols-2 gap-2">
              {withdrawMethods.map((method) => (
                <button key={method} type="button" aria-pressed={withdrawMethod === method} onClick={() => setWithdrawMethod(method)} className={cn('min-h-12 rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors', withdrawMethod === method ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground hover:border-primary/50')}>
                  {method}
                </button>
              ))}
            </div>
          </fieldset>
          <Field id="withdraw-number" label="Personal number" type="tel" autoComplete="tel" inputMode="tel" placeholder="01XXXXXXXXX" />
          <Field id="withdraw-amount" label="Withdrawal amount (৳)" type="number" min="1" step="1" placeholder="Enter amount" />
          <button type="submit" className="min-h-12 rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_0_20px_-6px] shadow-primary/50 transition hover:brightness-110">Request Withdrawal</button>
          <p className="-mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">Make sure your number is registered with the selected payment method. Requests are demo-only and are not processed.</p>
        </form>
      )}
    </dialog>
  )
}

function Field({ id, label, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input id={id} name={id} required className="h-12 min-w-0 rounded-lg border border-input bg-background px-3 text-base outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm" {...props} />
    </div>
  )
}
