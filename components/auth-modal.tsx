'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

type Mode = 'login' | 'register'

export function AuthModal({
  mode,
  onClose,
  onSwitch,
}: {
  mode: Mode | null
  onClose: () => void
  onSwitch: (mode: Mode) => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (mode && !dialog.open) dialog.showModal()
    if (!mode && dialog.open) dialog.close()
  }, [mode])

  const isRegister = mode === 'register'

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="auth-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-card p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="bg-gold-gradient px-6 py-5 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="auth-title" className="font-display text-2xl font-bold">
              {isRegister ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-sm opacity-80">
              {isRegister ? 'Get a 100% welcome bonus up to ৳20,000' : 'Login to continue playing'}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 hover:bg-black/10">
            <X className="size-5" />
          </button>
        </div>
      </div>
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={(e) => {
          e.preventDefault()
          onClose()
        }}
      >
        <Field id="username" label="Username" type="text" autoComplete="username" />
        {isRegister && <Field id="phone" label="Phone number" type="tel" autoComplete="tel" placeholder="+880" />}
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete={isRegister ? 'new-password' : 'current-password'}
        />
        {isRegister && (
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" required className="mt-0.5 accent-[var(--primary)]" />
            I confirm I am 18+ and accept the Terms & Conditions and Responsible Gaming policy.
          </label>
        )}
        <button
          type="submit"
          className="mt-2 rounded-full bg-gold-gradient py-3 font-bold text-primary-foreground transition hover:brightness-110"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            className="font-semibold text-primary hover:underline"
            onClick={() => onSwitch(isRegister ? 'login' : 'register')}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </dialog>
  )
}

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        required
        className="h-11 rounded-lg border border-input bg-background px-3 text-sm focus:border-primary focus:outline-none"
        {...props}
      />
    </div>
  )
}
