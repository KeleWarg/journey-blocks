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
  Gift,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { formatCurrency, cn } from '@/lib/utils'
import type { DebtTypeOption } from '@/types/funnel'

interface ResultsPageProps {
  firstName: string
  debtAmount: number
  debtType: DebtTypeOption
  income: number
}

// Map debt type to display label
const DEBT_TYPE_LABELS: Record<DebtTypeOption, string> = {
  'credit-card': 'Credit Card Debt',
  'personal-loan': 'Personal Loan',
  'both': 'Credit Card & Loan Debt',
}

// FAQ data
const faqs = [
  {
    question: "How much does debt relief cost?",
    answer: "Debt relief companies typically charge a fee for their services, which can range from 15% to 25% of the total debt owed. Most companies work on a performance-based fee structure, meaning you only pay a fee once the company settles a debt."
  },
  {
    question: "What percentage of debt is typically accepted in a settlement?",
    answer: "Debt settlement companies typically negotiate to reduce your debt by 30-50% of the original balance, though results vary based on your specific situation and creditors."
  },
  {
    question: "How long does debt settlement take?",
    answer: "Most debt settlement programs take 24-48 months to complete, depending on the amount of debt and your ability to make monthly deposits into your settlement account."
  },
  {
    question: "Will debt relief affect my credit score?",
    answer: "Debt settlement can temporarily lower your credit score, but many people find their scores recover over time as they pay off debts and demonstrate responsible financial behavior."
  },
  {
    question: "How long does debt settlement stay on your credit report?",
    answer: "Settled accounts typically remain on your credit report for 7 years from the original delinquency date, though the impact lessens over time."
  }
]

// Educational steps
const educationalSteps = [
  {
    title: "Research companies",
    description: "Identify reputable debt relief companies by reading reviews and checking ratings."
  },
  {
    title: "Verify each company's credentials",
    description: "Check accreditation with organizations like the Better Business Bureau (BBB) or the American Fair Credit Council (AFCC)."
  },
  {
    title: "Gather your financial information",
    description: "Collect details and documents relating to your debts, income and expenses."
  },
  {
    title: "Schedule a free initial consultation",
    description: "Be ready to discuss your financial situation and options. Most debt relief companies offer free consultations."
  },
  {
    title: "Compare plans",
    description: "Evaluate each firm's proposed debt relief plans and their fees, as well as features like online chat and real-time updates."
  },
  {
    title: "Read the contract carefully",
    description: "Review all terms, conditions and fees before signing any agreement."
  }
]

// Partner features
const partnerFeatures = [
  "No upfront fees",
  "Free consultation",
  "A+ BBB rating",
  "24/7 support",
  "$10B+ debt resolved",
  "Dedicated advisor"
]

/**
 * ResultsPage
 * 
 * Full-page results view showing matched partner, call countdown,
 * debt profile recap, and educational content about debt relief.
 */
