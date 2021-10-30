---
title: 'Use target event'
excerpt: 'React hook to listing target event.'
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
