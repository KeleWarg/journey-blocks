import * as React from 'react'
import Image from 'next/image'
import { Star, Search, ThumbsUp, type LucideIcon } from 'lucide-react'
import { BANK_VALUE_PROPS } from '@/types/banks'

interface BankSidebarProps {
  className?: string
}

const VALUE_PROP_ICONS: Record<(typeof BANK_VALUE_PROPS)[number]['id'], LucideIcon> = {
  'proprietary-data': Star,
  'comprehensive-research': Search,
  'trusted-guidance': ThumbsUp,
}

export function BankSidebar({ className }: BankSidebarProps) {
  return (
    <aside className={className}>
      <div className="flex h-full flex-col bg-[#5B5FC7] text-white">
        {/* Logo area at top of panel */}
        <div className="px-10 pt-5 pb-0 lg:px-14">
          <Image
            src="/forbes-advisor-logo.svg"
            alt="Forbes Advisor"
            width={167}
            height={21}
            priority
            className="h-5 w-auto brightness-0 invert"
          />
        </div>

        {/* Value props vertically centered in remaining space */}
        <div className="flex flex-1 flex-col justify-center px-10 lg:px-14">
          <div className="w-full max-w-sm">
            <h2 className="mb-10 text-2xl font-bold tracking-tight">WHY CHOOSE US?</h2>

            <div className="space-y-8">
              {BANK_VALUE_PROPS.map((item) => {
                const Icon = VALUE_PROP_ICONS[item.id]

                return (
                  <div key={item.id} className="flex items-start gap-4">
                    <Icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-white/80" strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <h3 className="text-base font-bold leading-tight">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/75">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default BankSidebar
