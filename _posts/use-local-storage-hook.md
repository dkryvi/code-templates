---
title: 'Use local storage'
excerpt: 'React hook to use sync local storage value by key'
tags: ['react', 'hooks', 'local-storage']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_oqmmmx.jpg'
date: '2020-07-30'
author:
  name: dkryvi
  picture: 'https://res.cloudinary.com/dkryvi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1627306839/Code%20Templates/authors/dkryvi_sfy4ur.jpg'
ogImage:
  url: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_oqmmmx.jpg'
---

```js
function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {}
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}
```
