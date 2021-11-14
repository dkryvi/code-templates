import React from 'react'

import useAsync from 'hooks/use-async'
import markdownToHtml from 'utils/markdown-to-html'

import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const Content: React.FC<Props> = ({content}) => {
  const {run, data, isLoading} = useAsync()

  React.useEffect(() => run(markdownToHtml(content)), [content, run])

  return (
    <div className="max-w-4xl mx-auto">
      {isLoading ? (
        'Parsing...'
      ) : (
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{__html: data}}
        />
      )}
    </div>
  )
}

export default Content
