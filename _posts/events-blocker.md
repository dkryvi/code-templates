---
title: 'Events blocker'
excerpt: 'Wrapper component to block all events inside'
collection: 'react'
tags: ['components', 'event']
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
