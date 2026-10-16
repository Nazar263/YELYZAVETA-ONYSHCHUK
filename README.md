# Brunetkaa Hair

A mobile-first Next.js site for Brunetkaa Hair in London. The page keeps a dark,
editorial palette with warm-gold accents and supports service-price dialogs,
WhatsApp enquiries, expandable FAQs, responsive navigation, and a map that loads
only after a visitor asks to show it.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- lucide-react

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Content and image updates

- Edit service names, all five numbered length prices, surcharge notes, contact
  destinations, and FAQ answers in `app/site-content.ts`.
- Edit section copy, navigation, dialog content, and page layout in `app/page.tsx`.
- Edit typography, colours, responsive layout, and focus/motion styling in
  `app/globals.css`; update metadata in `app/layout.tsx`.
- The four supplied local portraits are in `public/images/` and appear together
  in the hero gallery. They are portraits of Yelyzaveta, not client treatment
  results; the `result-*` filenames do not indicate verified work samples.
- The four service cards (`public/images/service-*.jpg`) use AI-generated
  illustrative covers. They are not photographs of Yelyzaveta's work, not
  before/after pairs, and carry the caption "Illustrative image"; the origin
  note for each one lives with its service entry in `app/site-content.ts`.
- `Book this treatment` opens WhatsApp with the selected service pre-filled in
  the message. It is the agreed booking flow, so no second modal is opened.

## Content still needed

- Original, genuinely matched before-and-after treatment photos to populate the
  Results section. Current portraits must not be labelled as client results.
- Approved review text/screenshots or publicly accessible review source links.
  Review-highlight contents have not been verified, so no reviews are displayed.
- No centimetre boundaries are available for length categories 1–5. Visitors are
  asked to message Yelyzaveta to confirm the correct category and final price.

The page does not include a booking form, calendar, payment flow, analytics,
tracking pixels, or advertising trackers.
