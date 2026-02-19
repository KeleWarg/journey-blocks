export type BankAccountType = 'cds' | 'checking' | 'savings' | 'money-market'

export type BankConsideration = 'apy' | 'minimum-deposit'

export type BankingService = 'credit-cards' | 'mortgages' | 'personal-loans' | 'investing'

export interface BankFunnelData {
  accountType?: BankAccountType
  depositAmount?: string
  consideration?: BankConsideration
  interestedServices?: BankingService[]
  zipCode?: string
  email?: string
  agreedToTerms?: boolean
}

export interface BankAccountTypeOption {
  value: BankAccountType
  label: string
}

export interface BankConsiderationOption {
  value: BankConsideration
  label: string
}

export interface BankingServiceOption {
  value: BankingService
  label: string
}

export interface BankValueProp {
  id: 'proprietary-data' | 'comprehensive-research' | 'trusted-guidance'
  title: string
  description: string
}

export const BANK_TOTAL_QUESTIONS = 6

export const BANK_ACCOUNT_TYPE_OPTIONS: BankAccountTypeOption[] = [
  { value: 'cds', label: 'CDs' },
  { value: 'checking', label: 'Checking' },
  { value: 'savings', label: 'Savings' },
  { value: 'money-market', label: 'Money Market' },
]

export const BANK_BALANCE_OPTIONS = [
  { label: '$5,000', value: '5000' },
  { label: '$10,000', value: '10000' },
  { label: '$15,000', value: '15000' },
]

export const BANK_BALANCE_VALIDATION = {
  min: 0,
  max: 100000,
  errorMsg: 'Value must be less than $100,000',
}

export const BANK_CONSIDERATION_OPTIONS: BankConsiderationOption[] = [
  { value: 'apy', label: 'APY' },
  { value: 'minimum-deposit', label: 'Minimum Deposit Amount' },
]

export const BANK_SERVICE_OPTIONS: BankingServiceOption[] = [
  { value: 'credit-cards', label: 'Credit Cards' },
  { value: 'mortgages', label: 'Mortgages' },
  { value: 'personal-loans', label: 'Personal loans' },
  { value: 'investing', label: 'Investing' },
]

export const ACCOUNT_TYPE_LABELS: Record<BankAccountType, string> = {
  cds: 'CD',
  checking: 'Checking',
  savings: 'Savings',
  'money-market': 'Money Market',
}

export const ACCOUNT_SUBTYPES: Record<BankAccountType, string[]> = {
  checking: ['Business Checking', 'Student Checking', 'Consumer Checking'],
  savings: ['High-Yield Savings', 'Traditional Savings', 'Kids Savings'],
  cds: ['Standard CD', 'No-Penalty CD', 'Jumbo CD'],
  'money-market': ['High-Yield Money Market', 'Business Money Market', 'Standard Money Market'],
}

export interface BankProduct {
  id: string
  name: string
  logoUrl: string
  category: string
  apy: string
  apyDate: string
  bonus: string
  bonusDetails: string
  monthlyFee: string
  estEarnings: string
  memberFdic: boolean
  websiteName: string
  learnMoreUrl: string
  offerDetailsUrl: string
}

