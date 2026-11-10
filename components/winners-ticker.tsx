'use client'

import { Trophy } from 'lucide-react'
import { recentWins } from '@/lib/casino-data'
import { useLanguage } from '@/components/language-provider'

export function WinnersTicker() {
  const { t } = useLanguage()
  const loop = [...recentWins, ...recentWins]

  return (
    <section aria-label={t('recentWins')} className="flex items-stretch overflow-hidden rounded-xl border border-primary/30 bg-card">
      <div className="z-10 flex shrink-0 items-center gap-2 bg-gold-gradient px-4 text-primary-foreground">
        <Trophy className="size-4" aria-hidden />
        <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-wide">{t('recentWins')}</span>
      </div>
      <div className="relative flex-1 overflow-hidden py-2.5">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card to-transparent" aria-hidden />
        <ul className="flex w-max animate-marquee gap-8 will-change-transform hover:[animation-play-state:paused]">
          {loop.map((w, i) => (
            <li key={i} aria-hidden={i >= recentWins.length} className="flex items-center gap-2 whitespace-nowrap text-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold uppercase text-accent">
                {w.user[0]}
              </span>
              <span className="font-medium">{w.user}</span>
              <span className="text-muted-foreground">won on</span>
              <span className="font-medium text-accent">{w.game}</span>
              <span className="font-display text-base font-bold text-success tabular-nums">{w.amount}</span>
              <span className="rounded bg-primary/15 px-1.5 text-xs font-semibold text-primary">{w.multiplier}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
