---
title: 'Use resize observer'
excerpt: 'Hook to track target resize'
collection: 'react'
tags: ['hooks', 'resize']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1654328100/manuel-meurisse-eucll-f5ati-unsplash_hi1yzf.jpg'
---


```jsx
import { useLayoutEffect, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useThrottleFn } from 'react-use';

export function useResizeObserver(ref, callback, delay = 200) {
  const handleResize = useCallback(
    entries => {
      if (!Array.isArray(entries)) {
        return;
      }

      const entry = entries[0];

      if (callback) {
        callback(entry);
      }
    },
    [callback]
  );

  const throttledCallback = useThrottleFn(handleResize, delay, [handleResize]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    let observer = new ResizeObserver(entries => throttledCallback(entries));
    observer.observe(ref.current);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
      observer = null;
    };
  }, [ref, throttledCallback]);
}

```