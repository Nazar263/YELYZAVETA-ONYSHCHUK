'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { arc, measure, CAMERA, MAX_WIDTH } from '@/components/ui/tilted-grid-hero';
import type { GoogleReview } from './reviews-data';

const PREVIEW_CHARS = 118;

function initialOf(name: string) {
  const t = name.trim();
  if (!t) return '·';
  return (Array.from(t)[0] ?? '·').toLocaleUpperCase();
}

function Avatar({ author }: { author: string }) {
  const colors: [string, string][] = [
    ['#7b5ea7', '#4a3573'],
    ['#0f7b8a', '#0a4a54'],
    ['#b25a2d', '#733512'],
    ['#2f7d4f', '#173f28'],
  ];
  let h = 0;
  for (const ch of author) h = (h * 31 + ch.codePointAt(0)!) % 997;
  const [a, b] = colors[h % colors.length]!;
  return (
    <span
      className="rv-avatar"
      aria-hidden="true"
      style={{ background: `linear-gradient(145deg, ${a}, ${b})` }}
    >
      {initialOf(author)}
    </span>
  );
}

function Stars({ id }: { id: string }) {
  return (
    <p className="rv-stars" role="img" aria-label="Rated 5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={`${id}-${i}`} size={15} aria-hidden="true" className="rv-star" />
      ))}
    </p>
  );
}

function CardText({
  id,
  text,
  onToggle,
}: {
  id: string;
  text: string;
  onToggle?: (open: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const long = text.length > PREVIEW_CHARS;
  const shown = !long || open ? text : `${text.slice(0, PREVIEW_CHARS).trimEnd()}…`;
  return (
    <div className="rv-body">
      <p className={`rv-text${open ? ' is-open' : ''}`}>{shown}</p>
      {long && (
        <button
          type="button"
          className="rv-more"
          aria-expanded={open}
          aria-controls={`${id}-full`}
          onClick={() => {
            setOpen((v) => {
              const next = !v;
              onToggle?.(next);
              return next;
            });
          }}
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
      <span id={`${id}-full`} className="rv-hidden" aria-hidden="true" />
    </div>
  );
}

/**
 * Reviews cylinder — adapts TiltedGridHero's cylindrical loop for whole HTML cards.
 * Cards are NOT sliced; the whole card is the tile. It streams right-to-left,
 * flat in the centre, angled at the edges, with edge fade only.
 */
export default function ReviewsArc({ reviews }: { reviews: GoogleReview[] }) {
  // Tuned for review cards (taller than image tiles). Keep visible gaps.
  const tileHeight = 62; // % of hero height
  const aspectRatio = 1.42; // width / height ~ 340 / 240
  const gap = 8; // % of tile height
  const axis = 52; // vertical centre %
  const curve = 68; // degrees - moderate bend keeps gaps
  const fade = 9; // % edge fade
  const speed = 5; // seconds per tile

  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const orbit = `rv-o-${id}`;
  const tileClass = `rv-t-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

  const [layout, setLayout] = React.useState<ReturnType<typeof measure> | null>(null);
  const [shown, setShown] = React.useState<Record<number, number>>({});
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout((prev) =>
        prev?.columns === next.columns &&
        prev.sweep === next.sweep &&
        prev.unit === next.unit
          ? prev
          : next,
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  const { columns, sweep, unit, limit } =
    layout ?? measure(1200, 400, tileHeight, aspectRatio, gap, bend);

  const u = (n: number) =>
    `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`;

  const r = 100 * arc(bend);
  const radius = `${+r.toFixed(3)}cqw`;
  const turn = (deg: number) =>
    `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;

  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const css =
    `@keyframes ${orbit}{` +
    `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
    `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
    `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}` +
    `@media(prefers-reduced-motion:reduce){.${tileClass}{animation-play-state:paused}}`;

  const duration = columns * speed;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;

  // Pause on hover/focus/expanded via CSS + class
  const isPaused = !!expandedId;

  if (!reviews.length) return null;

  return (
    <>
      <div
        ref={ref}
        className={`rv-ribbon relative overflow-hidden${isPaused ? ' is-paused' : ''}`}
        style={{ containerType: 'size' } as React.CSSProperties}
        aria-label="Google Maps reviews, 8 reviews, all 5 stars"
        role="region"
      >
        <style>{css}</style>
        <style>{`
          .rv-ribbon:hover .${tileClass},
          .rv-ribbon:focus-within .${tileClass},
          .rv-ribbon.is-paused .${tileClass} {
            animation-play-state: paused !important;
          }
          @media (prefers-reduced-motion: reduce) {
            .rv-ribbon { display: none !important; }
            .rv-fallback { display: grid !important; }
          }
        `}</style>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: layout ? 1 : 0,
            perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
            perspectiveOrigin: `50% ${axis}%`,
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        >
          {Array.from({ length: columns }, (_, t) => {
            const first = columns - 1 - t;
            const reviewIndex = (shown[t] ?? first) % reviews.length;
            // handle negative modulo
            const idx = ((reviewIndex % reviews.length) + reviews.length) % reviews.length;
            const review = reviews[idx]!;
            return (
              <div
                key={t}
                className={`${tileClass} absolute`}
                style={{
                  left: `calc(50% - ${u(aspectRatio / 2)})`,
                  top: `calc(${axis}% - ${u(0.5)})`,
                  width: u(aspectRatio),
                  height: u(1),
                  transformStyle: 'preserve-3d',
                  animation: `${orbit} ${duration}s linear ${-t * speed}s infinite`,
                }}
                onAnimationIteration={(e) => {
                  const lap = Math.round((e as React.AnimationEvent<HTMLDivElement>).elapsedTime / duration);
                  setShown((prev) => {
                    const next = lap * columns + first;
                    return prev[t] === next ? prev : { ...prev, [t]: next };
                  });
                }}
              >
                {/* Whole card, not sliced */}
                <article
                  className="rv-card rv-card--cylinder"
                  aria-label={`${idx + 1} of ${reviews.length}: ${review.author}`}
                  tabIndex={0}
                  onFocus={() => {
                    // focus pauses via CSS :focus-within, no extra JS
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                  }}
                >
                  <div className="rv-card-inner">
                    <div className="rv-head">
                      <Avatar author={review.author} />
                      <div className="rv-id">
                        <p className="rv-author">{review.author}</p>
                        <p className="rv-sub">Google Maps review</p>
                      </div>
                      <span className="rv-g" aria-hidden="true">
                        <span className="rv-g-b">G</span>
                      </span>
                    </div>
                    <Stars id={review.id} />
                    <CardText
                      id={review.id}
                      text={review.text}
                      onToggle={(open) => {
                        if (open) setExpandedId(review.id);
                        else setExpandedId((prev) => (prev === review.id ? null : prev));
                      }}
                    />
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reduced motion fallback: static accessible gallery */}
      <div className="rv-fallback" style={{ display: 'none' }}>
        <div className="rv-fallback-grid">
          {reviews.map((review) => (
            <article key={review.id} className="rv-card rv-card--static">
              <div className="rv-card-inner">
                <div className="rv-head">
                  <Avatar author={review.author} />
                  <div className="rv-id">
                    <p className="rv-author">{review.author}</p>
                    <p className="rv-sub">Google Maps review</p>
                  </div>
                  <span className="rv-g" aria-hidden="true">
                    <span className="rv-g-b">G</span>
                  </span>
                </div>
                <Stars id={review.id} />
                <p className="rv-text">{review.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
