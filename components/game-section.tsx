'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronRight, Play, Users } from 'lucide-react'
import type { Game, GameTag } from '@/lib/casino-data'
import { useLanguage, type TranslationKey } from '@/components/language-provider'
import { cn } from '@/lib/utils'

type Variant = 'live' | 'slot' | 'crash'

const tabs: GameTag[] = ['trending', 'popular', 'new', 'recommended']

const badgeStyles: Record<NonNullable<Game['badge']>, string> = {
  HOT: 'bg-live text-white',
  NEW: 'bg-accent text-accent-foreground',
  JACKPOT: 'bg-gold-gradient text-primary-foreground',
}

export function GameSection({
  id,
  titleKey,
  icon,
  games,
  variant,
}: {
  id: string
  titleKey: TranslationKey
  icon: React.ReactNode
  games: Game[]
  variant: Variant
}) {
  const { t } = useLanguage()
  const [tab, setTab] = useState<GameTag>('trending')
  const filtered = games.filter((g) => g.tags.includes(tab))

  const gridClass =
    variant === 'slot'
      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
      : variant === 'crash'
        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            {icon}
          </span>
          <h2 id={`${id}-title`} className="font-display text-2xl font-bold">
            {t(titleKey)}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div role="tablist" aria-label={`${t(titleKey)} filter`} className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-border bg-card p-1">
            {tabs.map((tg) => (
              <button
                key={tg}
                role="tab"
                type="button"
                aria-selected={tab === tg}
                aria-controls={`${id}-panel`}
                onClick={() => setTab(tg)}
                className={cn(
                  'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors md:px-4',
                  tab === tg ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t(tg)}
              </button>
            ))}
          </div>
          <a href="#" className="hidden items-center gap-0.5 text-sm font-semibold text-primary hover:underline sm:flex">
            {t('viewAll')}
            <ChevronRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>

      <ul id={`${id}-panel`} role="tabpanel" className={cn('grid gap-3 md:gap-4', gridClass)}>
        {filtered.map((game) => (
          <li key={game.id}>
            <GameCard game={game} variant={variant} playLabel={t('playNow')} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function GameCard({ game, variant, playLabel }: { game: Game; variant: Variant; playLabel: string }) {
  const aspect = variant === 'slot' ? 'aspect-[3/4]' : variant === 'crash' ? 'aspect-square' : 'aspect-[4/3]'

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_8px_30px_-8px] hover:shadow-primary/40">
      <div className={cn('relative overflow-hidden', aspect)}>
        <Image
          src={game.image}
          alt={`${game.name} by ${game.provider}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

        <div className="absolute left-2 top-2 flex gap-1.5">
          {variant === 'live' && (
            <span className="flex items-center gap-1 rounded bg-live px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              <span className="size-1.5 rounded-full bg-white" aria-hidden />
              Live
            </span>
          )}
          {game.badge && (
            <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-bold', badgeStyles[game.badge])}>
              {game.badge}
            </span>
          )}
        </div>

        {game.players !== undefined && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium">
            <Users className="size-3 text-success" aria-hidden />
            {game.players.toLocaleString('en-US')}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg"
            aria-label={`${playLabel}: ${game.name}`}
          >
            <Play className="size-4 fill-current" aria-hidden />
            {playLabel}
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 p-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{game.name}</h3>
          <p className="truncate text-xs text-muted-foreground">{game.provider}</p>
        </div>
        {game.minBet && <span className="shrink-0 text-[11px] font-medium text-primary">Min {game.minBet}</span>}
        {game.rtp && <span className="shrink-0 text-[11px] font-medium text-success">RTP {game.rtp}</span>}
      </div>
    </article>
  )
}
