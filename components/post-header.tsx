import CoverImage from './cover-image'
import Date from './date'
import Title from './title'

type Props = {
  title: string
  coverImage: string
  date: number
}

const PostHeader: React.FC<Props> = ({title, coverImage, date}) => {
  return (
    <>
      <Title>{title}</Title>
      <div className="relative -mx-5 mb-8 h-auto w-full sm:mx-0 md:mb-16">
        <CoverImage title={title} src={coverImage} />
      </div>
      <p className="text-xl font-semibold tracking-wide text-stone-600">
        Published: <Date date={date} />
      </p>
    </>
  )
}

export default PostHeader
