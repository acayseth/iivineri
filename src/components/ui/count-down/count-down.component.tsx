'use client';

import React from 'react';
import Countdown from 'react-countdown';

import { useTimeLeft } from '@/_libs/clients/friday.hook';

export default function CountDownComponent() {
  const { leftTime, loading } = useTimeLeft();
  return (
    <section className="h-12 py-0.5 my-2">
      {(!loading && leftTime > 0) && <Countdown
          now={Date.now}
          date={Date.now() + (leftTime * 1000)}
          renderer={RendererCountDown}
      />}
    </section>
  );
}

function RendererCountDown({ days, hours, minutes, seconds }: any) {
  return (
    <p className="font-serif font-bold text-center text-white text-xl">
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
  );
}
