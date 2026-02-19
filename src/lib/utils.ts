import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conditional classes and removes duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency values
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format phone number as (###) ###-####
 */
export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
  
  if (!match) return value
  
  const [, area, prefix, line] = match
  
  if (line) return `(${area}) ${prefix}-${line}`
  if (prefix) return `(${area}) ${prefix}`
  if (area) return `(${area}`
  return ''
}

/**
 * Calculate debt savings estimate
 */
export function calculateSavings(debtAmount: number): {
  newDebtAmount: number
  savings: number
  monthlyPayment: number
} {
  // Estimate 40% debt reduction
  const reductionRate = 0.4
  const newDebtAmount = Math.round(debtAmount * (1 - reductionRate))
  const savings = debtAmount - newDebtAmount
  // Estimate 48-month payment plan
  const monthlyPayment = Math.round(newDebtAmount / 48)
  
  return { newDebtAmount, savings, monthlyPayment }
}
