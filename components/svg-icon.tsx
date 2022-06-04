export type Props = {
  width?: number | string
  height?: number | string
  viewBox?: string
  children?: React.ReactNode
}

const SvgIcon = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  children,
  ...props
}: Props) => (
  <svg
    width={width}
    height={height}
    fill="currentColor"
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
)

export default SvgIcon
