---
title: 'Is vertical scroll??'
excerpt:
  'Helper function to determine is scroll event vertical or horizontal. Useful
  for handling scroll behavior via mouse wheel, trackpad, or mobile swiping.'
tags: ['javascript', 'snippet', 'event']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_mkiayd.jpg'
date: '2020-08-03'
author:
  name: dkryvi
  picture: 'https://res.cloudinary.com/dkryvi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1627306839/Code%20Templates/authors/dkryvi_sfy4ur.jpg'
ogImage:
  url: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_mkiayd.jpg'
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
