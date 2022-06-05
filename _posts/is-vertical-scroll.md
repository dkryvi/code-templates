---
title: 'Is vertical scroll??'
excerpt:
  'Helper function to determine is scroll event vertical or horizontal. Useful
  for handling scroll behavior via mouse wheel, trackpad, or mobile swiping.'
collection: 'javascript'
tags: ['snippet', 'event']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1654328077/clay-banks-hwlai5lrhdm-unsplash_jfflcb.jpg'
---

```js
function isVerticalScroll(event) {
  const {deltaX, deltaY} = event

  const absoluteX = Math.abs(deltaX)
  const absoluteY = Math.abs(deltaY)

  return (
    absoluteX === 0 ||
    absoluteX === absoluteY ||
    (absoluteY !== 0 && absoluteY / absoluteX >= 2)
  )
}
```
