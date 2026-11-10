'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '@/lib/casino-data'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

export function HeroSlider() {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = heroSlides.length

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5500)
    return () => clearInterval(id)
  }, [paused, count])

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions"
      className="relative overflow-hidden rounded-2xl border border-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-[3/1]">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="relative flex h-full max-w-xl flex-col justify-center gap-3 p-6 sm:p-10 lg:p-14">
              <span className="w-fit rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {slide.eyebrow}
              </span>
              <h2 className="text-balance font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {slide.title}{' '}
                <span className="text-gold-gradient">{slide.highlight}</span>
              </h2>
              <p className="hidden max-w-md text-pretty text-sm text-muted-foreground sm:block md:text-base">
                {slide.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href="#"
                  tabIndex={i === index ? 0 : -1}
                  className="rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_24px_-4px] shadow-primary/70 transition hover:brightness-110"
                >
                  {t('joinNow')}
                </a>
                <a
                  href="#"
                  tabIndex={i === index ? 0 : -1}
                  className="rounded-full border border-foreground/30 bg-background/40 px-6 py-2.5 text-sm font-semibold backdrop-blur transition hover:border-primary hover:text-primary"
                >
                  {t('claimBonus')}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 backdrop-blur transition hover:border-primary hover:text-primary md:block"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 backdrop-blur transition hover:border-primary hover:text-primary md:block"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              'h-2 rounded-full transition-all',
              i === index ? 'w-8 bg-primary' : 'w-2 bg-foreground/40 hover:bg-foreground/70',
            )}
          />
        ))}
      </div>
    </section>
  )
}
