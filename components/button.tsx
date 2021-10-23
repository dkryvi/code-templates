import clsx from 'clsx'

interface Props {
  className?: string
  children: React.ReactNode
  [key: string]: any
}

const Button: React.FC<Props> = ({className, children, ...props}) => {
  return (
    <button
      className={clsx([
        'flex align-center py-2 px-4 prose bg-gray-900 hover:bg-white hover:text-gray-900 border border-gray-900 text-white font-bold rounded-md duration-200 transition-colors',
        className
      ])}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
