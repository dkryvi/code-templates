import {NextSeo} from 'next-seo'

import {HOME_OG_IMAGE_URL} from 'lib/constants'

export type TProps = {
  title?: string
  description?: string
  cardImage?: string
}

const Meta: React.FC<TProps> = ({
  title = 'Code Templates',
  description = 'Browse code templates for all your development needs',
  cardImage = HOME_OG_IMAGE_URL
}) => {
  return (
    <NextSeo title={title} description={description}>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={cardImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vercel" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={cardImage} />
    </NextSeo>
  )
}

export default Meta
