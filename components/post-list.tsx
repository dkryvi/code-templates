import Link from 'next/link'

import {PostWithAuthor} from '@types'

import PostPreview from './post-preview'

interface Props {
  title?: string
  posts: PostWithAuthor[]
  allLink?: string
}

const PostList: React.FC<Props> = ({title, posts, allLink}) => (
  <section className="mb-16">
    {title && (
      <h2 className="prose mb-8 text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
        {title}
      </h2>
    )}
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 ">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <a>
              <PostPreview
                title={post.title}
                tags={post.tags}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
    {allLink && (
      <Link href={allLink}>
        <a
          className="block mt-4 text-right text-lg text-gray-900 font-bold hover:underline"
          aria-label="View All"
        >
          View All
        </a>
      </Link>
    )}
  </section>
)

export default PostList
