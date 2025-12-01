# Advent of LinkedIn Ads

An "Advent of Code" style webapp offering 24 daily puzzles related to LinkedIn Ads and B2B Growth. Built to attract the target audience and funnel them to CAPAC.

## Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS
- **Backend**: None (Client-side only)
- **Persistence**: localStorage
- **Hosting**: Vercel

## Features

- 24 daily puzzles (Day 1 ready, others coming soon)
- Progress tracking via localStorage
- Confetti animations on correct answers
- Responsive grid layout
- Hint system that pitches CAPAC
- Star collection system

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Deploy (zero config needed)

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Day 1 Puzzle

**Topic**: Manual Bidding Math
**Question**: Campaign underspending scenario with bid calculation
**Acceptable Answer Range**: 20-30% (flexible string matching)

## Adding More Puzzles

Edit `composables/usePuzzles.ts` to add puzzles to the array. Each puzzle needs:
- `id`: Number (1-24)
- `title`: String
- `question`: String (can include HTML)
- `answer`: String or RegExp (for flexible matching)
- `hint`: String (should subtly pitch CAPAC)
- `isLocked`: Boolean (false to unlock)
- `isSolved`: Boolean (starts false)

## Customization

- Update Stripe link in `app.vue` footer
- Modify branding/colors in Tailwind classes
- Adjust unlock logic in `composables/usePuzzles.ts`