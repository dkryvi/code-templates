import format from 'date-fns/format'

type Props = {
  date: number | Date
}

const DateFormatter: React.FC<Props> = ({date}) => {
  const formattedDate = format(date, 'LLLL d, yyyy')

  return (
    <time className="prose" dateTime={formattedDate}>
      {formattedDate}
    </time>
  )
}

export default DateFormatter
