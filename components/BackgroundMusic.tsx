// components/BackgroundMusic.tsx
'use client';

import React, { forwardRef, useEffect } from 'react';

interface Props {
  src: string;
  play?: boolean;
  muted?: boolean;
}

const BackgroundMusic = forwardRef<HTMLAudioElement, Props>(
  ({ src, play = true, muted = false }, ref) => {
    useEffect(() => {
      const audioEl = (ref as React.RefObject<HTMLAudioElement>).current!;
      audioEl.loop = true;
      audioEl.volume = 0.2;
      audioEl.muted = muted;
      if (play) {
        audioEl.play().catch(() => {
          /* autoplay blocked until user gesture */
        });
      } else {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
    }, [play, muted, ref]);

    return <audio ref={ref} src={src} preload="auto" />;
  }
);

BackgroundMusic.displayName = 'BackgroundMusic';
export default BackgroundMusic;
