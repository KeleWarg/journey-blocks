/**
 * State Debt Statistics Data
 * 
 * Real debt data by state from official sources:
 * - Credit Card Debt: NY Fed Consumer Credit Panel / Equifax, Q4 2024
 * - Personal Loan Debt: TransUnion Average New Account Balance
 * 
 * Source: NY Fed Consumer Credit Panel, Q4 2024
 */

export interface StateStats {
  creditCardDebt: number
  personalLoanDebt: number
}

/**
 * State debt statistics
 * Credit card debt from NY Fed (Q4 2024)
 * Personal loan debt from TransUnion
 */
export const stateStats: Record<string, StateStats> = {
  'Alabama': { creditCardDebt: 3250, personalLoanDebt: 4268 },
  'Alaska': { creditCardDebt: 5170, personalLoanDebt: 6789 },
  'Arizona': { creditCardDebt: 4290, personalLoanDebt: 7494 },
  'Arkansas': { creditCardDebt: 3170, personalLoanDebt: 5893 },
  'California': { creditCardDebt: 4740, personalLoanDebt: 7528 },
  'Colorado': { creditCardDebt: 4720, personalLoanDebt: 12022 },
  'Connecticut': { creditCardDebt: 4770, personalLoanDebt: 11500 },
  'Delaware': { creditCardDebt: 4350, personalLoanDebt: 8369 },
  'Florida': { creditCardDebt: 4840, personalLoanDebt: 6687 },
  'Georgia': { creditCardDebt: 4430, personalLoanDebt: 7620 },
  'Hawaii': { creditCardDebt: 5030, personalLoanDebt: 12371 },
  'Idaho': { creditCardDebt: 3740, personalLoanDebt: 6952 },
  'Illinois': { creditCardDebt: 4130, personalLoanDebt: 7439 },
  'Indiana': { creditCardDebt: 3310, personalLoanDebt: 6377 },
  'Iowa': { creditCardDebt: 3170, personalLoanDebt: 7802 },
  'Kansas': { creditCardDebt: 3540, personalLoanDebt: 6973 },
  'Kentucky': { creditCardDebt: 3020, personalLoanDebt: 6269 },
  'Louisiana': { creditCardDebt: 3490, personalLoanDebt: 5337 },
  'Maine': { creditCardDebt: 3580, personalLoanDebt: 5623 },
  'Maryland': { creditCardDebt: 4940, personalLoanDebt: 8392 },
  'Massachusetts': { creditCardDebt: 4470, personalLoanDebt: 6363 },
  'Michigan': { creditCardDebt: 3520, personalLoanDebt: 11545 },
  'Minnesota': { creditCardDebt: 3880, personalLoanDebt: 9863 },
  'Mississippi': { creditCardDebt: 2940, personalLoanDebt: 9376 },
  'Missouri': { creditCardDebt: 3440, personalLoanDebt: 4807 },
  'Montana': { creditCardDebt: 3710, personalLoanDebt: 12863 },
  'Nebraska': { creditCardDebt: 3550, personalLoanDebt: 8458 },
  'Nevada': { creditCardDebt: 4820, personalLoanDebt: 6691 },
  'New Hampshire': { creditCardDebt: 4360, personalLoanDebt: 8802 },
  'New Jersey': { creditCardDebt: 4950, personalLoanDebt: 11083 },
  'New Mexico': { creditCardDebt: 3400, personalLoanDebt: 10731 },
  'New York': { creditCardDebt: 4650, personalLoanDebt: 4996 },
  'North Carolina': { creditCardDebt: 3970, personalLoanDebt: 10953 },
  'North Dakota': { creditCardDebt: 3850, personalLoanDebt: 9808 },
  'Ohio': { creditCardDebt: 3450, personalLoanDebt: 7147 },
  'Oklahoma': { creditCardDebt: 3370, personalLoanDebt: 3379 },
  'Oregon': { creditCardDebt: 3860, personalLoanDebt: 8640 },
  'Pennsylvania': { creditCardDebt: 3850, personalLoanDebt: 9203 },
  'Rhode Island': { creditCardDebt: 4300, personalLoanDebt: 8474 },
  'South Carolina': { creditCardDebt: 3860, personalLoanDebt: 6201 },
  'South Dakota': { creditCardDebt: 3410, personalLoanDebt: 7792 },
  'Tennessee': { creditCardDebt: 3510, personalLoanDebt: 5057 },
  'Texas': { creditCardDebt: 4440, personalLoanDebt: 4400 },
  'Utah': { creditCardDebt: 4070, personalLoanDebt: 6765 },
  'Vermont': { creditCardDebt: 3640, personalLoanDebt: 9288 },
  'Virginia': { creditCardDebt: 4620, personalLoanDebt: 8663 },
  'Washington': { creditCardDebt: 4450, personalLoanDebt: 9609 },
  'Washington DC': { creditCardDebt: 5360, personalLoanDebt: 12816 },
  'West Virginia': { creditCardDebt: 3040, personalLoanDebt: 9779 },
  'Wisconsin': { creditCardDebt: 3270, personalLoanDebt: 6788 },
  'Wyoming': { creditCardDebt: 3820, personalLoanDebt: 8975 },
}

// US National average as fallback (from "allUS" row in NY Fed data)
export const defaultStats: StateStats = { creditCardDebt: 4180, personalLoanDebt: 7500 }

/**
 * Get state stats by state name
 * Falls back to default stats if state not found
 */
export function getStateStats(stateName: string | null): StateStats {
  if (!stateName) return defaultStats
  return stateStats[stateName] ?? defaultStats
}

/**
 * Map state abbreviation to full name for lookup
 */
export const stateAbbreviationToName: Record<string, string> = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DC': 'Washington DC',
  'DE': 'Delaware',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
}

/**
 * Map full state name to abbreviation
 */
export const stateNameToAbbreviation: Record<string, string> = Object.fromEntries(
  Object.entries(stateAbbreviationToName).map(([abbr, name]) => [name, abbr])
)
