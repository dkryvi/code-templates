---
title: 'Format price'
excerpt: 'Code snippet to return short version of the price value.'
collection: 'javascript'
tags: ['snippet', 'price-formatter']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1654328079/image-26-copyright_uh3k8l.jpg'
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
