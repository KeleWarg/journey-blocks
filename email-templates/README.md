# Email Templates

Email templates for Iterable campaigns.

## Pet Insurance Quotes Email

**File:** `pet-insurance-quotes.html`

### Preview

Open `preview.html` in a browser to see desktop (600px) and mobile (360px) views side by side.

```bash
open email-templates/preview.html
```

### Design Specs

| Viewport | Width |
|----------|-------|
| Desktop  | 600px |
| Mobile   | 360px |

### Color Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | `#007AC8` | CTAs, buttons |
| Banner Yellow | `#FFD17F` | Top banner |
| Popular Badge | `#FFB136` | "POPULAR" badge, card highlight |
| Heading | `#1E2125` | Headlines |
| Body | `#000000` | Body text |
| Caption | `#515260` | Secondary text |
| Border | `#D7DCE5` | Card borders |
| Footer BG | `#E3E7ED` | Footer background |

### Assets Required

All assets are in the `assets/` folder. For production, upload these to a CDN and replace the local paths.

| Asset | Local Path | Size | Description |
|-------|-----------|------|-------------|
| Hero Image | `assets/hero-cat-owner.jpg` | 552x400 | Woman holding cat |
| Footer Cat | `assets/footer-cat.png` | 373x300 | Orange cat closeup |
| Spot Logo | `assets/logo-spot.png` | 87x32 | Spot pet insurance |
| Social Icons | `assets/Social Media Icons.svg` | 24x24 each | Twitter, LinkedIn, Facebook, Email |

### Iterable Integration

#### Merge Tags

Replace these placeholders with Iterable merge tags:

| Placeholder | Iterable Merge Tag |
|-------------|-------------------|
| `[Xemail]` | `{{email}}` |
| `Luna` (pet name) | `{{petName}}` or `{{user.petName}}` |

#### Dynamic Content

Insurance plan data should come from Iterable's data feeds or catalog. Structure:

```json
{
  "plans": [
    {
      "provider": "Spot",
      "logo": "https://cdn.example.com/spot-logo.png",
      "monthlyPrice": 47.27,
      "annualLimit": "$5,000",
      "deductible": "$500",
      "reimbursement": "70%",
      "isPopular": true
    }
  ]
}
```

### Testing Checklist

- [ ] Test in Litmus or Email on Acid
- [ ] Verify all images load from CDN
- [ ] Check Gmail, Apple Mail, Outlook rendering
- [ ] Test mobile responsive breakpoints
- [ ] Verify all tracking links have UTM parameters
- [ ] Test merge tags with sample data

### Font Stack

The email uses web-safe fonts with fallbacks:

```css
/* Headings (headline) */
font-family: Georgia, 'Times New Roman', serif;

/* Body text */  
font-family: Helvetica, Arial, sans-serif;

/* Work Sans (if web fonts supported) */
font-family: 'Work Sans', Helvetica, Arial, sans-serif;
```
