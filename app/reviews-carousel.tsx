'use client';

import ReviewsArc from './reviews-arc';
import type { GoogleReview } from './reviews-data';

export default function ReviewsCarousel({ reviews }: { reviews: GoogleReview[] }) {
  return (
    <div className="reviews-arc-shell">
      <ReviewsArc reviews={reviews} />
    </div>
  );
}