export function ResultsPage({
  firstName,
  debtAmount,
  debtType,
  income
}: ResultsPageProps) {
  // Countdown state (3 minutes = 180 seconds)
  const [countdown, setCountdown] = React.useState(180)
  
  // FAQ accordion state
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)
  
  // Calculate derived values
  const ratio = Math.round((debtAmount / income) * 100)
  
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
            A debt specialist will call you in{' '}
            <span className="bg-black/10 px-2 py-0.5 rounded font-bold">
              {formatTime(countdown)}
            </span>
          </span>
        </div>
      </div>
      
      {/* 2. HEADER SECTION */}
      <div className="text-center py-8 px-4 bg-white">
        <p className="text-primary-700 text-sm font-medium uppercase tracking-wide">
          Your Matched Results
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mt-2">
          {firstName}, here&apos;s your top match
        </h1>
        <p className="text-neutral-500 mt-3 max-w-xl mx-auto">
          Based on your {formatCurrency(debtAmount)} in {DEBT_TYPE_LABELS[debtType].toLowerCase()} and {ratio}% debt-to-income ratio, we&apos;ve matched you with a specialist.
        </p>
      </div>
      
      {/* 3. TWO-COLUMN LAYOUT */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* LEFT COLUMN (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* a) PARTNER MATCH CARD */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            {/* Best Match Banner */}
            <div className="bg-feedback-success text-white text-center py-2 text-sm font-medium">
              ✓ Best Match for Your Profile
            </div>
            
            {/* Partner Content */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Partner Logo */}
                <img 
                  src="/freedom-debt-relief_logo.png" 
                  alt="Freedom Debt Relief" 
                  className="w-16 h-16 object-contain"
                />
                
                <div className="flex-1">
                  <p className="text-xs text-primary-700 font-medium uppercase">Top Match for Your Profile</p>
                  <h3 className="text-xl font-bold text-neutral-900">Freedom Debt Relief</h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    One of America&apos;s largest and most trusted debt relief companies.
                  </p>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">15-25%</p>
                  <p className="text-xs text-neutral-500">Avg. Fee</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">A+</p>
                  <p className="text-xs text-neutral-500">BBB Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">24-48 mo</p>
                  <p className="text-xs text-neutral-500">Avg. Timeline</p>
                </div>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {partnerFeatures.map((feature, i) => (
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
                <span className="text-sm text-neutral-500">4.7/5 from 10,000+ reviews</span>
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
                  Expect a call from your matched partner in just a few minutes. Be sure to answer — speaking with them right away will help tailor the best options for your needs.
                </p>
              </div>
            </div>
          </div>
          
          {/* c) EDUCATIONAL CONTENT */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              How to Apply for a Debt Relief Program
            </h3>
            <p className="text-sm text-neutral-500 mb-4">
              Here are the main steps you should take when applying to a debt relief company:
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
          
          {/* a) YOUR PROFILE RECAP CARD */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <div className="bg-primary-300 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-primary-700" />
                <p className="font-semibold text-neutral-900">Your Debt Profile</p>
              </div>
              <p className="text-xs text-neutral-500">Personalized for {firstName}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Total Debt</span>
                <span className="text-sm font-semibold text-neutral-800">{formatCurrency(debtAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Debt Type</span>
                <span className="text-sm font-semibold text-neutral-800">{DEBT_TYPE_LABELS[debtType]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Annual Income</span>
                <span className="text-sm font-semibold text-neutral-800">{formatCurrency(income)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">DTI Ratio</span>
                <span className="text-sm font-semibold text-neutral-800">{ratio}%</span>
              </div>
            </div>
            
            <p className="text-feedback-success font-medium mt-3">
              Status: ✓ Strong match
            </p>
          </div>
          
          {/* b) CALL CTA CARD */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5">
            <h4 className="font-semibold text-neutral-900 mb-3">Can&apos;t wait for the call?</h4>
            
            <a 
              href="tel:800-808-6539" 
              className="flex items-center justify-center gap-2 w-full bg-primary-700 text-white py-3 rounded-[8px] font-semibold hover:bg-primary-750 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 800-808-6539
            </a>
            
            <p className="text-xs text-neutral-500 text-center mt-3">
              Speak with a debt specialist immediately
            </p>
            
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-100">
              <div className="text-center">
                <Shield className="w-5 h-5 text-neutral-500 mx-auto" />
                <p className="text-xs text-neutral-500 mt-1">30-Day Guarantee</p>
              </div>
              <div className="text-center">
                <Clock className="w-5 h-5 text-neutral-500 mx-auto" />
                <p className="text-xs text-neutral-500 mt-1">24/7 Support</p>
              </div>
              <div className="text-center">
                <MapPin className="w-5 h-5 text-neutral-500 mx-auto" />
                <p className="text-xs text-neutral-500 mt-1">US-Based Team</p>
              </div>
            </div>
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

export default ResultsPage
