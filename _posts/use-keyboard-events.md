---
title: 'Use keyboard events'
excerpt: 'React hook for listening keyboard events.'
collection: 'react'
tags: ['hooks', 'event']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1654328099/alice-triquet-eq4opdugn7w-unsplash_rjcole.jpg'
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
