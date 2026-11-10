'use client'

import { useState } from 'react'
import { Home, Trophy, Tv, Cherry, Rocket } from 'lucide-react'
import { useLanguage, type TranslationKey } from '@/components/language-provider'
import { cn } from '@/lib/utils'

const items: { key: TranslationKey; icon: typeof Home; href: string }[] = [
  { key: 'home', icon: Home, href: '#' },
  { key: 'cricket', icon: Trophy, href: '#sports' },
  { key: 'liveCasino', icon: Tv, href: '#live-casino' },
  { key: 'slots', icon: Cherry, href: '#slots' },
  { key: 'crash', icon: Rocket, href: '#crash' },
]

export function MobileBottomNav() {
  const { t } = useLanguage()
  const [active, setActive] = useState<TranslationKey>('home')

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map(({ key, icon: Icon, href }) => {
          const isActive = active === key
          return (
            <li key={key}>
              <a
                href={href}
                onClick={() => setActive(key)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="size-5" aria-hidden />
                <span className="max-w-full truncate">{t(key)}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
