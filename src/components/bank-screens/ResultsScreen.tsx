'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Check,
  ShieldCheck,
  Eye,
  Sparkles,
} from 'lucide-react'
import {
  ACCOUNT_TYPE_LABELS,
  ACCOUNT_SUBTYPES,
  MOCK_BANK_PRODUCTS,
  BANK_FAQ_ITEMS,
  BANK_ACCOUNT_TYPE_OPTIONS,
  type BankAccountType,
  type BankFunnelData,
  type BankProduct,
} from '@/types/banks'

interface ResultsScreenProps {
  funnelData: BankFunnelData
}

const ITEMS_PER_PAGE = 4

export function ResultsScreen({ funnelData }: ResultsScreenProps) {
  const accountType = funnelData.accountType ?? 'checking'
  const accountLabel = ACCOUNT_TYPE_LABELS[accountType]
  const depositAmount = funnelData.depositAmount
    ? `$ ${Number(funnelData.depositAmount).toLocaleString('en-US')}`
    : '$ 20,000'

  const [selectedAccount] = React.useState<BankAccountType>(accountType)
  const [selectedSubtypes, setSelectedSubtypes] = React.useState<string[]>([
    ACCOUNT_SUBTYPES[accountType]?.[0] ?? '',
  ])
  const [state, setState] = React.useState('Florida')
  const [deposit, setDeposit] = React.useState(depositAmount)
  const [additionalFilters, setAdditionalFilters] = React.useState<string[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [expandedFaq, setExpandedFaq] = React.useState<number>(0)
  const [sortBy, setSortBy] = React.useState('recommended')

  const products = MOCK_BANK_PRODUCTS[accountType] ?? MOCK_BANK_PRODUCTS.checking
  const faqItems = BANK_FAQ_ITEMS[accountType] ?? BANK_FAQ_ITEMS.checking
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const toggleSubtype = (subtype: string) => {
    setSelectedSubtypes((prev) =>
      prev.includes(subtype) ? prev.filter((s) => s !== subtype) : [...prev, subtype]
    )
  }

  const toggleAdditional = (filter: string) => {
    setAdditionalFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  const today = new Date()
  const dateString = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white py-3 text-center">
        <Image
          src="/forbes-advisor-logo.svg"
          alt="Forbes Advisor"
          width={160}
          height={20}
          priority
          className="mx-auto h-5 w-auto"
        />
      </header>

      {/* Hero Banner */}
      <section className="relative bg-neutral-100 text-neutral-900">
        <div className="mx-auto flex max-w-7xl flex-col-reverse md:flex-row md:items-stretch">
          <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 md:py-16 lg:px-16">
            <h1 className="font-display text-display leading-tight text-neutral-900 md:text-display-md lg:text-display-lg">
              Great job! Your {accountLabel.toLowerCase()} account options are ready!
            </h1>
            <p className="mt-4 text-body text-neutral-500 md:text-body-lg">
              Congratulations, we&apos;ve found the best {accountLabel.toLowerCase()} accounts for
              you!
            </p>
          </div>
          <div className="relative h-48 w-full md:min-h-[260px] md:w-[45%] lg:w-[40%]">
            <Image
              src="/results-hero.jpg"
              alt="Person reviewing banking options"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Title + Sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-headline-md text-neutral-900">
            Top {accountLabel} Accounts for {dateString}
          </h2>
          <div className="relative w-fit shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer appearance-none rounded border border-neutral-200 bg-white py-2 pl-4 pr-10 text-body-sm text-neutral-800 outline-none focus:border-primary-700 focus:ring-2 focus:ring-focus"
            >
              <option value="recommended">Sort By</option>
              <option value="apy-high">APY (High to Low)</option>
              <option value="apy-low">APY (Low to High)</option>
              <option value="fee-low">Monthly Fee (Low to High)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filter Sidebar */}
          <aside className="w-full shrink-0 lg:w-[200px]">
            <h3 className="mb-4 text-body font-bold text-neutral-900">Filter Results</h3>

            {/* Account type filter */}
            <div className="mb-6">
              <p className="mb-2 text-body-sm font-medium text-neutral-800">Account</p>
              <label className="mb-2 flex cursor-pointer items-center gap-2">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border-2 ${selectedAccount === accountType ? 'border-feedback-success bg-feedback-success text-white' : 'border-neutral-200'}`}
                >
                  {selectedAccount === accountType && <Check className="h-3.5 w-3.5" />}
                </span>
                <span className="text-body-sm font-medium text-primary-700">{accountLabel}</span>
              </label>
            </div>

            {/* Sub-types */}
            <div className="mb-6">
              <p className="mb-2 text-body-sm font-medium text-neutral-800">Select account type</p>
              <div className="space-y-2">
                {ACCOUNT_SUBTYPES[accountType]?.map((subtype) => (
                  <label
                    key={subtype}
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => toggleSubtype(subtype)}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded border-2 ${selectedSubtypes.includes(subtype) ? 'border-feedback-success bg-feedback-success text-white' : 'border-neutral-200'}`}
                    >
                      {selectedSubtypes.includes(subtype) && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="text-body-sm text-neutral-800">{subtype}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* State */}
            <div className="mb-6">
              <p className="mb-2 text-body-sm font-medium text-neutral-800">State</p>
              <div className="relative">
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full appearance-none rounded border border-neutral-200 bg-white px-3 py-2 pr-8 text-body-sm text-neutral-800 outline-none focus:border-primary-700"
                >
                  <option>Florida</option>
                  <option>California</option>
                  <option>New York</option>
                  <option>Texas</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>

            {/* Deposit */}
            <div className="mb-6">
              <p className="mb-2 text-body-sm font-medium text-neutral-800">Deposit amount</p>
              <input
                type="text"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full rounded border border-neutral-200 bg-white px-3 py-2 text-body-sm text-neutral-800 outline-none focus:border-primary-700"
              />
            </div>

            {/* Additional account types */}
            <div className="space-y-2">
              {BANK_ACCOUNT_TYPE_OPTIONS.filter((o) => o.value !== accountType).map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => toggleAdditional(option.value)}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 ${additionalFilters.includes(option.value) ? 'border-feedback-success bg-feedback-success text-white' : 'border-neutral-200'}`}
                  >
                    {additionalFilters.includes(option.value) && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="text-body-sm text-neutral-800">{option.label}</span>
                </label>
              ))}
              <label
                className="flex cursor-pointer items-center gap-2"
                onClick={() => toggleAdditional('online')}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border-2 ${additionalFilters.includes('online') ? 'border-feedback-success bg-feedback-success text-white' : 'border-neutral-200'}`}
                >
                  {additionalFilters.includes('online') && <Check className="h-3.5 w-3.5" />}
                </span>
                <span className="text-body-sm text-neutral-800">Online</span>
              </label>
            </div>
          </aside>

          {/* Product Cards */}
          <div className="flex-1">
            <div className="space-y-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-primary-700 transition-colors hover:bg-neutral-100 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border text-body-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'border-primary-700 bg-white text-primary-700'
                        : 'border-neutral-200 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-primary-700 transition-colors hover:bg-neutral-100 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <span className="ml-2 text-body-sm text-neutral-500">of {totalPages}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-headline-md text-neutral-900">Frequently Asked Questions</h2>
          <div className="divide-y divide-neutral-200">
            {faqItems.map((item, idx) => (
              <div key={idx}>
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-body font-semibold text-neutral-900 underline">
                    {item.question}
                  </span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-neutral-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-neutral-500" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="pb-5">
                    <p className="text-body-sm leading-relaxed text-neutral-800">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Bar */}
      <div className="border-t border-neutral-200 bg-neutral-100 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 sm:gap-10">
          {[
            'Share some details',
            'Receive recommendations',
            "Determine if it's the right fit",
          ].map((step) => (
            <span key={step} className="flex items-center gap-2 text-body-sm text-neutral-800">
              <Check className="h-4 w-4 text-feedback-success" />
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4 text-caption text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secured by Forbes Advisor
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              Your privacy is our priority
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-caption">
            <a href="#" className="font-medium text-primary-700 hover:underline">
              Advertiser Disclosure
            </a>
            <a href="#" className="font-medium text-primary-700 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="font-medium text-primary-700 hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCard({ product }: { product: BankProduct }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-card">
      {/* Category tag + FDIC badge */}
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary-700 px-3 py-1 text-xs font-semibold text-white">
          <Sparkles className="h-3 w-3" />
          {product.category}
        </span>
        {product.memberFdic && (
          <span className="text-legal font-semibold uppercase tracking-wider text-neutral-500">
            Member FDIC
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
        {/* Left: Bank info + stats */}
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-caption font-bold text-white">
              {product.name.charAt(0)}
            </div>
            <span className="text-body font-bold text-neutral-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            <div>
              <p className="text-caption font-semibold text-neutral-500">APY</p>
              <p className="text-body-sm font-bold text-neutral-900">{product.apy}</p>
              <p className="text-legal text-neutral-500">{product.apyDate}</p>
            </div>
            <div>
              <p className="text-caption font-semibold text-neutral-500">Bonus</p>
              <p className="text-body-sm font-bold text-neutral-900">{product.bonus}</p>
              <p className="whitespace-pre-line text-legal text-neutral-500">
                {product.bonusDetails}
              </p>
            </div>
            <div>
              <p className="text-caption font-semibold text-neutral-500">Monthly fee</p>
              <p className="text-body-sm font-bold text-neutral-900">{product.monthlyFee}</p>
            </div>
            <div>
              <p className="text-caption font-semibold text-neutral-500">Est. Earnings</p>
              <p className="text-body-sm font-bold text-neutral-900">{product.estEarnings}</p>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex shrink-0 flex-col items-center gap-2 md:items-end">
          <a
            href={product.learnMoreUrl}
            className="inline-flex w-full min-w-[140px] items-center justify-center rounded-lg bg-primary-700 px-6 py-3 text-body-sm font-semibold text-white transition-colors hover:bg-primary-750 md:w-auto"
          >
            Learn More
          </a>
          <span className="text-legal text-neutral-500">On {product.websiteName}</span>
          <a
            href={product.offerDetailsUrl}
            className="text-caption font-medium text-primary-700 hover:underline"
          >
            Offer Details &gt;
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResultsScreen
