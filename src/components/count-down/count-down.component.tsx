import React from 'react';

export default function RendererCountDown({ days, hours, minutes, seconds }: any) {
  return (
    <div className="absolute left-0 right-0 bottom-3">
      <p className="font-serif font-bold text-white text-xl">
        <span className="text-2xl">Până vineri:</span>
        <span className="underline decoration-1">
          {days !== 0 && (days === 1
            ? <span className="px-0.5">O zi,</span>
            : <span className="px-0.5">{days} zile,</span>)}
          
          {(hours !== 0) && (hours === 1
              ? <span className="px-0.5">O oră,</span>
              : <span className="px-0.5">{hours} ore,</span>
          
          )}
          
          {minutes !== 0 && (minutes === 1
              ? <span className="px-0.5">o minută</span>
              : <span className="px-0.5">{minutes} minute</span>
          )}
          
          <span className="px-0.5">și {seconds} secunde</span>
        </span>
      </p>
    </div>
  );
};
