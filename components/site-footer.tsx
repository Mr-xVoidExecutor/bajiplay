import { ShieldCheck, Lock, BadgeCheck, Clock } from 'lucide-react'
import { paymentMethods } from '@/lib/casino-data'

const linkGroups = [
  { title: 'Casino', links: ['Live Casino', 'Slots', 'Table Games', 'Fishing', 'Crash Games'] },
  { title: 'Sports', links: ['Cricket', 'Football', 'Tennis', 'Kabaddi', 'E-Sports'] },
  { title: 'Help', links: ['FAQ', 'Deposit Guide', 'Withdrawal Guide', 'Contact Us', 'Affiliate'] },
  { title: 'About', links: ['About BajiPlay', 'Terms & Conditions', 'Privacy Policy', 'Responsible Gaming', 'KYC Policy'] },
]

const providers = ['Evolution', 'Pragmatic Play', 'PG Soft', 'JILI', 'Spribe', 'SmartSoft', 'Sexy Gaming', 'Playtech']

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 pb-24 md:px-6 md:pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-4">
            <p className="font-display text-3xl font-bold">
              Baji<span className="text-gold-gradient">Play</span>
            </p>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Asia&apos;s premium destination for live casino, slots and sports betting. Fast deposits, instant
              withdrawals and round-the-clock support in Bangla & English.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Clock, label: '24/7 Support' },
                { icon: Lock, label: 'SSL Secured' },
                { icon: BadgeCheck, label: 'Fair Play Certified' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                  <Icon className="size-3.5 text-primary" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {linkGroups.map((g) => (
              <div key={g.title}>
                <h3 className="mb-3 text-sm font-semibold text-foreground">{g.title}</h3>
                <ul className="space-y-2">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payment Methods</h3>
            <ul className="flex flex-wrap gap-2">
              {paymentMethods.map((p) => (
                <li key={p.name} className={`rounded-lg px-4 py-2 text-sm font-bold ${p.className}`}>
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Responsible Gaming</h3>
            <ul className="flex flex-wrap items-center gap-2">
              <li className="flex size-11 items-center justify-center rounded-full border-2 border-live font-display text-base font-bold text-live">
                18+
              </li>
              <li className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold">
                <ShieldCheck className="size-4 text-success" aria-hidden />
                GamCare
              </li>
              <li className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold">BeGambleAware</li>
              <li className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold">Curaçao Licensed</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Game Providers</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {providers.map((p) => (
              <li key={p} className="font-display text-lg font-semibold text-muted-foreground/70">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 BajiPlay. All rights reserved.</p>
          <p className="max-w-xl text-pretty">
            Gambling can be addictive. Please play responsibly. Only players aged 18 and above are permitted. Check
            your local laws before playing.
          </p>
        </div>
      </div>
    </footer>
  )
}
