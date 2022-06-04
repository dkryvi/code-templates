import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody: React.FC<Props> = ({content}) => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="prose prose-lg prose-blue max-w-none bg-gray-700">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{__html: content}}
        />
      </div>
    </div>
  )
}

export default PostBody
