// components/MonitorFrame.tsx
'use client';
import { ReactNode } from 'react';

export default function MonitorFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-gray-900">
      <div className="absolute inset-0 bg-gray-500">
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-gray-400 rounded-full" />
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full" />
      </div>
      <div className="absolute inset-8 bg-gray-100 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
