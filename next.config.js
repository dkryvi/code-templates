// eslint-disable-next-line @typescript-eslint/no-var-requires
const {withSentryConfig} = require('@sentry/nextjs')

const moduleExports = {
  images: {
    domains: ['res.cloudinary.com']
  }
}

const sentryWebpackPluginOptions = {
  silent: true
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
