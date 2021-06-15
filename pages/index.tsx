import {GetStaticProps} from 'next'

import HomeTemplate from 'templates/home'
import {getStaticPageProps, TFileContent} from 'utils/content'

export const getStaticProps: GetStaticProps<TFileContent> = () =>
  getStaticPageProps('home')

export default HomeTemplate
