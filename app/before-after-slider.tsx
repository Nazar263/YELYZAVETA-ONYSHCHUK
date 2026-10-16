'use client';

import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';
import { useRef, useState } from 'react';

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  sizes: string;
  label: string;
};

const clamp = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  sizes,
  label,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startRef = useRef<{ x: number; y: number; pos: number } | null>(null);

  const updateFromClientX = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  return (
    <div
      ref={frameRef}
      className="ba-frame"
      onPointerDown={(event) => {
        // Mouse: capture the pointer so hover-tracking keeps working even if
        // the cursor briefly leaves the frame. Touch: wait for a
        // predominantly horizontal move so vertical page scroll stays native.
        if (event.pointerType === 'mouse') {
          draggingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromClientX(event.clientX);
        } else {
          startRef.current = { x: event.clientX, y: event.clientY, pos };
        }
      }}
      onPointerMove={(event) => {
        // Mouse: follow the cursor on hover — no click needed.
        if (event.pointerType === 'mouse') {
          updateFromClientX(event.clientX);
          return;
        }
        if (draggingRef.current) {
          updateFromClientX(event.clientX);
          return;
        }
        const start = startRef.current;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          draggingRef.current = true;
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
            // ignore — pointer may already be released
          }
          updateFromClientX(event.clientX);
        } else if (Math.abs(dy) > 14 && Math.abs(dy) >= Math.abs(dx)) {
          // Vertical scroll gesture — let the browser take it.
          startRef.current = null;
        }
      }}
      onPointerUp={() => {
        draggingRef.current = false;
        startRef.current = null;
      }}
      onPointerCancel={() => {
        draggingRef.current = false;
        startRef.current = null;
      }}
      onLostPointerCapture={() => {
        draggingRef.current = false;
        startRef.current = null;
      }}
    >
      <Image
        className="ba-image"
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes={sizes}
        loading="lazy"
        draggable={false}
      />
      <div className="ba-before-layer" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          className="ba-image"
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes={sizes}
          loading="lazy"
          draggable={false}
        />
      </div>

      <span className="ba-label ba-label-before">Before</span>
      <span className="ba-label ba-label-after">After</span>

      <div className="ba-divider" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="ba-handle">
          <MoveHorizontal size={16} strokeWidth={1.6} />
        </span>
      </div>

      <div
        className="ba-keyboard-control"
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pos}
        aria-valuetext={`Before ${pos}%, after ${100 - pos}%`}
        style={{ left: `${pos}%` }}
        onKeyDown={(event) => {
          const step = 5;
          switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
              setPos((value) => clamp(value - step));
              event.preventDefault();
              break;
            case 'ArrowRight':
            case 'ArrowUp':
              setPos((value) => clamp(value + step));
              event.preventDefault();
              break;
            case 'Home':
              setPos(0);
              event.preventDefault();
              break;
            case 'End':
              setPos(100);
              event.preventDefault();
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
}
