export type Author = {
  name: string
  picture: string
}

export type Collection = {
  id: string
  title: string
  excerpt?: string | null
  coverImage?: string | null
  tags: Array<string>
  slugs: Array<string>
}

export type Post = {
  slug: string
  title: string
  date: string
  tags: Array<string>
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}
