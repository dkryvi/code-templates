---
title: 'Format price'
excerpt: 'Code snippet to return short version of the price value.'
tags: ['javascript', 'snippet', 'price-formatter']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_wyom8x.jpg'
author:
  name: dkryvi
  email: krivichaninds@gmail.com
  picture: 'https://res.cloudinary.com/dkryvi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1627306839/Code%20Templates/authors/dkryvi_sfy4ur.jpg'
ogImage:
  url: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_wyom8x.jpg'
---

```js
function formatPrice(price) {
  const value = Math.abs(Number(price))

  if (value < 1.0e4) {
    return {
      value,
      suffix: ''
    }
  }

  if (value >= 1.0e9) {
    return {
      value: value / 1.0e9,
      suffix: 'B'
    }
  }

  if (value >= 1.0e6) {
    return {
      value: value / 1.0e6,
      suffix: 'M'
    }
  }

  if (value >= 1.0e3) {
    return {
      value: value / 1.0e3,
      suffix: 'K'
    }
  }

  return {value: price, suffix: ''}
}
```

## Examples

- 1,500 -> {value: 1.5, suffix: 'K'}
- 2,500,000 -> {value: 2.5, suffix: 'M'}
