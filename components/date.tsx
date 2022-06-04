import format from 'date-fns/format'

type Props = {
  className?: string
  date: number | Date
}

const Date: React.FC<Props> = ({className, date}) => {
  const formattedDate = format(date, 'LLLL d, yyyy')

  return (
    <time className={className} dateTime={formattedDate}>
      {formattedDate}
    </time>
  )
}

export default Date
