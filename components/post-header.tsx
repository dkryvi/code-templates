import {Author} from 'types'

import Avatar from './avatar'
import CoverImage from './cover-image'
import DateFormatter from './date-formatter'
import TagList from './tag-list'
import Title from './title'

type Props = {
  title: string
  coverImage: string
  date: number
  author: Author
  tags: Array<string>
}

const PostHeader: React.FC<Props> = ({
  title,
  coverImage,
  date,
  author,
  tags
}) => {
  return (
    <div className="space-y-4 mb-12">
      <Title>{title}</Title>
      <Avatar name={author.name} picture={author.image} />
      <div className="text-lg">
        <DateFormatter date={date} />
      </div>
      <TagList tags={tags} />
      <CoverImage title={title} src={coverImage} />
    </div>
  )
}

export default PostHeader
