import {parseISO, format} from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter: React.FC<Props> = ({dateString}) => {
  const date = parseISO(dateString)
  return (
    <time className="text-black" dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy')}
    </time>
  )
}

export default DateFormatter
