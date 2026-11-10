'use client'

import { useState } from 'react'
import { Trophy, Goal, Ticket } from 'lucide-react'
import { matches, type Match } from '@/lib/casino-data'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'cricket' | 'football' | 'live'

export function SportsTicker() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')
  const [selections, setSelections] = useState<Record<string, string>>({})

  const visible = matches.filter((m) =>
    filter === 'all' ? true : filter === 'live' ? m.status === 'live' : m.sport === filter,
  )
  const slipCount = Object.keys(selections).length

  const toggle = (matchId: string, label: string) =>
    setSelections((prev) => {
      const next = { ...prev }
      if (next[matchId] === label) delete next[matchId]
      else next[matchId] = label
      return next
    })

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'live', label: 'In-Play' },
    { id: 'cricket', label: t('cricket') },
    { id: 'football', label: t('football') },
  ]

  return (
    <section id="sports" aria-labelledby="sports-title" className="rounded-2xl border border-border bg-card/50 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-live" />
          </span>
          <h2 id="sports-title" className="font-display text-xl font-bold md:text-2xl">
            {t('liveSports')}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div role="tablist" aria-label="Sport filter" className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-surface p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={cn(
                  'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                  filter === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
            aria-live="polite"
          >
            <Ticket className="size-3.5" aria-hidden />
            Bet Slip <span className="rounded-full bg-primary px-1.5 text-primary-foreground tabular-nums">{slipCount}</span>
          </div>
        </div>
      </div>

      <ul className="no-scrollbar -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
        {visible.map((m) => (
          <MatchCard key={m.id} match={m} selected={selections[m.id]} onSelect={(label) => toggle(m.id, label)} />
        ))}
      </ul>
    </section>
  )
}

function MatchCard({
  match,
  selected,
  onSelect,
}: {
  match: Match
  selected?: string
  onSelect: (label: string) => void
}) {
  const Icon = match.sport === 'cricket' ? Trophy : Goal
  return (
    <li className="w-72 shrink-0 snap-start rounded-xl border border-border bg-surface p-3.5">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Icon className="size-3.5 text-accent" aria-hidden />
          {match.league}
        </span>
        {match.status === 'live' ? (
          <span className="rounded bg-live px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
            Live · {match.time}
          </span>
        ) : (
          <span className="text-muted-foreground">{match.time}</span>
        )}
      </div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm font-semibold">{match.home}</p>
          <p className="truncate text-sm font-semibold">{match.away}</p>
        </div>
        {match.score && (
          <span className="shrink-0 font-display text-lg font-bold text-primary tabular-nums">{match.score}</span>
        )}
      </div>
      <div className="flex gap-2">
        {match.odds.map((o) => {
          const isSelected = selected === o.label
          return (
            <button
              key={o.label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(o.label)}
              className={cn(
                'flex flex-1 items-center justify-between rounded-lg border px-2.5 py-2 text-xs transition-colors',
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card hover:border-accent',
              )}
            >
              <span className={isSelected ? 'opacity-80' : 'text-muted-foreground'}>{o.label}</span>
              <span className="font-bold tabular-nums">{o.value.toFixed(2)}</span>
            </button>
          )
        })}
      </div>
    </li>
  )
}
