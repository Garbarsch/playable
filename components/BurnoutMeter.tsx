'use client';

import React from 'react';

type Marker = { value: number; label: string };
const markers: Marker[] = [
  { value: 20, label: '20%' },
  { value: 40, label: '40%' },
  { value: 60, label: '60%' },
  { value: 80, label: '80%' },
  { value: 100, label: '100%' },
];

export default function BurnoutMeter({ value }: { value: number }) {
  return (
    <div className="relative w-full bg-gray-200 rounded-lg h-4 overflow-visible">
      <div
        style={{ width: `${value}%` }}
        className="bg-red-500 h-4 rounded-lg transition-all duration-500 ease-out"
        
      />
       <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-bold text-black">
        {value}%
      </span>

      {markers.map(({ value: mark, label }) => (
        <div
          key={mark}
          className="absolute -top-6 flex flex-col items-center -translate-x-1/2 pointer-events-none"
          style={{ left: `${mark}%` }}
        >
          <span className="text-xs text-black mb-1 whitespace-nowrap">{label}</span>
          <div
            className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-black"
          />
          
        </div>
        
      ))}
    </div>
  );
}