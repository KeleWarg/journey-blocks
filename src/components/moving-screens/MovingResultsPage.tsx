'use client'

import * as React from 'react'
import {
  Phone,
  CheckCircle2,
  Star,
  ChevronDown,
  Shield,
  Clock,
  MapPin,
  Truck,
  Home,
  Calendar,
  DollarSign,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { cn } from '@/lib/utils'
import { HOME_SIZE_OPTIONS, MOVE_DATE_OPTIONS, type HomeSizeOption, type MoveDateOption } from '@/types/moving'

interface MovingResultsPageProps {
  firstName: string
  email: string
  homeSize: HomeSizeOption
  moveDate: MoveDateOption
  zipFrom: string
  zipTo: string
}

// FAQ data for moving
const faqs = [
  {
    question: "How much does hiring movers typically cost?",
    answer: "Moving costs vary based on distance, home size, and services needed. Local moves typically cost $300-$1,500, while long-distance moves can range from $2,000-$7,500. Getting multiple quotes helps you find the best value."
  },
  {
    question: "What should I look for in a moving company?",
    answer: "Look for proper licensing (USDOT number for interstate moves), insurance coverage, positive reviews, transparent pricing, and no large upfront deposits. Reputable movers provide written estimates and clear contracts."
  },
  {
    question: "How far in advance should I book movers?",
    answer: "Book at least 4-8 weeks in advance for local moves and 8-12 weeks for long-distance moves. During peak season (May-September), booking even earlier is recommended."
  },
  {
    question: "What items won't movers transport?",
    answer: "Most movers won't transport hazardous materials, perishables, plants, pets, valuables like jewelry or important documents, or items of sentimental value. Check with your mover for their specific policies."
  },
  {
    question: "Should I tip my movers?",
    answer: "Tipping is customary but not required. A common guideline is $4-5 per hour per mover for local moves, or $20-40 per mover for a full-day job. Exceptional service may warrant more."
  }
]

// Educational steps for hiring movers
const educationalSteps = [
  {
    title: "Compare multiple quotes",
    description: "Get at least 3 in-home or virtual estimates to compare pricing and services."
  },
  {
    title: "Verify credentials",
    description: "Check USDOT numbers, state licenses, and insurance coverage before signing."
  },
  {
    title: "Read reviews carefully",
    description: "Look for recent reviews on Google, Yelp, and the BBB. Pay attention to how companies handle complaints."
  },
  {
    title: "Understand the estimate type",
    description: "Know if you're getting a binding, non-binding, or binding not-to-exceed estimate."
  },
  {
    title: "Review the contract",
    description: "Read all terms carefully, including liability coverage, cancellation policies, and payment terms."
  },
  {
    title: "Document your belongings",
    description: "Take photos and create an inventory before moving day for insurance purposes."
  }
]

// Partner/mover features
const moverFeatures = [
  "Licensed & insured",
  "Free estimates",
  "No hidden fees",
  "Flexible scheduling",
  "Full-service options",
  "Damage protection"
]

/**
 * MovingResultsPage
 * 
 * Full-page results view showing matched movers, call countdown,
 * move profile recap, and educational content about hiring movers.
 */
export function MovingResultsPage({
  firstName,
  email,
  homeSize,
  moveDate,
  zipFrom,
  zipTo,
}: MovingResultsPageProps) {
  // Countdown state (3 minutes = 180 seconds)
  const [countdown, setCountdown] = React.useState(180)
  
  // FAQ accordion state
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)
  
  // Get labels and price range
  const sizeOption = HOME_SIZE_OPTIONS.find(o => o.value === homeSize)
  const sizeLabel = sizeOption?.label ?? 'Home'
  const priceRange = sizeOption?.priceRange ?? { low: 600, high: 1200 }
  
  const dateOption = MOVE_DATE_OPTIONS.find(o => o.value === moveDate)
  const dateLabel = dateOption?.label ?? 'Flexible'
  
  // Countdown timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  // Format time as M:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <Header />
      
      {/* 1. URGENCY BANNER (sticky below header) */}
      <div className="bg-feedback-warning text-neutral-900 py-3 px-4 sticky top-12 z-40">
        <div className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">
            A moving specialist will call you in{' '}
            <span className="bg-black/10 px-2 py-0.5 rounded font-bold">
              {formatTime(countdown)}
            </span>
          </span>
        </div>
      </div>
      
      {/* 2. HEADER SECTION */}
      <div className="text-center py-8 px-4 bg-white">
        <p className="text-primary-700 text-sm font-medium uppercase tracking-wide">
          Your Matched Movers
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mt-2">
          {firstName}, here&apos;s your top match
        </h1>
        <p className="text-neutral-500 mt-3 max-w-xl mx-auto">
          Based on your {sizeLabel.toLowerCase()} move from {zipFrom} to {zipTo}, we&apos;ve matched you with verified movers.
        </p>
      </div>
      
      {/* 3. TWO-COLUMN LAYOUT */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* LEFT COLUMN (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* a) MOVER MATCH CARD */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            {/* Best Match Banner */}
            <div className="bg-feedback-success text-white text-center py-2 text-sm font-medium">
              ✓ Best Match for Your Move
            </div>
            
            {/* Mover Content */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Mover Logo Placeholder */}
                <div className="w-16 h-16 bg-primary-300 rounded-xl flex items-center justify-center">
                  <Truck className="w-8 h-8 text-primary-700" />
                </div>
                
                <div className="flex-1">
                  <p className="text-xs text-primary-700 font-medium uppercase">Top Match for Your Route</p>
                  <h3 className="text-xl font-bold text-neutral-900">Two Men And A Truck</h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    One of America&apos;s most trusted moving companies with nationwide coverage.
                  </p>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">4.9★</p>
                  <p className="text-xs text-neutral-500">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">2,847</p>
                  <p className="text-xs text-neutral-500">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">35+ yrs</p>
                  <p className="text-xs text-neutral-500">In Business</p>
                </div>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {moverFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-feedback-success" />
                    <span className="text-sm text-neutral-800">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Rating Footer */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-100">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-neutral-500">4.9/5 from 2,847 reviews</span>
              </div>
            </div>
          </div>
          
          {/* b) WHAT TO EXPECT CALLOUT */}
          <div className="bg-primary-300 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-primary-700 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-neutral-900">What to expect now</h4>
                <p className="text-sm text-neutral-800 mt-1">
                  Expect a call from your matched mover in just a few minutes. Be ready to discuss your move details — speaking with them right away will help you get the most accurate quote.
                </p>
              </div>
            </div>
          </div>
          
          {/* c) EDUCATIONAL CONTENT */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              How to Hire the Right Moving Company
            </h3>
            <p className="text-sm text-neutral-500 mb-4">
              Follow these steps to ensure you choose a reputable mover:
            </p>
            
            <ol className="divide-y divide-neutral-100">
              {educationalSteps.map((step, index) => (
                <li key={index} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-300 text-primary-700 text-sm font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-neutral-800">{step.title}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          {/* d) FAQ SECTION */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-medium text-neutral-800 pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={cn(
                        'w-5 h-5 text-neutral-500 transition-transform flex-shrink-0',
                        openFaq === index && 'rotate-180'
                      )} 
                    />
                  </button>
                  
                  {openFaq === index && (
                    <p className="text-sm text-neutral-500 mt-2 pr-8 animate-fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN (1/3 width on desktop) */}
        <div className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
          
          {/* a) YOUR MOVE PROFILE RECAP CARD */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <div className="bg-primary-300 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary-700" />
                <p className="font-semibold text-neutral-900">Your Move Profile</p>
              </div>
              <p className="text-xs text-neutral-500">Personalized for {firstName}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> From
                </span>
                <span className="text-sm font-semibold text-neutral-800">{zipFrom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> To
                </span>
                <span className="text-sm font-semibold text-neutral-800">{zipTo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <Home className="w-4 h-4" /> Size
                </span>
                <span className="text-sm font-semibold text-neutral-800">{sizeLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Timeline
                </span>
                <span className="text-sm font-semibold text-neutral-800">{dateLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" /> Est. Range
                </span>
                <span className="text-sm font-semibold text-neutral-800">
                  ${priceRange.low.toLocaleString()}–${priceRange.high.toLocaleString()}
                </span>
              </div>
            </div>
            
            <p className="text-feedback-success font-medium mt-3">
              Status: ✓ Quotes on the way
            </p>
          </div>
          
          {/* b) CALL CTA CARD */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <h4 className="font-semibold text-neutral-900 mb-3">Can&apos;t wait for the call?</h4>
            
            <a 
              href="tel:800-555-MOVE" 
              className="flex items-center justify-center gap-2 w-full bg-primary-700 text-white py-3 rounded-[8px] font-semibold hover:bg-primary-750 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 800-555-MOVE
            </a>
            
            <p className="text-xs text-neutral-500 text-center mt-3">
              Speak with a moving specialist immediately
            </p>
            
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-100">
              <div className="text-center">
                <Shield className="w-5 h-5 text-neutral-500 mx-auto" />
                <p className="text-xs text-neutral-500 mt-1">Free Cancellation</p>
              </div>
              <div className="text-center">
                <Clock className="w-5 h-5 text-neutral-500 mx-auto" />
                <p className="text-xs text-neutral-500 mt-1">Quick Response</p>
              </div>
              <div className="text-center">
                <MapPin className="w-5 h-5 text-neutral-500 mx-auto" />
                <p className="text-xs text-neutral-500 mt-1">Local Movers</p>
              </div>
            </div>
          </div>
          
          {/* c) EMAIL CONFIRMATION */}
          <div className="bg-secondary-300 rounded-xl p-4 text-center">
            <p className="text-sm text-neutral-700">
              Quotes will also be sent to:
            </p>
            <p className="text-sm font-medium text-neutral-900 mt-1">
              {email}
            </p>
          </div>
        </div>
      </div>
      
      {/* Trust Badges */}
      <TrustBadges className="mt-12" />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MovingResultsPage
