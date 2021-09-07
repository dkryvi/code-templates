import Link from 'next/link'

import Post from 'types/post'

import PostPreview from './post-preview'

type Props = {
  title?: string
  posts: Post[]
  allLink?: string
}

const PostList: React.FC<Props> = ({title, posts, allLink}) => {
  return (
    <section className="mb-16">
      {title && (
        <h2 className="mb-8 text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
          {title}
        </h2>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 ">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostPreview
              title={post.title}
              tags={post.tags}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </li>
        ))}
      </ul>
      {allLink && (
        <Link href={allLink}>
          <a
            className="block text-right text-lg font-bold mt-4 hover:underline"
            aria-label="View All"
          >
            View All
          </a>
        </Link>
      )}
    </section>
  )
}

export default PostList
