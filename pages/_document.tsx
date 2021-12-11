// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" className="light">
        <Head />
        <body className="bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
