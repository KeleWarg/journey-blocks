'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface StickyButtonContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * StickyButtonContainer Component
 * 
 * Wraps a button (typically the form submit button) and makes it sticky/fixed 
 * at the bottom of the screen on mobile devices. On tablet and desktop, 
 * the button renders inline as normal.
 * 
 * Features:
 * - Fixed position on mobile (< 640px)
 * - White background with subtle top shadow
 * - Safe area padding for iOS devices with home indicator
 * - Normal inline flow on tablet/desktop
 * - Moves up when mobile keyboard appears (using Visual Viewport API)
 * 
 * @example
 * <StickyButtonContainer>
 *   <Button type="submit" fullWidth>Continue</Button>
 * </StickyButtonContainer>
 */
export function StickyButtonContainer({ 
  children, 
  className 
}: StickyButtonContainerProps) {
  const [keyboardOffset, setKeyboardOffset] = React.useState(0)

  React.useEffect(() => {
    // Only run on mobile (check if it's a touch device and small screen)
    const isMobile = window.matchMedia('(max-width: 639px)').matches
    if (!isMobile) return

    const visualViewport = window.visualViewport
    if (!visualViewport) return

    const handleResize = () => {
      // Calculate the difference between the layout viewport and visual viewport
      // This difference represents the keyboard height
      const keyboardHeight = window.innerHeight - visualViewport.height
      
      // Only apply offset if keyboard is likely open (height > 100px threshold)
      // and the visual viewport has scrolled (keyboard pushed content up)
      if (keyboardHeight > 100) {
        // Account for the viewport offset (scroll position within visual viewport)
        const offset = keyboardHeight - visualViewport.offsetTop
        setKeyboardOffset(Math.max(0, offset))
      } else {
        setKeyboardOffset(0)
      }
    }

    // Listen to both resize and scroll events on visual viewport
    visualViewport.addEventListener('resize', handleResize)
    visualViewport.addEventListener('scroll', handleResize)

    // Initial check
    handleResize()

    return () => {
      visualViewport.removeEventListener('resize', handleResize)
      visualViewport.removeEventListener('scroll', handleResize)
    }
  }, [])

  return (
    <>
      {/* Button container - sticky on mobile, normal on desktop */}
      <div
        className={cn(
          // Mobile: fixed at bottom with styling
          'fixed left-0 right-0 bg-white border-t border-neutral-200 px-4 pt-4 pb-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]',
          // Tablet/Desktop: normal positioning
          'sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:bg-transparent sm:border-0 sm:p-0 sm:shadow-none',
          // Smooth transition for keyboard appearance
          'transition-[bottom] duration-150 ease-out',
          className
        )}
        style={{
          // Apply keyboard offset on mobile, use bottom: 0 as base
          bottom: keyboardOffset > 0 ? `${keyboardOffset}px` : 0,
        }}
      >
        <div className="max-w-[410px] mx-auto sm:max-w-none">
          {children}
        </div>
      </div>
    </>
  )
}

export default StickyButtonContainer
