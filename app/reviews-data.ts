import reviewsJson from '../assets/reviews/google-maps-reviews.json';

export type GoogleReview = {
  id: string;
  author: string;
  rating: 5;
  text: string;
};

type RawReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
};

const raw = reviewsJson as {
  sourceUrl: string;
  reviews: RawReview[];
};

export const googleMapsReviewsUrl: string =
  raw.sourceUrl || 'https://maps.app.goo.gl/nsRBmmsTSsB1LGDc8';

// Names and texts are taken verbatim from
// assets/reviews/google-maps-reviews.json — do not edit copy here.
export const googleReviews: GoogleReview[] = raw.reviews.map((review) => ({
  id: review.id,
  author: review.author,
  rating: 5,
  text: review.text,
}));
