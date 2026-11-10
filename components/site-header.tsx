'use client'

import { useState } from 'react'
import { Eye, EyeOff, Search, Wallet, RefreshCw, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { AuthModal } from '@/components/auth-modal'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage()
  const [showBalance, setShowBalance] = useState(true)
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null)

  return (
    <header className="border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-3 md:px-6">
        <a href="#" className="flex shrink-0 items-center gap-2" aria-label="BajiPlay home">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gold-gradient font-display text-xl font-bold text-primary-foreground">
            B
          </span>
          <span className="font-display text-2xl font-bold tracking-tight">
            <span className="text-foreground">Baji</span>
            <span className="text-gold-gradient">Play</span>
          </span>
        </a>

        <form
          role="search"
          className="relative ml-4 hidden max-w-xs flex-1 lg:block"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="game-search" className="sr-only">
            {t('search')}
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            id="game-search"
            type="search"
            placeholder={t('search')}
            className="h-10 w-full rounded-full border border-input bg-card pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex rounded-full border border-border bg-card p-0.5 text-xs font-semibold" role="group" aria-label="Language">
            {(['bn', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  'rounded-full px-2.5 py-1 uppercase transition-colors',
                  lang === l ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-border bg-card py-1 pl-3 pr-1 md:flex">
            <Wallet className="size-4 text-primary" aria-hidden />
            <span className="sr-only">{t('balance')}</span>
            <span className="font-display text-base font-semibold tabular-nums">
              {showBalance ? '৳ 12,450.00' : '৳ ••••••'}
            </span>
            <button
              type="button"
              onClick={() => setShowBalance((s) => !s)}
              className="rounded-full p-1.5 text-muted-foreground hover:text-foreground"
              aria-label={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
            <button type="button" className="rounded-full p-1.5 text-muted-foreground hover:text-foreground" aria-label="Refresh balance">
              <RefreshCw className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full bg-success px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 sm:flex"
          >
            <ArrowDownToLine className="size-4" aria-hidden />
            {t('deposit')}
          </button>
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold transition hover:bg-muted xl:flex"
          >
            <ArrowUpFromLine className="size-4" aria-hidden />
            {t('withdraw')}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className="rounded-full border border-primary/60 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            {t('login')}
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className="rounded-full bg-gold-gradient px-4 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_20px_-4px] shadow-primary/60 transition hover:brightness-110"
          >
            {t('register')}
          </button>
        </div>
      </div>
      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onSwitch={setAuthMode} />
    </header>
  )
}
