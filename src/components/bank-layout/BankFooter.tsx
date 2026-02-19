import * as React from 'react'
import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'

interface BankFooterProps {
  className?: string
}

export function BankFooter({ className }: BankFooterProps) {
  return (
    <footer className={className}>
      <div className="hidden bg-black px-6 py-2.5 md:block md:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-y-2">
          {/* Left group: A PRODUCT OF + Forbes logo | Trust text */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">A PRODUCT OF</span>
            <Image
              src="/forbes-logo.svg"
              alt="Forbes"
              width={90}
              height={20}
              className="h-5 w-auto brightness-0 invert"
            />
            <span className="text-white/20">|</span>
            <span className="text-xs text-white/60">
              Trusted expertise. Every step.{' '}
              <span className="text-[#4ADE80]">All free.</span>
            </span>
          </div>

          {/* Right group: Secured + Advertiser Disclosure */}
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Secured by ForbesAdvisor
            </span>
            <a href="#" className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white/80">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Advertiser Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default BankFooter
