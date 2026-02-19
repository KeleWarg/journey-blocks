/**
 * Moving Funnel Data Types
 * 
 * Type definitions for the moving company lead gen funnel
 */

export type HomeSizeOption = 'studio' | '1-bedroom' | '2-bedroom' | '3-bedroom' | '4+-bedroom' | 'office'

export type MoveDateOption = 'within-2-weeks' | '2-4-weeks' | '1-2-months' | '2+-months'

export interface MovingFunnelData {
  // Step 1: Zipcodes
  zipFrom?: string
  zipTo?: string
  
  // Step 2: Home Size
  homeSize?: HomeSizeOption
  
  // Step 3: Move Date
  moveDate?: MoveDateOption
  specificMoveDate?: string  // ISO date string when 'specific-date' is selected
  
  // Step 4: Email
  email?: string
  
  // Step 5: Details
  firstName?: string
  lastName?: string
  phone?: string
}

// Home size options with labels and price ranges
export const HOME_SIZE_OPTIONS: {
  value: HomeSizeOption
  label: string
  priceRange: { low: number; high: number }
}[] = [
  { value: 'studio', label: 'Studio', priceRange: { low: 400, high: 800 } },
  { value: '1-bedroom', label: '1 Bedroom', priceRange: { low: 600, high: 1200 } },
  { value: '2-bedroom', label: '2 Bedroom', priceRange: { low: 900, high: 1800 } },
  { value: '3-bedroom', label: '3 Bedroom', priceRange: { low: 1200, high: 2400 } },
  { value: '4+-bedroom', label: '4+ Bedroom', priceRange: { low: 1800, high: 3500 } },
  { value: 'office', label: 'Office', priceRange: { low: 1500, high: 3000 } },
]

// Move date options with labels and savings percentages
export const MOVE_DATE_OPTIONS: {
  value: MoveDateOption
  label: string
  tag?: string
  savingsPercent?: number
}[] = [
  { value: 'within-2-weeks', label: 'Within 2 weeks', tag: 'Most popular' },
  { value: '2-4-weeks', label: '2-4 weeks', savingsPercent: 0.10 },
  { value: '1-2-months', label: '1-2 months', savingsPercent: 0.20 },
  { value: '2+-months', label: '2+ months', tag: 'Best value', savingsPercent: 0.25 },
]

// Helper function to get price range for a home size
export function getPriceRange(homeSize: HomeSizeOption): { low: number; high: number } {
  const option = HOME_SIZE_OPTIONS.find(o => o.value === homeSize)
  return option?.priceRange ?? { low: 600, high: 1200 }
}

// Helper function to calculate estimated savings
export function calculateMovingSavings(
  homeSize: HomeSizeOption,
  moveDate: MoveDateOption
): { low: number; high: number } {
  const priceRange = getPriceRange(homeSize)
  const dateOption = MOVE_DATE_OPTIONS.find(o => o.value === moveDate)
  const savingsPercent = dateOption?.savingsPercent ?? 0
  
  return {
    low: Math.round(priceRange.low * savingsPercent),
    high: Math.round(priceRange.high * savingsPercent),
  }
}

// Form validation patterns
export const MOVING_VALIDATION = {
  zipCode: {
    pattern: /^\d{5}$/,
    message: 'Please enter a valid 5-digit zip code',
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
    message: 'Please enter a valid phone number',
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
}

// Progress indicator configuration for moving funnel
// Flow: Zipcodes → Home Size → Email+Recap → Move Date → Details → Results
export const MOVING_PROGRESS_SUBTITLES: Record<number, string> = {
  1: 'Step 1 of 5',
  2: 'Step 2 of 5',
  3: 'Step 3 of 5',
  4: 'Step 4 of 5',
  5: 'Step 5 of 5',
  6: 'Your matched movers',
}

export const MOVING_PROGRESS_TIME_ESTIMATES: Record<number, number> = {
  1: 15,  // Zipcodes
  2: 10,  // Home size
  3: 15,  // Email + Recap
  4: 10,  // Move date
  5: 20,  // Details (name + phone)
  6: 10,  // Results
}

export const MOVING_TOTAL_STEPS = 6

// Mover data for the matching screen
export const FEATURED_MOVERS = [
  {
    name: 'Two Men And A Truck',
    rating: 4.9,
    reviews: 2847,
    badge: 'Top Rated',
  },
  {
    name: 'Allied Van Lines',
    rating: 4.8,
    reviews: 1923,
    badge: 'Best Value',
  },
  {
    name: 'North American Van Lines',
    rating: 4.7,
    reviews: 1456,
    badge: 'Most Reliable',
  },
]
