export type GameTag = 'trending' | 'popular' | 'new' | 'recommended'

export type Game = {
  id: string
  name: string
  provider: string
  image: string
  tags: GameTag[]
  players?: number
  minBet?: string
  badge?: 'HOT' | 'NEW' | 'JACKPOT'
  rtp?: string
}

export const liveCasinoGames: Game[] = [
  { id: 'lc1', name: 'Speed Baccarat', provider: 'Evolution', image: '/images/live-baccarat.png', tags: ['trending', 'popular'], players: 1842, minBet: '৳20', badge: 'HOT' },
  { id: 'lc2', name: 'Lightning Roulette', provider: 'Evolution', image: '/images/live-roulette.png', tags: ['trending', 'recommended'], players: 2310, minBet: '৳10' },
  { id: 'lc3', name: 'Crazy Time', provider: 'Evolution', image: '/images/live-crazytime.png', tags: ['popular', 'trending'], players: 5120, minBet: '৳10', badge: 'HOT' },
  { id: 'lc4', name: 'Blackjack VIP', provider: 'Pragmatic Play', image: '/images/live-blackjack.png', tags: ['recommended', 'new'], players: 642, minBet: '৳500' },
  { id: 'lc5', name: 'Mega Roulette', provider: 'Pragmatic Play', image: '/images/live-roulette.png', tags: ['new', 'popular'], players: 1290, minBet: '৳10', badge: 'NEW' },
  { id: 'lc6', name: 'Dragon Tiger', provider: 'Pragmatic Play', image: '/images/live-baccarat.png', tags: ['new', 'recommended'], players: 980, minBet: '৳20' },
  { id: 'lc7', name: 'Funky Time', provider: 'Evolution', image: '/images/live-crazytime.png', tags: ['new', 'trending'], players: 3104, minBet: '৳10', badge: 'NEW' },
  { id: 'lc8', name: 'Infinite Blackjack', provider: 'Evolution', image: '/images/live-blackjack.png', tags: ['popular', 'recommended'], players: 1577, minBet: '৳50' },
]

export const slotGames: Game[] = [
  { id: 's1', name: 'Gates of Olympus', provider: 'Pragmatic Play', image: '/images/slot-olympus.png', tags: ['trending', 'popular'], rtp: '96.5%', badge: 'HOT' },
  { id: 's2', name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: '/images/slot-sweet.png', tags: ['popular', 'recommended'], rtp: '96.48%' },
  { id: 's3', name: 'Fortune Dragon', provider: 'PG Soft', image: '/images/slot-fortune.png', tags: ['trending', 'new'], rtp: '96.7%', badge: 'JACKPOT' },
  { id: 's4', name: 'Pharaoh Riches', provider: 'JILI', image: '/images/slot-pharaoh.png', tags: ['new', 'recommended'], rtp: '97.0%', badge: 'NEW' },
  { id: 's5', name: 'Zeus Thunder', provider: 'JILI', image: '/images/slot-olympus.png', tags: ['new', 'trending'], rtp: '96.2%' },
  { id: 's6', name: 'Candy Blitz', provider: 'PG Soft', image: '/images/slot-sweet.png', tags: ['popular', 'new'], rtp: '96.1%' },
  { id: 's7', name: 'Lucky Neko Gold', provider: 'PG Soft', image: '/images/slot-fortune.png', tags: ['recommended', 'popular'], rtp: '96.9%', badge: 'JACKPOT' },
  { id: 's8', name: 'Book of Ra Deluxe', provider: 'Novomatic', image: '/images/slot-pharaoh.png', tags: ['trending', 'recommended'], rtp: '95.1%' },
  { id: 's9', name: 'Olympus 1000', provider: 'Pragmatic Play', image: '/images/slot-olympus.png', tags: ['new', 'popular'], rtp: '96.5%', badge: 'NEW' },
  { id: 's10', name: 'Mahjong Ways 2', provider: 'PG Soft', image: '/images/slot-fortune.png', tags: ['trending', 'popular'], rtp: '96.95%', badge: 'HOT' },
]

export const crashGames: Game[] = [
  { id: 'c1', name: 'Aviator', provider: 'Spribe', image: '/images/crash-plane.png', tags: ['trending', 'popular'], players: 8420, badge: 'HOT' },
  { id: 'c2', name: 'Spaceman', provider: 'Pragmatic Play', image: '/images/crash-space.png', tags: ['popular', 'recommended'], players: 4210 },
  { id: 'c3', name: 'JetX', provider: 'SmartSoft', image: '/images/crash-jet.png', tags: ['trending', 'new'], players: 2980, badge: 'NEW' },
  { id: 'c4', name: 'Aviatrix', provider: 'Aviatrix', image: '/images/crash-plane.png', tags: ['new', 'recommended'], players: 1530 },
  { id: 'c5', name: 'Cosmo Rush', provider: 'JILI', image: '/images/crash-space.png', tags: ['new', 'trending'], players: 1210, badge: 'NEW' },
  { id: 'c6', name: 'Rocket Queen', provider: 'Turbo Games', image: '/images/crash-jet.png', tags: ['popular', 'recommended'], players: 2045 },
]

export type Match = {
  id: string
  sport: 'cricket' | 'football'
  league: string
  home: string
  away: string
  status: 'live' | 'upcoming'
  score?: string
  time: string
  odds: { label: string; value: number }[]
}

export const matches: Match[] = [
  { id: 'm1', sport: 'cricket', league: 'T20 World Cup', home: 'Bangladesh', away: 'India', status: 'live', score: '156/4 (17.2)', time: '2nd Innings', odds: [{ label: '1', value: 2.35 }, { label: '2', value: 1.62 }] },
  { id: 'm2', sport: 'cricket', league: 'BPL', home: 'Dhaka Capitals', away: 'Comilla Victorians', status: 'live', score: '88/2 (10.0)', time: '1st Innings', odds: [{ label: '1', value: 1.85 }, { label: '2', value: 1.95 }] },
  { id: 'm3', sport: 'cricket', league: 'IPL', home: 'Mumbai Indians', away: 'Chennai Super Kings', status: 'upcoming', time: 'Today 20:00', odds: [{ label: '1', value: 1.9 }, { label: '2', value: 1.9 }] },
  { id: 'm4', sport: 'cricket', league: 'Test Series', home: 'Pakistan', away: 'Australia', status: 'upcoming', time: 'Tomorrow 10:30', odds: [{ label: '1', value: 3.1 }, { label: 'X', value: 2.8 }, { label: '2', value: 2.2 }] },
  { id: 'm5', sport: 'football', league: 'Premier League', home: 'Man City', away: 'Arsenal', status: 'live', score: '1 - 1', time: "67'", odds: [{ label: '1', value: 2.1 }, { label: 'X', value: 3.25 }, { label: '2', value: 3.6 }] },
  { id: 'm6', sport: 'football', league: 'La Liga', home: 'Real Madrid', away: 'Barcelona', status: 'live', score: '2 - 0', time: "34'", odds: [{ label: '1', value: 1.45 }, { label: 'X', value: 4.4 }, { label: '2', value: 6.5 }] },
  { id: 'm7', sport: 'football', league: 'Champions League', home: 'Bayern', away: 'PSG', status: 'upcoming', time: 'Today 23:00', odds: [{ label: '1', value: 2.05 }, { label: 'X', value: 3.6 }, { label: '2', value: 3.3 }] },
  { id: 'm8', sport: 'football', league: 'Serie A', home: 'Inter', away: 'Juventus', status: 'upcoming', time: 'Tomorrow 01:45', odds: [{ label: '1', value: 2.25 }, { label: 'X', value: 3.1 }, { label: '2', value: 3.4 }] },
]

export const recentWins = [
  { user: 'rah***n', game: 'Aviator', amount: '৳48,250', multiplier: '96.5x' },
  { user: 'tan***9', game: 'Crazy Time', amount: '৳1,25,000', multiplier: '250x' },
  { user: 'sak***b', game: 'Gates of Olympus', amount: '৳32,780', multiplier: '163x' },
  { user: 'mim***7', game: 'Speed Baccarat', amount: '৳18,400', multiplier: '8x' },
  { user: 'arif***', game: 'Sweet Bonanza', amount: '৳67,900', multiplier: '339x' },
  { user: 'jui***1', game: 'Spaceman', amount: '৳12,150', multiplier: '24.3x' },
  { user: 'has***n', game: 'BAN vs IND', amount: '৳85,000', multiplier: '2.35x' },
  { user: 'nus***t', game: 'Fortune Dragon', amount: '৳2,10,500', multiplier: '1050x' },
  { user: 'kar***m', game: 'Lightning Roulette', amount: '৳54,000', multiplier: '500x' },
  { user: 'sum***a', game: 'JetX', amount: '৳9,870', multiplier: '19.7x' },
]

export const heroSlides = [
  {
    id: 'welcome',
    image: '/images/hero-welcome.png',
    eyebrow: 'Welcome Offer',
    title: '100% First Deposit Bonus',
    highlight: 'up to ৳20,000',
    description: 'Start your journey with double the balance. Instant deposits via bKash, Nagad & Rocket.',
  },
  {
    id: 'cricket',
    image: '/images/hero-cricket.png',
    eyebrow: 'Cricket Special',
    title: 'Best Odds on Every Ball',
    highlight: '5% Cashback',
    description: 'Bet live on T20 World Cup, BPL & IPL with lightning-fast settlement and daily cashback.',
  },
  {
    id: 'live',
    image: '/images/hero-live.png',
    eyebrow: 'Live Casino',
    title: 'Weekly Live Casino Rebate',
    highlight: 'up to 1.2%',
    description: 'Play Evolution & Pragmatic Play live tables and get unlimited weekly rebates.',
  },
]

export const paymentMethods = [
  { name: 'bKash', className: 'bg-[#e2136e] text-white' },
  { name: 'Nagad', className: 'bg-[#f6921e] text-white' },
  { name: 'Rocket', className: 'bg-[#8c3494] text-white' },
  { name: 'USDT', className: 'bg-[#26a17b] text-white' },
  { name: 'Upay', className: 'bg-[#0054a6] text-white' },
  { name: 'Bank', className: 'bg-secondary text-foreground' },
]
