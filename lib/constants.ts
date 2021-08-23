export const REPOSITORY_URL = 'https://github.com/dkryvi/code-templates'
export const HOME_OG_IMAGE_URL =
  'https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg'
export const COLLECTION_IMAGE_FALLBACK =
  'https://res.cloudinary.com/dkryvi/image/upload/v1627327454/Code%20Templates/logos/box_usldlb.png'
export const CONTENT_FOLDER = '.content'
export const SETTINGS_FOLDER = 'settings'

export const DEFAULT_SEO = {
  title: 'Code Templates',
  description: 'Browse code templates for all your development needs.',
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png'
    },
    {rel: 'manifest', href: '/favicon/site.webmanifest'},
    {
      rel: 'mask-icon',
      href: '/favicon/safari-pinned-tab.svg',
      color: '#000'
    },
    {rel: 'shortcut icon', href: '/favicon/favicon.ico'},
    {rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml'}
  ]
}
