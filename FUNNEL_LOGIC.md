# Debt Relief Funnel - Logic & Calculations

## Table of Contents
- [Funnel Flow Diagram](#funnel-flow-diagram)
- [Screen Sequence](#screen-sequence)
- [Data Collected](#data-collected)
- [Calculations & Logic](#calculations--logic)
- [Data Sources](#data-sources)
- [Validation Rules](#validation-rules)

---

## Funnel Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DEBT RELIEF FUNNEL FLOW                           │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │  1. Location │  Collects: state (abbreviation)
    │   Screen     │  Shows: US Map, State debt stats
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 2. Debt Type │  Collects: debtType ('credit-card' | 'personal-loan' | 'both')
    │   Screen     │  Shows: Radio cards for selection
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 3. Did You   │  Uses: debtType
    │    Know      │  Shows: Debt-type specific stats & insights
    └──────┬───────┘  (Interstitial - no data collected)
           │
           ▼
    ┌──────────────┐
    │ 4. Debt      │  Collects: debtAmount ($5K - $200K)
    │   Amount     │  Uses: state, debtType
    └──────┬───────┘  Shows: "Did you know" with state comparison
           │
           ▼
    ┌──────────────┐
    │ 5. Income    │  Collects: annualIncome ($10K - $200K)
    │   Screen     │  Uses: debtAmount
    └──────┬───────┘  Calculates: DTI ratio
           │
           ▼
    ┌──────────────┐
    │ 6. Results   │  Uses: debtAmount, debtType, income
    │   Preview    │  Shows: Savings estimate, qualification status
    └──────┬───────┘  (Interstitial - no data collected)
           │
           ▼
    ┌──────────────┐
    │ 7. Date of   │  Collects: dateOfBirth {month, day, year}
    │    Birth     │  Validates: Must be 18+
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │  8. Name     │  Collects: firstName, lastName
    │   Screen     │  Validates: Min 2 chars, letters only
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 9. Processing│  Uses: (visual only)
    │   Screen     │  Shows: Animated loading states
    └──────┬───────┘  (Auto-advances after animation)
           │
           ▼
    ┌──────────────┐
    │  10. Email   │  Collects: email
    │   Screen     │  Uses: firstName, debtAmount
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 11. Debt     │  Uses: ALL previous data
    │   Profile    │  Shows: Full profile summary, DTI badge
    └──────┬───────┘  Contains embedded phone form
           │
           ▼
    ┌──────────────┐
    │  12. Phone   │  Collects: phone, phoneConsent
    │   (embedded) │  Shows: OTP verification modal
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 13. Address  │  Collects: address {line1, line2?, zipCode}
    │   Screen     │  Uses: firstName, debtAmount
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 14. Partner  │  Uses: firstName
    │   Matching   │  Shows: Animated matching process
    └──────┬───────┘  (Auto-advances after animation)
           │
           ▼
    ┌──────────────┐
    │ 15. Results  │  Uses: firstName, debtAmount, debtType, income
    │    Page      │  Shows: Partner cards, final results
    └──────────────┘
```

---

## Screen Sequence

| # | Screen | Step Indicator | Data Collected | Data Used |
|---|--------|----------------|----------------|-----------|
| 1 | LocationScreen | 1 | `state` | - |
| 2 | DebtTypeScreen | 1 | `debtType` | - |
| 3 | DidYouKnowScreen | 2 | - | `debtType` |
| 4 | DebtAmountScreen | 3 | `debtAmount` | `state`, `debtType` |
| 5 | IncomeScreen | 4 | `annualIncome` | `debtAmount` |
| 6 | ResultsPreviewScreen | 5 | - | `debtAmount`, `debtType`, `income` |
| 7 | DateOfBirthScreen | 6 | `dateOfBirth` | - |
| 8 | NameScreen | 7 | `firstName`, `lastName` | - |
| 9 | ProcessingScreen | 8 | - | - |
| 10 | EmailScreen | 9 | `email` | `firstName`, `debtAmount` |
| 11 | DebtProfileScreen | 10 | - | ALL |
| 12 | PhoneScreen (embedded) | 10 | `phone`, `phoneConsent` | - |
| 13 | AddressScreen | 11 | `address` | `firstName`, `debtAmount` |
| 14 | PartnerMatchingScreen | 12 | - | `firstName` |
| 15 | ResultsPage | Complete | - | `firstName`, `debtAmount`, `debtType`, `income` |

---

## Data Collected

```typescript
interface FunnelData {
  // Step 1: Location
  state?: string                    // e.g., "CA", "TX", "NY"
  
  // Step 2: Debt Type
  debtType?: 'credit-card' | 'personal-loan' | 'both'
  
  // Step 4: Debt Amount
  debtAmount?: number               // $5,000 - $200,000
  
  // Step 5: Income
  annualIncome?: number             // $10,000 - $200,000
  
  // Step 7: Date of Birth
  dateOfBirth?: {
    month: string                   // "01" - "12"
    day: string                     // "01" - "31"
    year: string                    // "1900" - "2008"
  }
  
  // Step 8: Name
  firstName?: string
  lastName?: string
  
  // Step 10: Email
  email?: string
  
  // Step 12: Phone
  phone?: string                    // Format: (###) ###-####
  phoneConsent?: boolean
  
  // Step 13: Address
  address?: {
    line1: string
    line2?: string
    zipCode: string                 // 5-digit
  }
}
```

---

## Calculations & Logic

### 1. Debt-to-Income (DTI) Ratio

**Formula:**
```
DTI = (debtAmount / annualIncome) × 100
```

**DTI Badge Classification:**
| DTI Range | Label | Color | Message |
|-----------|-------|-------|---------|
| < 50% | Low | Green | "Your profile matches most relief program requirements" |
| 50% - 100% | Moderate | Yellow | "This puts you in a range many debt relief programs look for" |
| > 100% | Elevated | Red | "Programs exist specifically for high debt-to-income situations" |

**Used in:** IncomeScreen, DebtProfileScreen

---

### 2. Savings Estimate

**Formula:**
```javascript
const reductionRate = 0.40  // 40% reduction estimate
const newDebtAmount = debtAmount × (1 - reductionRate)
const savings = debtAmount - newDebtAmount
const monthlyPayment = newDebtAmount / 48  // 48-month plan
```

**Example:**
- Debt: $30,000
- New Amount: $18,000 (40% reduction)
- Savings: $12,000
- Monthly Payment: $375/month

**Used in:** ResultsPreviewScreen, ResultsPage

---

### 3. Qualification Threshold

**Logic:**
```javascript
const QUALIFICATION_THRESHOLD = 7500

if (debtAmount >= QUALIFICATION_THRESHOLD) {
  // "This amount qualifies for most relief programs"
} else {
  // "Some programs may be available — let's check your options"
}
```

**Used in:** DebtAmountScreen

---

### 4. State Debt Comparison ("Did You Know")

**Logic by Debt Type:**

```javascript
// Credit Card
if (debtType === 'credit-card') {
  stateAvg = creditCardDebtByState[state]
  if (userDebt <= stateAvg) {
    // "You're below that — well within range"
  } else {
    // "You're not alone — programs work with balances like yours"
  }
  source = "NY Fed, Q4 2024"
}

// Personal Loan
if (debtType === 'personal-loan') {
  stateAvg = personalLoanDebtByState[state]
  // Same comparison logic
  source = "TransUnion"
}

// Both
if (debtType === 'both') {
  ccAvg = creditCardDebtByState[state]
  plAvg = personalLoanDebtByState[state]
  // Show both averages
  source = "NY Fed, TransUnion"
}
```

**Used in:** DebtAmountScreen

---

### 5. Age Calculation

**Formula:**
```javascript
function calculateAge(dob) {
  const birthDate = new Date(`${dob.year}-${dob.month}-${dob.day}`)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
```

**Age Range Brackets:**
| Age | Display |
|-----|---------|
| < 30 | "25-30 years" |
| 30-39 | "30-40 years" |
| 40-49 | "40-50 years" |
| 50-59 | "50-60 years" |
| 60+ | "60+ years" |

**Used in:** DebtProfileScreen (social proof)

---

### 6. Income Tier (Money Pyramid)

**Logic:**
```javascript
function getTier(income) {
  if (income < 40000) return 1   // 1 row (1 icon)
  if (income < 80000) return 2   // 2 rows (1+2 icons)
  if (income < 140000) return 3  // 3 rows (1+2+3 icons)
  return 4                        // 4 rows (1+2+3+4 icons)
}
```

**Used in:** IncomeScreen (visual pyramid)

---

## Data Sources

### Credit Card Debt by State
**Source:** NY Fed Consumer Credit Panel / Equifax, Q4 2024

| State | Avg CC Debt | State | Avg CC Debt |
|-------|-------------|-------|-------------|
| AK | $5,170 | MT | $3,710 |
| AL | $3,250 | NC | $3,970 |
| AR | $3,170 | ND | $3,850 |
| AZ | $4,290 | NE | $3,550 |
| CA | $4,740 | NH | $4,360 |
| CO | $4,720 | NJ | $4,950 |
| CT | $4,770 | NM | $3,400 |
| DC | $5,360 | NV | $4,820 |
| DE | $4,350 | NY | $4,650 |
| FL | $4,840 | OH | $3,450 |
| GA | $4,430 | OK | $3,370 |
| HI | $5,030 | OR | $3,860 |
| IA | $3,170 | PA | $3,850 |
| ID | $3,740 | RI | $4,300 |
| IL | $4,130 | SC | $3,860 |
| IN | $3,310 | SD | $3,410 |
| KS | $3,540 | TN | $3,510 |
| KY | $3,020 | TX | $4,440 |
| LA | $3,490 | UT | $4,070 |
| MA | $4,470 | VA | $4,620 |
| MD | $4,940 | VT | $3,640 |
| ME | $3,580 | WA | $4,450 |
| MI | $3,520 | WI | $3,270 |
| MN | $3,880 | WV | $3,040 |
| MO | $3,440 | WY | $3,820 |
| MS | $2,940 | | |

**National Average:** $4,180

---

### Personal Loan Debt by State
**Source:** TransUnion Average New Account Balance

| State | Avg PL Debt | State | Avg PL Debt |
|-------|-------------|-------|-------------|
| AK | $6,789 | MT | $12,863 |
| AL | $4,268 | NC | $10,953 |
| AR | $5,893 | ND | $9,808 |
| AZ | $7,494 | NE | $8,458 |
| CA | $7,528 | NH | $8,802 |
| CO | $12,022 | NJ | $11,083 |
| CT | $11,500 | NM | $10,731 |
| DC | $12,816 | NV | $6,691 |
| DE | $8,369 | NY | $4,996 |
| FL | $6,687 | OH | $7,147 |
| GA | $7,620 | OK | $3,379 |
| HI | $12,371 | OR | $8,640 |
| IA | $7,802 | PA | $9,203 |
| ID | $6,952 | RI | $8,474 |
| IL | $7,439 | SC | $6,201 |
| IN | $6,377 | SD | $7,792 |
| KS | $6,973 | TN | $5,057 |
| KY | $6,269 | TX | $4,400 |
| LA | $5,337 | UT | $6,765 |
| MA | $6,363 | VA | $8,663 |
| MD | $8,392 | VT | $9,288 |
| ME | $5,623 | WA | $9,609 |
| MI | $11,545 | WI | $6,788 |
| MN | $9,863 | WV | $9,779 |
| MO | $4,807 | WY | $8,975 |
| MS | $9,376 | | |

**National Average:** $7,500

---

### Debt Type Statistics (DidYouKnowScreen)

| Debt Type | Avg Balance | Avg APR |
|-----------|-------------|---------|
| Credit Card | $4,180 | 24.7% |
| Personal Loan | $11,676 | 13%–18% |

---

## Validation Rules

### Phone Number
```javascript
pattern: /^\(\d{3}\) \d{3}-\d{4}$/
// Format: (555) 555-5555
```

### Email
```javascript
pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Zip Code
```javascript
pattern: /^\d{5}(-\d{4})?$/
// Format: 12345 or 12345-6789
```

### Name
- Minimum length: 2 characters
- Maximum length: 50 characters
- Letters only (no numbers or special characters)

### Age
- Minimum: 18 years old
- Maximum: 120 years old

### Debt Amount
- Minimum: $5,000
- Maximum: $200,000
- Step: $1,000

### Income
- Minimum: $10,000
- Maximum: $200,000
- Step: $5,000

---

## Key Constants

```javascript
// DebtAmountScreen
const MIN_DEBT = 5000
const MAX_DEBT = 200000
const STEP = 1000
const QUALIFICATION_THRESHOLD = 7500
const TICK_MARKS = [5000, 50000, 100000, 150000, 200000]

// IncomeScreen
const MIN_INCOME = 10000
const MAX_INCOME = 200000
const INCOME_STEP = 5000

// Savings Calculation
const REDUCTION_RATE = 0.40  // 40%
const PAYMENT_MONTHS = 48
```

---

## Notes

1. **Default Values:** When data is missing, screens use sensible defaults:
   - `debtAmount`: $20,000
   - `annualIncome`: $50,000
   - `debtType`: 'credit-card'

2. **State Default:** Kansas (KS) is used as the default state to show the map pin on initial load

3. **Progress Indicator:** Steps are grouped into phases:
   - Steps 1-4: "Your debt profile"
   - Steps 5-8: "Your details"
   - Steps 9+: "Reduce your debt"

4. **Phone Verification:** OTP modal is shown after phone submission but can be skipped

5. **Partner Carousel:** Shows 5 debt relief partner logos in an infinite scroll animation
