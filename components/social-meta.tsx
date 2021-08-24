import {NextSeo} from 'next-seo'

export type TProps = {
  title: string
  description: string
  cardImage: string
}

const SocialMeta: React.FC<TProps> = ({title, description, cardImage}) => {
  return (
    <NextSeo
      title={title}
      description={description}
      additionalMetaTags={[
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: title},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:image', content: cardImage},
        {property: 'twitter:card', content: 'summary_large_image'},
        {property: 'twitter:site', content: '@vercel'},
        {property: 'twitter:title', content: title},
        {property: 'twitter:description', content: description},
        {property: 'twitter:image', content: cardImage}
      ]}
    />
  )
}

export default SocialMeta
