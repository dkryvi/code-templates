import createCache from '@emotion/cache'
import {EmotionCache} from '@emotion/react'

export function createEmotionCache(): EmotionCache {
  return createCache({key: 'css'})
}
