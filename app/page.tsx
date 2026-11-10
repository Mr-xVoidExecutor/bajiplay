import { Tv, Cherry, Rocket } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { CategoryNav } from '@/components/category-nav'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { HeroSlider } from '@/components/hero-slider'
import { SportsTicker } from '@/components/sports-ticker'
import { GameSection } from '@/components/game-section'
import { WinnersTicker } from '@/components/winners-ticker'
import { SiteFooter } from '@/components/site-footer'
import { SupportWidget } from '@/components/support-widget'
import { liveCasinoGames, slotGames, crashGames } from '@/lib/casino-data'

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-40">
        <SiteHeader />
        <CategoryNav />
      </div>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-2 py-4 pb-24 sm:gap-6 sm:px-4 md:gap-8 md:px-6 md:py-6 md:pb-6">
        <HeroSlider />
        <WinnersTicker />
        <SportsTicker />
        <GameSection id="live-casino" titleKey="liveCasino" icon={<Tv className="size-5" />} games={liveCasinoGames} variant="live" />
        <GameSection id="slots" titleKey="slotGames" icon={<Cherry className="size-5" />} games={slotGames} variant="slot" />
        <GameSection id="crash" titleKey="crashArcade" icon={<Rocket className="size-5" />} games={crashGames} variant="crash" />
      </main>
      <SiteFooter />
      <MobileBottomNav />
      <SupportWidget />
    </>
  )
}
