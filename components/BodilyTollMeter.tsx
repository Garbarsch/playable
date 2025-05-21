'use client';

import React, { useId } from 'react';

export default function BodilyTollMeter({ value }: { value: number }) {
  const clipId = useId();
  const height = 24;
  const width = 24;

  const fillHeight = (value / 100) * height;
  const y = height - fillHeight;

  return (
    <div className="w-16 h-16 mx-auto">
      <svg viewBox="0 0 24 24" className="w-full h-full text-gray-500">
        <defs>
          <clipPath id={clipId}>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 20c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v.5a.5.5 0 01-.5.5H4.5a.5.5 0 01-.5-.5V20z"
            />
          </clipPath>
        </defs>

        {/* Red fill clipped to silhouette */}
        <rect
          x="0"
          y={y}
          width={width}
          height={fillHeight}
          fill="red"
          clipPath={`url(#${clipId})`}
        />

        {/* Silhouette outlines as strokes */}
        <path
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 20c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v.5a.5.5 0 01-.5.5H4.5a.5.5 0 01-.5-.5V20z"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}
