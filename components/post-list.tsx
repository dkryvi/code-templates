import Post from 'types/post'

import PostPreview from './post-preview'

type Props = {
  title?: string
  posts: Post[]
}

const PostList: React.FC<Props> = ({title, posts}) => {
  return (
    <section>
      {title && (
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            tags={post.tags}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}

export default PostList
