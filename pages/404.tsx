import ErrorTemplate from 'components/error-template'

const NotFoundPage: React.FC = () => (
  <ErrorTemplate
    title="404"
    subtitle="Page Not Found"
    media="https://res.cloudinary.com/dkryvi/image/upload/v1629036236/Code%20Templates/app_media/404_emnzma.png"
  />
)

export default NotFoundPage
