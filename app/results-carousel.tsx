'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ResultPair } from './results-data';
import BeforeAfterSlider from './before-after-slider';

const slideSizes =
  '(max-width: 899px) min(calc(100vw - 64px), 360px), 360px';

// Staged reveal rhythm: card -> arrow -> card -> arrow -> card -> arrow -> card.
// Short steps (~400-550ms), single run, no scroll locking.
const CARD_DELAYS = [150, 750, 1300, 1850];
const ARROW_DELAYS = [550, 1100, 1650];

function CollageArrow({ id, reverse = false }: { id: string; reverse?: boolean }) {
  return (
    <svg viewBox="0 0 220 80" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <marker
          id={id}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path
            d="M1 1.5 L8 5 L1 8.5"
            fill="none"
            stroke="#c4a26b"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      {reverse ? (
        <path
          d="M214 14 C 150 22, 70 52, 16 64"
          stroke="#c4a26b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 7"
          opacity="0.85"
          markerEnd={`url(#${id})`}
        />
      ) : (
        <path
          d="M6 40 C 70 10, 150 10, 204 38"
          stroke="#c4a26b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 7"
          opacity="0.85"
          markerEnd={`url(#${id})`}
        />
      )}
    </svg>
  );
}

function MobileDownArrow() {
  return (
    <svg viewBox="0 0 24 28" fill="none" aria-hidden="true" focusable="false" className="rc-mobile-arrow-svg">
      <path d="M12 2 L12 20" stroke="#c4a26b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 15 L12 21 L17 15" stroke="#c4a26b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function ResultsCarousel({ pairs }: { pairs: ResultPair[] }) {
  return (
    <div
      className="results-collage"
      role="list"
      aria-label="Hair treatment results — 4 examples"
    >
      <div className="rc-grid">
        {pairs.map((pair, slideIndex) => (
          <article
            className={`rc-item rc-item-${slideIndex + 1}`}
            key={pair.id}
            role="listitem"
            aria-label={`Example ${slideIndex + 1} of ${pairs.length}`}
            style={{ '--rd': `${CARD_DELAYS[slideIndex] ?? 150}ms` } as CSSProperties}
          >
            <div className="rc-tilt">
              <div className="rc-card">
                {pair.layout === 'side-by-side' ? (
                  <div className="ba-pair">
                    <figure className="ba-pair-item">
                      <Image
                        src={pair.before.src}
                        alt={pair.before.alt}
                        fill
                        sizes={slideSizes}
                        className="ba-image"
                        draggable={false}
                      />
                      <span className="ba-label ba-label-before">Before</span>
                    </figure>
                    <figure className="ba-pair-item">
                      <Image
                        src={pair.after.src}
                        alt={pair.after.alt}
                        fill
                        sizes={slideSizes}
                        className="ba-image"
                        draggable={false}
                      />
                      <span className="ba-label ba-label-after">After</span>
                    </figure>
                  </div>
                ) : (
                  <BeforeAfterSlider
                    beforeSrc={pair.before.src}
                    afterSrc={pair.after.src}
                    beforeAlt={pair.before.alt}
                    afterAlt={pair.after.alt}
                    sizes={slideSizes}
                    label={pair.controlLabel}
                  />
                )}
                <p className="result-slide-caption">Example {slideIndex + 1}</p>
              </div>
            </div>
          </article>
        ))}

        <div className="rc-arrows" aria-hidden="true">
          <div
            className="rc-arrow rc-arrow-1"
            style={{ '--rd': `${ARROW_DELAYS[0]}ms` } as CSSProperties}
          >
            <CollageArrow id="rc-arrow-head-1" />
          </div>
          <div
            className="rc-arrow rc-arrow-2"
            style={{ '--rd': `${ARROW_DELAYS[1]}ms` } as CSSProperties}
          >
            <CollageArrow id="rc-arrow-head-2" reverse />
          </div>
          <div
            className="rc-arrow rc-arrow-3"
            style={{ '--rd': `${ARROW_DELAYS[2]}ms` } as CSSProperties}
          >
            <CollageArrow id="rc-arrow-head-3" />
          </div>
        </div>
        <div className="rc-mobile-arrows" aria-hidden="true">
          <div className="rc-mobile-arrow rc-mobile-arrow-1" style={{ '--rd': `${ARROW_DELAYS[0]}ms` } as CSSProperties}>
            <MobileDownArrow />
          </div>
          <div className="rc-mobile-arrow rc-mobile-arrow-2" style={{ '--rd': `${ARROW_DELAYS[1]}ms` } as CSSProperties}>
            <MobileDownArrow />
          </div>
          <div className="rc-mobile-arrow rc-mobile-arrow-3" style={{ '--rd': `${ARROW_DELAYS[2]}ms` } as CSSProperties}>
            <MobileDownArrow />
          </div>
        </div>
      </div>
    </div>
  );
}

