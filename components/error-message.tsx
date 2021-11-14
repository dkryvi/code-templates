const ErrorMessage: React.FC<{message?: string}> = ({message}) => {
  return <p className="prose prose-sm text-red-500">{message}</p>
}

export default ErrorMessage
