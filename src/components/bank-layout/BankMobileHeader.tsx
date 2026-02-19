'use client'

import * as React from 'react'
import Image from 'next/image'
import { Star, Search, ThumbsUp, ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react'
import { BANK_VALUE_PROPS } from '@/types/banks'

const VALUE_PROP_ICONS: Record<(typeof BANK_VALUE_PROPS)[number]['id'], LucideIcon> = {
  'proprietary-data': Star,
  'comprehensive-research': Search,
  'trusted-guidance': ThumbsUp,
}

export function BankMobileHeader() {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="md:hidden">
      {/* Fixed black header bar with logo */}
      <div className="fixed top-0 z-50 flex w-full justify-center bg-black px-4 py-3">
        <Image
          src="/forbes-advisor-logo.svg"
          alt="Forbes Advisor"
          width={140}
          height={18}
          priority
          className="h-[18px] w-auto brightness-0 invert"
        />
      </div>

      {/* Full-width collapsible "WHY CHOOSE US" dropdown attached to header */}
      <div className="fixed top-[42px] left-0 z-40 w-full">
        {/* Expanded content */}
        <div
          className={[
            'flex w-full justify-between bg-[#C5CCED] text-[#4657A1] transition-all duration-300 overflow-hidden',
            expanded ? 'h-20' : 'h-0',
          ].join(' ')}
        >
          {BANK_VALUE_PROPS.map((item) => {
            const Icon = VALUE_PROP_ICONS[item.id]
            return (
              <div
                key={item.id}
                className="flex flex-1 flex-col items-center justify-center px-2 py-3 text-center"
              >
                <Icon className="mb-1 h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[10px] font-semibold leading-tight">{item.title}</span>
              </div>
            )
          })}
        </div>

        {/* Full-width toggle bar */}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex w-full items-center justify-center gap-1 rounded-b-xl bg-[#24326E] px-4 py-1.5 text-[11px] font-medium text-[#F5F7FF]"
        >
          WHY CHOOSE US
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

    </div>
  )
}

export default BankMobileHeader
