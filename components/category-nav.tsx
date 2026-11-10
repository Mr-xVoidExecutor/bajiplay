'use client'

import { useState } from 'react'
import { Home, Trophy, Goal, Tv, Cherry, Spade, Fish, Rocket, Gift, Crown } from 'lucide-react'
import { useLanguage, type TranslationKey } from '@/components/language-provider'
import { cn } from '@/lib/utils'

const items: { key: TranslationKey; icon: typeof Home; href: string; hot?: boolean }[] = [
  { key: 'home', icon: Home, href: '#' },
  { key: 'cricket', icon: Trophy, href: '#sports', hot: true },
  { key: 'football', icon: Goal, href: '#sports' },
  { key: 'liveCasino', icon: Tv, href: '#live-casino' },
  { key: 'slots', icon: Cherry, href: '#slots' },
  { key: 'tableGames', icon: Spade, href: '#live-casino' },
  { key: 'fishing', icon: Fish, href: '#crash' },
  { key: 'crash', icon: Rocket, href: '#crash', hot: true },
  { key: 'promotions', icon: Gift, href: '#' },
  { key: 'vip', icon: Crown, href: '#' },
]

export function CategoryNav() {
  const { t } = useLanguage()
  const [active, setActive] = useState<TranslationKey>('home')

  return (
    <nav aria-label="Categories" className="border-b border-border bg-card/60">
      <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 sm:px-4 md:px-6">
        {items.map(({ key, icon: Icon, href, hot }) => {
          const isActive = active === key
          return (
            <li key={key} className="shrink-0">
              <a
                href={href}
                onClick={() => setActive(key)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex min-h-11 items-center gap-1.5 px-2.5 py-3 text-xs font-medium transition-colors sm:gap-2 sm:px-3 sm:text-sm md:px-4',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                  key === 'vip' && 'text-primary',
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                <span className="whitespace-nowrap">{t(key)}</span>
                {hot && (
                  <span className="rounded bg-live px-1 py-px text-[9px] font-bold uppercase leading-none text-white">
                    Hot
                  </span>
                )}
                {isActive && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary" aria-hidden />}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
