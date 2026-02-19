# Iterable Upload Checklist

## Before Uploading to Iterable

Replace all `{{variableName}}` placeholders with your actual values:

### 1. CDN Base URL (REQUIRED)
Find and replace: `{{cdnBaseUrl}}`
Replace with: Your CDN URL (e.g., `https://cdn.yourdomain.com` or `https://assets.forbes.com/email`)

**Example:**
- `{{cdnBaseUrl}}/forbes-advisor-logo.svg` → `https://cdn.yourdomain.com/forbes-advisor-logo.svg`

### 2. Pet Name (REQUIRED)
Find and replace: `{{petName}}`
Replace with: Iterable merge tag `{{petName}}` (or your actual merge tag name)

**Locations:**
- Headline: `{{petName}}'s Pet Insurance Quotes Are Ready`
- Section heading: `Today's Top Deals Based On {{petName}}'s Details`
- Benefits heading: `For {{petName}}, Get The Value Of Pet Insurance...`

### 3. Email Address (REQUIRED)
Find and replace: `{{email}}`
Replace with: Iterable merge tag `{{email}}`

**Location:** Footer unsubscribe section

### 4. Plan Pricing Variables (REQUIRED)
Replace these with your actual merge tags or values:

- `{{spotMonthlyPrice}}` → e.g., `53.23` or `{{spotMonthlyPrice}}`
- `{{spotAnnualLimit}}` → e.g., `5,000` or `{{spotAnnualLimit}}`
- `{{spotDeductible}}` → e.g., `500` or `{{spotDeductible}}`
- `{{spotReimbursement}}` → e.g., `80` or `{{spotReimbursement}}`

Repeat for:
- `{{embraceMonthlyPrice}}`, `{{embraceAnnualLimit}}`, `{{embraceDeductible}}`, `{{embraceReimbursement}}`
- `{{fetchMonthlyPrice}}`, `{{fetchAnnualLimit}}`, `{{fetchDeductible}}`, `{{fetchReimbursement}}`
- `{{petsbestMonthlyPrice}}`, `{{petsbestAnnualLimit}}`, `{{petsbestDeductible}}`, `{{petsbestReimbursement}}`

### 5. URLs (REQUIRED)
Replace all `{{urlVariable}}` with actual URLs:

- `{{viewQuotesUrl}}` → Your quotes page URL
- `{{viewQuoteUrl}}` → Your single quote page URL
- `{{compareQuotesUrl}}` → Your compare quotes page URL
- `{{spotPlanUrl}}` → Spot plan detail page URL
- `{{embracePlanUrl}}` → Embrace plan detail page URL
- `{{fetchPlanUrl}}` → Fetch plan detail page URL
- `{{petsbestPlanUrl}}` → Pets Best plan detail page URL
- `{{comparePlansUrl}}` → Compare plans page URL
- `{{unsubscribeUrl}}` → Iterable unsubscribe URL (usually `{{unsubscribe}}`)
- `{{twitterUrl}}` → Your Twitter profile URL
- `{{linkedinUrl}}` → Your LinkedIn profile URL
- `{{facebookUrl}}` → Your Facebook page URL
- `{{emailUrl}}` → Your email contact URL (e.g., `mailto:contact@forbes.com`)

**Note:** UTM parameters are already included in the links. You can modify them as needed.

### 6. Font URL (OPTIONAL)
The Schnyder font uses `{{cdnBaseUrl}}/fonts/SchnyderS-Bold.otf`. Most email clients will fall back to Georgia if the font doesn't load, so this is optional.

---

## Quick Find & Replace Guide

1. **Open** `pet-insurance-quotes-PRODUCTION.html` in your editor
2. **Find & Replace** `{{cdnBaseUrl}}` with your CDN URL
3. **Verify** all `{{petName}}` instances use the correct merge tag
4. **Verify** all `{{email}}` instances use the correct merge tag
5. **Replace** all pricing variables with actual values or merge tags
6. **Replace** all URL variables with actual URLs
7. **Test** the HTML in an email testing tool (Litmus, Email on Acid, etc.)
8. **Upload** to Iterable

---

## Testing Checklist

- [ ] All images load correctly (check CDN URLs)
- [ ] All links work and include UTM parameters
- [ ] Merge tags are correctly formatted (`{{variable}}`)
- [ ] Mobile view renders correctly (360px width)
- [ ] Desktop view renders correctly (600px width)
- [ ] Font fallbacks work (Schnyder → Georgia)
- [ ] Unsubscribe link works
- [ ] Social media links work

---

## Iterable-Specific Notes

- Iterable supports Handlebars syntax: `{{variableName}}`
- You can use conditional logic: `{{#if variableName}}...{{/if}}`
- For arrays: `{{#each items}}...{{/each}}`
- Default values: `{{variableName default="Default Value"}}`
