import Link from 'next/link'

import Container from './container'
import {TwitterIcon, GithubIcon, LinkedInIcon} from './icons'

const LINKS = [
  {label: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com/dkryvi_'},
  {label: 'Github', icon: GithubIcon, href: 'https://github.com/dkryvi'},
  {
    label: 'LinkedIn',
    icon: LinkedInIcon,
    href: 'https://www.linkedin.com/in/dzianis-kryvichanin-4b7a15148/'
  }
]

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-accent-2 bg-white py-8 ">
      <Container>
        <div className="mx-auto flex max-w-xs items-center justify-between pt-8">
          {LINKS.map(({label, href, icon: Icon}) => (
            <Link key={label} href={href}>
              <a className="flex items-center text-gray-400 transition-colors duration-200 hover:text-gray-800">
                <p className="mr-1 text-lg font-light">{label}</p>
                <Icon />
              </a>
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
