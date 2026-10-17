# Brunetkaa Hair

A responsive Next.js website for Yelyzaveta Onyshchuk, trading as Brunetkaa Hair in London.

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npx tsc --noEmit
npm run lint
npm run build
```

## Content

- `app/site-content.ts`: services, descriptions, prices, contact destinations and FAQs.
- `app/page.tsx`: page sections, service dialogs and the booking form.
- `app/results-data.ts`: matched before-and-after image pairs.
- `assets/reviews/google-maps-reviews.json`: supplied Google Maps review excerpts and source references.
- `app/privacy/page.tsx`: privacy notice.
- `app/globals.css`: layout, typography and responsive styling.
- `components/ui/`: reusable visual components.

Service covers are illustrations, labelled separately from actual treatment results.
The four service covers were generated for the project; preserve this provenance when
reusing the assets. Portraits are not treatment examples. Preserve any applicable
third-party licences and attribution when editing reusable components.

## Booking and external services

The form keeps entries in React state and opens a WhatsApp link containing those
entries. WhatsApp receives the link data when opened; the owner receives the enquiry
when the visitor sends the message. No booking API, submission database, localStorage
or sessionStorage is used by the form. Browser autofill/history is separate.

The page uses Vercel hosting, externally served Google Fonts and a lazy-loaded Google
Maps iframe. Instagram previews use local images and link to the profile. No analytics
or advertising integration is installed in the application code.

## Privacy operations

The owner must keep actual handling of enquiries consistent with the privacy notice.
Review conversation retention regularly and remove records that are no longer needed.
The repository alone cannot verify hosting-account log retention, provider contracts,
international-transfer arrangements or permission to reproduce client photographs and
reviews.
