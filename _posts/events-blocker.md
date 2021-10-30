---
title: 'Events blocker'
excerpt: 'Wrapper component to block all events inside'
tags: ['react', 'components', 'event']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_mkiayd.jpg'
author:
  name: dkryvi
  email: krivichaninds@gmail.com
  picture: 'https://res.cloudinary.com/dkryvi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1627306839/Code%20Templates/authors/dkryvi_sfy4ur.jpg'
ogImage:
  url: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_mkiayd.jpg'
---

```jsx
function EventsBlocker({children}) {
  const stopPropagation = (event) => event.stopPropagation()

  return (
    <div
      onClick={stopPropagation}
      onContextMenu={stopPropagation}
      onDoubleClick={stopPropagation}
      onDrag={stopPropagation}
      onDragEnd={stopPropagation}
      onDragEnter={stopPropagation}
      onDragExit={stopPropagation}
      onDragLeave={stopPropagation}
      onDragOver={stopPropagation}
      onDragStart={stopPropagation}
      onDrop={stopPropagation}
      onMouseDown={stopPropagation}
      onMouseEnter={stopPropagation}
      onMouseLeave={stopPropagation}
      onMouseMove={stopPropagation}
      onMouseOver={stopPropagation}
      onMouseOut={stopPropagation}
      onMouseUp={stopPropagation}
      onKeyDown={stopPropagation}
      onKeyPress={stopPropagation}
      onKeyUp={stopPropagation}
      onFocus={stopPropagation}
      onBlur={stopPropagation}
      onChange={stopPropagation}
      onInput={stopPropagation}
      onInvalid={stopPropagation}
      onSubmit={stopPropagation}
    >
      {children}
    </div>
  )
}
```
