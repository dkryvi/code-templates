import {parseISO, format} from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter: React.FC<Props> = ({dateString}) => {
  const date = parseISO(dateString)
  return (
    <time className="prose" dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy')}
    </time>
  )
}

export default DateFormatter
