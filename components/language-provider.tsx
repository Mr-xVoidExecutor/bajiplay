'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'en' | 'bn'

const dictionary = {
  en: {
    search: 'Search games...',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    login: 'Login',
    register: 'Register',
    balance: 'Balance',
    home: 'Home',
    cricket: 'Cricket',
    football: 'Football',
    liveCasino: 'Live Casino',
    slots: 'Slots',
    tableGames: 'Table Games',
    fishing: 'Fishing',
    crash: 'Crash Games',
    promotions: 'Promotions',
    vip: 'VIP Club',
    joinNow: 'Join Now',
    claimBonus: 'Claim Bonus',
    liveSports: 'Live & Upcoming',
    recentWins: 'Recent Wins',
    playNow: 'Play Now',
    viewAll: 'View All',
    trending: 'Trending',
    popular: 'Popular',
    new: 'New',
    recommended: 'Recommended',
    slotGames: 'Slot Games',
    crashArcade: 'Crash & Arcade',
    support: '24/7 Live Support',
  },
  bn: {
    search: 'গেম খুঁজুন...',
    deposit: 'ডিপোজিট',
    withdraw: 'উত্তোলন',
    login: 'লগইন',
    register: 'নিবন্ধন',
    balance: 'ব্যালেন্স',
    home: 'হোম',
    cricket: 'ক্রিকেট',
    football: 'ফুটবল',
    liveCasino: 'লাইভ ক্যাসিনো',
    slots: 'স্লট',
    tableGames: 'টেবিল গেম',
    fishing: 'ফিশিং',
    crash: 'ক্র্যাশ গেম',
    promotions: 'প্রমোশন',
    vip: 'ভিআইপি ক্লাব',
    joinNow: 'এখনই যোগ দিন',
    claimBonus: 'বোনাস নিন',
    liveSports: 'লাইভ ও আসন্ন',
    recentWins: 'সাম্প্রতিক জয়',
    playNow: 'খেলুন',
    viewAll: 'সব দেখুন',
    trending: 'ট্রেন্ডিং',
    popular: 'জনপ্রিয়',
    new: 'নতুন',
    recommended: 'প্রস্তাবিত',
    slotGames: 'স্লট গেম',
    crashArcade: 'ক্র্যাশ ও আর্কেড',
    support: '২৪/৭ লাইভ সাপোর্ট',
  },
} as const

export type TranslationKey = keyof (typeof dictionary)['en']

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = (key: TranslationKey) => dictionary[lang][key]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
