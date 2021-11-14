// eslint-disable-next-line @typescript-eslint/no-var-requires
const {withSentryConfig} = require('@sentry/nextjs')

const moduleExports = {
  images: {
    domains: [
      'res.cloudinary.com',
      'storage.googleapis.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com'
    ]
  }
}

const sentryWebpackPluginOptions = {
  silent: true
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
