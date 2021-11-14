import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://b2f10b0f552a4421be4365a429cf9d32@o1068770.ingest.sentry.io/6063022',
  tracesSampleRate: 1.0,
  beforeSend:
    process.env.NODE_ENV !== 'production'
      ? (_, hint) => console.error(hint.originalException)
      : () => null
})
