import * as React from 'react'
import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
  /** Optional trust text shown on the right side of the header (e.g., "Trusted by 100k+ people") */
  trustText?: string
}

/**
 * Header Component
 * 
 * Forbes Advisor branded header with logo
 * Optionally shows trust text on the right side
 * 
 * @example
 * <Header />
 * <Header trustText="Trusted by 100k+ people" />
 */
export function Header({ className, trustText }: HeaderProps) {
  return (
    <header 
      className={cn(
        'w-full bg-white sticky top-0 z-50',
        className
      )}
      style={{
        boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 8px -1px rgba(0, 0, 0, 0.10)'
      }}
    >
      <div className={cn(
        'w-full max-w-[1440px] mx-auto h-12 px-4 sm:px-20 flex items-center gap-2.5',
        trustText ? 'justify-between' : 'justify-center'
      )}>
        {/* Forbes Advisor Logo */}
        <Image
          src="/forbes-advisor-logo.svg"
          alt="Forbes Advisor"
          width={167}
          height={21}
          priority
        />

        {/* Optional trust badge */}
        {trustText && (
          <div className="hidden sm:flex items-center gap-1.5 text-[#333333]">
            <ShieldCheck className="w-4 h-4 text-[#333333]" />
            <span className="text-sm font-normal leading-5">{trustText}</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
