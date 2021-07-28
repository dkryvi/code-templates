import Post from 'types/post'

import PostPreview from './post-preview'

type Props = {
  title?: string
  posts: Post[]
}

const PostList: React.FC<Props> = ({title, posts}) => {
  return (
    <section className="mb-16">
      {title && (
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          {title}
        </h2>
      )}
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
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
    </section>
  )
}

export default PostList
