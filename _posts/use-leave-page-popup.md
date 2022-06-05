---
title: 'Use page leave popup for Next JS'
excerpt: 'React hook to open popup before leave the page'
collection: 'react'
tags: ['hooks', 'popup']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1654328105/hanson-lu-q36bvlgdoag-unsplash_gycujh.jpg'
---


```jsx
import SingletonRouter, { Router } from 'next/router';
import { useEffect } from 'react';

// Realization found here
// https://github.com/vercel/next.js/issues/2476#issuecomment-741461010
export default function useConfirmBeforeUnload({ checkConfirmVisibility, callback }) {
  useEffect(() => {
    SingletonRouter.router.change = async (...args) => {
      const showConfirm = await checkConfirmVisibility();

      if (showConfirm && callback) {
        return callback({
          onCancel: () => Router.prototype.change.apply(SingletonRouter.router, args),
          onConfirm: () =>
            new Promise(resolve => {
              resolve(false);
            }),
        });
      }

      return Router.prototype.change.apply(SingletonRouter.router, args);
    };

    return () => {
      delete SingletonRouter.router.change;
    };
  }, [checkConfirmVisibility, callback]);
}

```