export const MOCK_BANK_PRODUCTS: Record<BankAccountType, BankProduct[]> = {
  checking: [
    { id: 'chk-1', name: 'Novo Business Banking', logoUrl: '', category: 'Checking', apy: 'N/A', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'Up to $360 per year.\nSee website for details.', monthlyFee: '$0.00', estEarnings: 'N/A', memberFdic: true, websiteName: "Novo's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'chk-2', name: 'Axos Bank Rewards Checking', logoUrl: '', category: 'Checking', apy: '3.30%', apyDate: 'Jan. 20, 2025', bonus: '$300', bonusDetails: 'With qualifying activities.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$660', memberFdic: true, websiteName: "Axos's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'chk-3', name: 'Quontic High Interest Checking', logoUrl: '', category: 'Checking', apy: '1.50%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'No sign-up bonus.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$300', memberFdic: true, websiteName: "Quontic's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'chk-4', name: 'LendingClub Rewards Checking', logoUrl: '', category: 'Checking', apy: '2.00%', apyDate: 'Jan. 20, 2025', bonus: '$50', bonusDetails: 'With direct deposit.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$400', memberFdic: true, websiteName: "LendingClub's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'chk-5', name: 'Discover Cashback Debit', logoUrl: '', category: 'Checking', apy: 'N/A', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: '1% cashback on debit.\nSee website for details.', monthlyFee: '$0.00', estEarnings: 'N/A', memberFdic: true, websiteName: "Discover's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
  ],
  savings: [
    { id: 'sav-1', name: 'Marcus by Goldman Sachs Savings', logoUrl: '', category: 'Savings', apy: '4.40%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'No sign-up bonus.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$880', memberFdic: true, websiteName: "Marcus's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'sav-2', name: 'Ally Bank High Yield Savings', logoUrl: '', category: 'Savings', apy: '4.20%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'No minimum balance.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$840', memberFdic: true, websiteName: "Ally's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'sav-3', name: 'Barclays Tiered Savings', logoUrl: '', category: 'Savings', apy: '4.35%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'Tiered APY structure.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$870', memberFdic: true, websiteName: "Barclays's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'sav-4', name: 'Bread Savings High-Yield', logoUrl: '', category: 'Savings', apy: '4.50%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: '$1,500 minimum opening.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$900', memberFdic: true, websiteName: "Bread's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'sav-5', name: 'SoFi Savings', logoUrl: '', category: 'Savings', apy: '4.00%', apyDate: 'Jan. 20, 2025', bonus: '$300', bonusDetails: 'With direct deposit.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$800', memberFdic: true, websiteName: "SoFi's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
  ],
  cds: [
    { id: 'cd-1', name: 'Marcus by Goldman Sachs CD', logoUrl: '', category: 'CD', apy: '4.25%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: '12-month term.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$850', memberFdic: true, websiteName: "Marcus's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'cd-2', name: 'Barclays Online CD', logoUrl: '', category: 'CD', apy: '4.40%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: '12-month term.\nNo minimum deposit.', monthlyFee: '$0.00', estEarnings: '$880', memberFdic: true, websiteName: "Barclays's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'cd-3', name: 'Ally Bank High Yield CD', logoUrl: '', category: 'CD', apy: '4.20%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'No minimum deposit.\n10-day best rate guarantee.', monthlyFee: '$0.00', estEarnings: '$840', memberFdic: true, websiteName: "Ally's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'cd-4', name: 'Bread Savings CD', logoUrl: '', category: 'CD', apy: '4.50%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: '$1,500 minimum.\n12-month term.', monthlyFee: '$0.00', estEarnings: '$900', memberFdic: true, websiteName: "Bread's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'cd-5', name: 'Discover Bank CD', logoUrl: '', category: 'CD', apy: '4.10%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: '$2,500 minimum.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$820', memberFdic: true, websiteName: "Discover's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
  ],
  'money-market': [
    { id: 'mm-1', name: 'Quontic Money Market', logoUrl: '', category: 'Money Market', apy: '4.00%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: '$100 minimum opening.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$800', memberFdic: true, websiteName: "Quontic's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'mm-2', name: 'Sallie Mae Money Market', logoUrl: '', category: 'Money Market', apy: '4.20%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'No minimum balance.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$840', memberFdic: true, websiteName: "Sallie Mae's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'mm-3', name: 'Ally Bank Money Market', logoUrl: '', category: 'Money Market', apy: '4.00%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'No minimum balance.\nCheck writing included.', monthlyFee: '$0.00', estEarnings: '$800', memberFdic: true, websiteName: "Ally's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'mm-4', name: 'Discover Money Market', logoUrl: '', category: 'Money Market', apy: '3.90%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: '$2,500 minimum.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$780', memberFdic: true, websiteName: "Discover's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
    { id: 'mm-5', name: 'EverBank Money Market', logoUrl: '', category: 'Money Market', apy: '4.30%', apyDate: 'Jan. 20, 2025', bonus: 'N/A', bonusDetails: 'Introductory rate.\nSee website for details.', monthlyFee: '$0.00', estEarnings: '$860', memberFdic: true, websiteName: "EverBank's Website", learnMoreUrl: '#', offerDetailsUrl: '#' },
  ],
}

export const BANK_FAQ_ITEMS: Record<BankAccountType, Array<{ question: string; answer: string }>> = {
  checking: [
    { question: 'What should I look for in a checking account?', answer: 'Look for low or no monthly fees, a wide ATM network, mobile banking features, and any sign-up bonuses. Consider whether you need check-writing capabilities and what minimum balance requirements apply.' },
    { question: 'Are online checking accounts safe?', answer: 'Yes. Online banks are typically FDIC-insured just like traditional banks, meaning your deposits are protected up to $250,000 per depositor. Many online banks also offer robust security features like two-factor authentication.' },
    { question: 'Can I earn interest on a checking account?', answer: 'Some checking accounts offer interest, though rates are typically lower than savings accounts or CDs. High-yield checking accounts may offer competitive rates if you meet certain requirements like direct deposit or minimum transactions.' },
    { question: 'How many checking accounts should I have?', answer: 'Most people do well with one or two checking accounts. Having a primary account for everyday spending and a secondary one for specific goals (like bills) can help with budgeting without overcomplicating your finances.' },
    { question: 'What fees should I watch out for?', answer: 'Common checking account fees include monthly maintenance fees, overdraft fees, out-of-network ATM fees, and wire transfer fees. Many banks waive monthly fees if you maintain a minimum balance or set up direct deposit.' },
  ],
  savings: [
    { question: 'What is a high-yield savings account?', answer: 'A high-yield savings account offers a significantly higher annual percentage yield (APY) than a traditional savings account. Many online banks offer rates 10-20x higher than the national average, helping your money grow faster.' },
    { question: 'How much should I keep in savings?', answer: 'Financial experts generally recommend keeping 3-6 months of living expenses in an easily accessible savings account as an emergency fund. Beyond that, you might consider CDs or investment accounts for longer-term goals.' },
    { question: 'Are there limits on savings account withdrawals?', answer: 'Federal Regulation D previously limited certain savings withdrawals to six per month, but this was suspended in 2020. However, individual banks may still impose their own limits or fees for excessive withdrawals.' },
    { question: 'Is my savings account FDIC insured?', answer: 'Most savings accounts at banks are FDIC insured up to $250,000 per depositor, per bank. Credit union savings accounts are similarly insured by the NCUA. Always verify your institution\'s insurance status.' },
    { question: 'Can I have multiple savings accounts?', answer: 'Yes, and it can be a smart strategy. Many people use separate savings accounts for different goals like an emergency fund, vacation, or down payment. Some banks even let you create named sub-accounts.' },
  ],
  cds: [
    { question: 'What is a certificate of deposit (CD)?', answer: 'A CD is a type of savings account that holds a fixed amount of money for a fixed period (the term), and in return the bank pays a fixed interest rate. CDs typically offer higher rates than regular savings accounts.' },
    { question: 'What happens if I withdraw early from a CD?', answer: 'Most CDs charge an early withdrawal penalty if you take out money before the term ends. Penalties vary but often equal several months of interest. No-penalty CDs exist but typically offer slightly lower rates.' },
    { question: 'What CD term should I choose?', answer: 'It depends on when you\'ll need the money and current rate trends. Shorter terms (3-12 months) offer more flexibility, while longer terms (2-5 years) may lock in higher rates. A CD ladder strategy can balance both.' },
    { question: 'What is a CD ladder?', answer: 'A CD ladder involves spreading your money across multiple CDs with different maturity dates. For example, you might open 1-year, 2-year, and 3-year CDs. As each matures, you reinvest at the longest term to maintain the ladder.' },
    { question: 'Are CDs a good investment right now?', answer: 'CDs can be attractive when interest rates are high, as you can lock in favorable rates. They\'re best suited for money you won\'t need for a specific period and offer guaranteed returns with FDIC insurance protection.' },
  ],
  'money-market': [
    { question: 'What is a money market account?', answer: 'A money market account (MMA) combines features of checking and savings accounts. It typically offers higher interest rates than checking accounts while providing check-writing and debit card access, though with some transaction limits.' },
    { question: 'How is a money market account different from savings?', answer: 'Money market accounts often come with check-writing privileges and debit cards that savings accounts lack. They may require higher minimum balances but can offer tiered interest rates that reward larger balances.' },
    { question: 'What minimum balance do I need?', answer: 'Minimum balance requirements vary widely, from $0 to $25,000 or more. Higher minimums often unlock better interest rates. Be aware of fees that may apply if your balance drops below the required minimum.' },
    { question: 'Are money market accounts FDIC insured?', answer: 'Yes, money market accounts at banks are FDIC insured up to $250,000. Note that money market accounts are different from money market mutual funds, which are investment products and not FDIC insured.' },
    { question: 'Can I write checks from a money market account?', answer: 'Yes, most money market accounts include check-writing privileges and may come with a debit card. However, there may be limits on the number of transactions per month, so they\'re best used for occasional large payments.' },
  ],
}

export const BANK_VALUE_PROPS: BankValueProp[] = [
  {
    id: 'proprietary-data',
    title: 'Proprietary Data',
    description:
      'Our ratings are powered by our own data insights and best-in-class methodologies.',
  },
  {
    id: 'comprehensive-research',
    title: 'Comprehensive Research',
    description:
      'We analyze thousands of data points across hundreds of banks to create informed recommendations.',
  },
  {
    id: 'trusted-guidance',
    title: 'Trusted Guidance',
    description:
      'Our team of experts has done the work for you. Join the hundreds who have found the best bank accounts for their needs.',
  },
]
