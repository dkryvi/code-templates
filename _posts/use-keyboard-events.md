---
title: 'Use keyboard events'
excerpt: 'React hook for listening keyboard events.'
tags: ['react', 'hooks', 'event']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_mkiayd.jpg'
author:
  name: dkryvi
  email: krivichaninds@gmail.com
  picture: 'https://res.cloudinary.com/dkryvi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1627306839/Code%20Templates/authors/dkryvi_sfy4ur.jpg'
ogImage:
  url: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_mkiayd.jpg'
---

```jsx
function useKeyboardKeys({keysMap, target = window}) {
  const handleKeyDown = React.useCallback(
    (event) => {
      const keyCallback = keysMap[event.keyCode]
      if (keyCallback) {
        keyCallback(event)
      }
    },
    [keysMap]
  )

  React.useEffect(() => {
    target.addEventListener('keydown', handleKeyDown)

    return () => {
      target.removeEventListener('keydown', handleKeyDown)
    }
  }, [target, handleKeyDown])
}
```

`keysMap` - an mapping between key code and callback to call
