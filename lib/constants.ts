export const REPOSITORY_URL = 'https://github.com/dkryvi/code-templates'
export const HOME_OG_IMAGE_URL =
  'https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg'

export const COLLECTION_IMAGE_FALLBACK =
  'https://res.cloudinary.com/dkryvi/image/upload/v1627327454/Code%20Templates/logos/box_usldlb.png'

type CollectionDictionaryItem = {
  excerpt: string
  coverImage: string
}

export const COLLECTION_DICTIONARY: {[key: string]: CollectionDictionaryItem} =
  {
    react: {
      excerpt: 'React collection excerpt',
      coverImage:
        'https://res.cloudinary.com/dkryvi/image/upload/v1627329362/Code%20Templates/logos/react_nj8txw.svg'
    }
    //  TODO: Add JavaScript cover image and excerpt
  }
