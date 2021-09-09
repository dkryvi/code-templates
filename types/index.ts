export type Author = {
  name: string
  picture: string
}

export type Collection = {
  title: string
  excerpt?: string
  coverImage?: string
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
