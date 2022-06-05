---
title: 'Use target event'
excerpt: 'React hook to listing target event.'
collection: 'react'
tags: ['hooks', 'event']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1654328096/image-30-copyright_jps9ty.jpg'
---

```jsx
import {useRef, useEffect} from 'react'
import debounce from 'lodash/debounce'

function useEvent({
  event,
  target,
  callback,
  delay,
  delayOptions = {maxWait: 1000},
  options = {}
}) {
  const savedHandler = useRef()
  const {capture, passive, once} = options

  useEffect(() => {
    savedHandler.current = delay
      ? debounce(callback, delay, delayOptions)
      : callback
  }, [callback, delay, delayOptions])

  useEffect(() => {
    const isSupported = target && target.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current(event)
    const opts = {capture, passive, once}

    target.addEventListener(event, eventListener, opts)

    return () => {
      target.removeEventListener(event, eventListener, opts)
    }
  }, [event, target, capture, passive, once])
}
```
