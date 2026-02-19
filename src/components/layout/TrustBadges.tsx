import * as React from 'react'
import { Percent, Shield, Lock, ShieldCheck, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TrustBadge {
  icon?: LucideIcon
  text: string
}

const DEFAULT_BADGES: TrustBadge[] = [
  { icon: Percent, text: 'Compare top providers' },
  { icon: Shield, text: '100% free service' },
  { icon: Lock, text: 'Your data is secure' },
]

const LONGEVITY_BADGES: TrustBadge[] = [
  { icon: ShieldCheck, text: 'Forbes-Approved Clinics' },
  { icon: ShieldCheck, text: 'Deep Diagnostic Expertise' },
  { icon: ShieldCheck, text: 'Individualized Expert Consultations' },
]

interface TrustBadgesProps {
  className?: string
  badges?: TrustBadge[]
  /** "default" = white bg, "longevity" = dark green bg with light text */
  variant?: 'default' | 'longevity'
}

/**
 * TrustBadges Component
 * 
 * Bottom trust indicators that appear on all screens.
 * Pass custom `badges` to override the defaults.
 * Use `variant="longevity"` for the dark green Longevity Hub style.
 * 
 * @example
 * <TrustBadges />
 * <TrustBadges variant="longevity" />
 */
export function TrustBadges({ className, badges, variant = 'default' }: TrustBadgesProps) {
  const isLongevity = variant === 'longevity'
  const activeBadges = badges ?? (isLongevity ? LONGEVITY_BADGES : DEFAULT_BADGES)

  return (
    <div 
      className={cn(
        'w-full',
        isLongevity
          ? 'bg-[#0C7663] py-2.5 px-20 shadow-[0_4px_8px_-1px_rgba(0,0,0,0.10),0_0_1px_rgba(0,0,0,0.05)]'
          : 'border-t border-neutral-200 bg-white py-4',
        className
      )}
    >
      <div className={cn(
        isLongevity
          ? 'flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10'
          : 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
      )}>
        {!isLongevity && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {activeBadges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <div key={index} className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4 text-primary-700" />}
                  <span className="text-body-sm text-neutral-800">{badge.text}</span>
                </div>
              )
            })}
          </div>
        )}
        {isLongevity && activeBadges.map((badge, index) => {
          const Icon = badge.icon
          return (
            <div key={index} className="flex items-center gap-1.5">
              {Icon && <Icon className="w-5 h-5 text-white" />}
              <span className="text-sm font-normal leading-[18px] text-[#E2E8F0]">
                {badge.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrustBadges
