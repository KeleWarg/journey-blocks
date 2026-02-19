# Debt Relief Lead Gen Funnel

A Forbes Advisor debt relief lead generation funnel built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🎨 Design System

This project uses the **LLM theme** from our Figma design system. All design tokens (colors, typography, spacing) are mapped in:
- `tailwind.config.ts` - Tailwind theme extension
- `src/styles/globals.css` - CSS variables and component classes
- `.cursor/llms.txt` - Complete design reference for AI code generation

### Primary Colors
- **Primary Blue**: `#007AC8` - Buttons, links, CTAs
- **Hover**: `#1E72A8`
- **Active**: `#0B5F95`

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Demo page
├── components/
│   ├── ui/                # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── RadioCard.tsx
│   │   ├── Slider.tsx
│   │   └── Checkbox.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── FormLayout.tsx
│   └── screens/           # Journey screen components
│       └── DebtAmountScreen.tsx
├── lib/
│   └── utils.ts           # Utility functions
├── styles/
│   └── globals.css        # Global styles + tokens
└── types/
    └── funnel.ts          # TypeScript types
```

## 🧩 Components

### UI Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, and ghost variants |
| `Input` | Text input with label, error, hint support |
| `Select` | Dropdown using Radix UI primitives |
| `RadioCard` | Card-style radio buttons |
| `Slider` | Range slider with markers |
| `Checkbox` | Checkbox with label support |

### Layout Components

| Component | Description |
|-----------|-------------|
| `Header` | Forbes Advisor branded header |
| `TrustBadges` | Bottom trust indicators |
| `ProgressIndicator` | 3-step progress bar |
| `FormLayout` | Wrapper for all form screens |

## 📝 Journey Screens

The funnel consists of 10 screens:

1. **Location** - State selector
2. **Debt Type** - Credit card / Loan / Both
3. **Debt Amount** - Slider with calculator ✅ (Implemented)
4. **Income** - Annual income slider
5. **Date of Birth** - Month/Date/Year
6. **Name** - First and last name
7. **Debt Profile** - Results display
8. **Email** - Email input
9. **Phone** - Phone with consent
10. **Address** - Street address

## 🤖 Using with Cursor

This project includes AI-friendly documentation:

- **`.cursor/llms.txt`** - Complete design token reference
- **`.cursorrules`** - Project-specific coding rules

### Example prompts for Cursor:

```
"Create the IncomeScreen following the same pattern as DebtAmountScreen"

"Add the DebtTypeScreen with radio cards for credit card, loan, and both options"

"Implement form validation for the NameScreen using react-hook-form and zod"
```

## 🎯 Figma Reference

Design file: [Debt Relief - Social_Native Journey](https://www.figma.com/design/1sqO0lh2jxFWhGuglu87Bb)

## 📦 Dependencies

- **next** - React framework
- **tailwindcss** - Utility-first CSS
- **@radix-ui/*** - Accessible UI primitives
- **lucide-react** - Icons
- **react-hook-form** - Form handling
- **zod** - Validation

## License

Private - Forbes Advisor
