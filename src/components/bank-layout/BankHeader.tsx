import * as React from 'react'
import Image from 'next/image'

interface BankHeaderProps {
  className?: string
}

export function BankHeader({ className }: BankHeaderProps) {
  return (
    <header className={className}>
      <div className="w-full bg-[#5B5FC7]">
        <div className="flex h-14 w-full items-center px-6 sm:px-10 lg:px-14">
          <Image
            src="/forbes-advisor-logo.svg"
            alt="Forbes Advisor"
            width={167}
            height={21}
            priority
            className="h-5 w-auto brightness-0 invert"
          />
        </div>
      </div>
    </header>
  )
}

export default BankHeader
