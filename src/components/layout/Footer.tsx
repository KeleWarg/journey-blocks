import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

/**
 * Footer Component
 * 
 * Site footer with trust signals and navigation links
 * Desktop: Left side has trust badges, right side has links
 * Mobile: Stacked layout with trust badges on top, links below
 * 
 * @example
 * <Footer />
 */
export function Footer({ className }: FooterProps) {
  const links = [
    { label: 'Advertiser Disclosure', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Contact Us', href: '#' },
  ]

  return (
    <footer 
      className={cn(
        'w-full bg-white',
        // Add bottom padding on mobile to account for sticky button
        'pb-24 sm:pb-0',
        className
      )}
      style={{
        boxShadow: '0 -4px 8px 0 rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto h-auto md:h-16 px-6 md:px-20 py-4 md:py-0 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        {/* Trust Signals - Left Side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/shield-check.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            <span className="text-sm text-neutral-500">
              Secured by Forbes Advisor
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Image
              src="/shield-check.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            <span className="text-sm text-neutral-500">
              Your privacy is our priority
            </span>
          </div>
        </div>

        {/* Navigation Links - Right Side */}
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-primary-700 hover:text-primary-750 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
