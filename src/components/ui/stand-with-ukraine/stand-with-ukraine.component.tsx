'use client';

import React from 'react';

export default function StandWithUkraineComponent() {
  return (
    <div className="flex flex-1 flex-col fixed top-16 left-0 right-0 bg-black shadow-gray-600 shadow z-40">
      <div className="relative">
        <div className="w-full border-t-8 border-t-yellow-500/80"></div>
        <div className="w-full border-t-8 border-t-blue-500/80"></div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <p className="font-semibold text-center text-xs text-white opacity-100">#StandWithUkraine</p>
      </div>
    </div>
  );
}
