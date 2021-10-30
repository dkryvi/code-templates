---
title: 'Copy to clipboard'
excerpt: 'Code snippet to copy some value into the buffer'
tags: ['javascript', 'snippet', 'copy-to-clipboard']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_wyom8x.jpg'
author:
  name: dkryvi
  email: krivichaninds@gmail.com
  picture: 'https://res.cloudinary.com/dkryvi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1627306839/Code%20Templates/authors/dkryvi_sfy4ur.jpg'
ogImage:
  url: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_wyom8x.jpg'
---

```js
function copyToClipboard(link) {
  const textarea = document.createElement('textarea')
  textarea.textContent = link
  document.body.appendChild(textarea)

  const selection = document.getSelection()
  const range = document.createRange()

  range.selectNode(textarea)
  selection.removeAllRanges()
  selection.addRange(range)

  document.execCommand('copy')
  selection.removeAllRanges()

  document.body.removeChild(textarea)
}
```
