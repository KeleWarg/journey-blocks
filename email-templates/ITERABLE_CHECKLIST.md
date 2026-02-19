# Iterable Deployment Checklist

## Before Shipping to Iterable

### ✅ Completed
- [x] Email structure and layout
- [x] Mobile responsive (360px)
- [x] Desktop layout (600px)
- [x] All images referenced
- [x] Font styling (Work Sans, Schnyder S)
- [x] Border radius on cards
- [x] Proper spacing and padding
- [x] All logos and icons integrated

### 🔧 Required Changes Before Shipping

#### 1. Replace Image URLs with CDN
Replace all local image paths with your CDN URLs:

**Current → Replace With:**
- `/hero-cat-owner.jpg` → `https://your-cdn.com/images/hero-cat-owner.jpg`
- `/footer-cat.png` → `https://your-cdn.com/images/footer-cat.png`
- `/logo-spot.png` → `https://your-cdn.com/images/logo-spot.png`
- `/logo-embrace.svg` → `https://your-cdn.com/images/logo-embrace.svg`
- `/logo-fetch.svg` → `https://your-cdn.com/images/logo-fetch.svg`
- `/logo-petsbest.png` → `https://your-cdn.com/images/logo-petsbest.png`
- `/forbes-advisor-logo.svg` → `https://your-cdn.com/images/forbes-advisor-logo.svg`
- `/forbes-logo.svg` → `https://your-cdn.com/images/forbes-logo.svg`
- `/icon-cat.svg` → `https://your-cdn.com/images/icon-cat.svg`
- `/icon-twitter.svg` → `https://your-cdn.com/images/icon-twitter.svg`
- `/icon-linkedin.svg` → `https://your-cdn.com/images/icon-linkedin.svg`
- `/icon-facebook.svg` → `https://your-cdn.com/images/icon-facebook.svg`
- `/icon-email.svg` → `https://your-cdn.com/images/icon-email.svg`

#### 2. Replace Font URL
- `http://localhost:3000/fonts/SchnyderS-Bold.otf` → `https://your-cdn.com/fonts/SchnyderS-Bold.otf`

#### 3. Replace Merge Tags
- `[Xemail]` → `{{email}}`
- `Luna` → `{{petName}}` (or your pet name merge tag)

#### 4. Add UTM Parameters to Links
Add tracking parameters to all `<a href="#">` links:
```
href="https://your-site.com/quotes?utm_source=iterable&utm_medium=email&utm_campaign=pet-insurance&utm_content={{campaignId}}"
```

#### 5. Update Social Media Links
Replace placeholder `#` links with actual URLs:
- Twitter: Your Twitter profile URL
- LinkedIn: Your LinkedIn profile URL  
- Facebook: Your Facebook profile URL
- Email: `mailto:` link or contact form URL

#### 6. Update CTA Button Links
Replace all `href="#"` with actual destination URLs:
- "View Your Quote" → Quote page URL
- "Compare Top Quotes" → Comparison page URL
- "View Plan Details" → Plan detail pages (one per provider)
- "Compare Pet Insurance Plans" → Comparison page URL

#### 7. Remove Preview-Specific Code (Optional)
The template is email-safe, but you may want to remove comments like:
- `<!-- Hero image: /hero-cat-owner.jpg - Upload to CDN for production -->`
- `<!-- TODO: Replace with CDN-hosted Forbes Advisor logo -->`

### 📋 Testing Checklist

Before sending:
- [ ] Test in Litmus or Email on Acid
- [ ] Verify all images load from CDN
- [ ] Test in Gmail (web, iOS, Android)
- [ ] Test in Apple Mail
- [ ] Test in Outlook (Windows, Mac, web)
- [ ] Test mobile responsive (360px)
- [ ] Verify merge tags populate correctly
- [ ] Test all links and CTAs
- [ ] Verify tracking pixels/UTM parameters
- [ ] Check spam score (should be low)

### 📝 Notes

- **Font Support**: Schnyder S font may not work in all email clients. Most will fall back to Georgia/Times New Roman.
- **Border Radius**: Some email clients (especially Outlook) don't support border-radius. Cards will appear square in Outlook.
- **SVG Images**: Some email clients don't support SVG. Consider converting logos to PNG for better compatibility.
- **Dynamic Content**: Plan data (prices, limits, etc.) should come from Iterable's data feeds or catalog.
