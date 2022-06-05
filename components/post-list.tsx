import Link from 'next/link'

import {Post} from 'types'

import PostPreview from './post-preview'

interface Props {
  title?: string
  posts: Post[]
  allLink?: string
}

const PostList: React.FC<Props> = ({title, posts, allLink}) => (
  <section className="mb-16">
    {title && (
      <h2 className="prose mb-8 text-6xl font-bold leading-tight tracking-tighter">
        {title}
      </h2>
    )}
    <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3 ">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <a>
              <PostPreview
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                excerpt={post.excerpt}
                author={post.author}
                slug={post.slug}
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
    {allLink && (
      <Link href={allLink}>
        <a
          className="mt-4 block text-right text-lg font-bold text-gray-900 hover:underline"
          aria-label="View All"
        >
          View All
        </a>
      </Link>
    )}
  </section>
)

export default PostList
