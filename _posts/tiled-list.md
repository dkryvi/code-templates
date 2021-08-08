---
title: 'Tiled list'
excerpt: 'Component to slice big list and show by page'
tags: ['react', 'components', 'list', 'children']
coverImage: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_mkiayd.jpg'
date: '2020-08-08'
author:
  name: dkryvi
  picture: 'https://res.cloudinary.com/dkryvi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1627306839/Code%20Templates/authors/dkryvi_sfy4ur.jpg'
ogImage:
  url: 'https://res.cloudinary.com/dkryvi/image/upload/v1627307206/Code%20Templates/covers/cover_mkiayd.jpg'
---

```jsx
import React from 'react'
import PropTypes from 'prop-types'

function TiledList({component: Component, children, onSeeMoreClick, perPage}) {
  const [limit, setLimit] = React.useState(perPage)

  React.useEffect(() => setLimit(perPage), [perPage])

  const handleClick = React.useCallback(() => {
    setLimit(limit + perPage)

    if (onSeeMoreClick) {
      onSeeMoreClick()
    }
  }, [limit, perPage, onSeeMoreClick])

  const showSeeMore = React.useMemo(
    () => React.Children.count(children) > limit,
    [limit, children]
  )

  return (
    <>
      <Component>{React.Children.toArray(children).slice(0, limit)}</Component>
      {showSeeMore && <button onClick={handleClick}>See More</button>}
    </>
  )
}

TiledList.propTypes = {
  component: PropTypes.elementType,
  children: PropTypes.arrayOf(PropTypes.node),
  onSeeMoreClick: PropTypes.func,
  perPage: PropTypes.number
}

TiledList.defaultProps = {
  component: 'ul',
  children: [],
  perPage: 6
}

export default TiledList
```