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
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const updateFromClientX = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(clamp(next));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const isMouse = event.pointerType === 'mouse';
    if (isMouse) {
      draggingRef.current = true;
      setIsDragging(true);
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {}
      updateFromClientX(event.clientX);
    } else {
      startRef.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) {
      updateFromClientX(event.clientX);
      return;
    }
    if (event.pointerType === 'mouse') {
      return;
    }
    const start = startRef.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      draggingRef.current = true;
      setIsDragging(true);
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {}
      updateFromClientX(event.clientX);
    } else if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) {
      startRef.current = null;
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) {
      try {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {}
    } else if (startRef.current && event.pointerType !== 'mouse') {
      // Tap without drag — move divider to tap position
      updateFromClientX(event.clientX);
    }
    draggingRef.current = false;
    setIsDragging(false);
    startRef.current = null;
  };

  const handlePointerCancel = () => {
    draggingRef.current = false;
    setIsDragging(false);
    startRef.current = null;
  };

  return (
    <div
      ref={frameRef}
      className={`ba-frame${isDragging ? ' is-dragging' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
      onClick={(e) => e.preventDefault()}
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
