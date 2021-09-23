import Image from 'next/image'

type Props = {
  name: string
  picture: string
}

const Avatar: React.FC<Props> = ({name, picture}) => {
  return (
    <div className="flex items-center">
      <Image
        src={picture}
        className="rounded-full"
        alt={name}
        width={48}
        height={48}
      />
      <p className="prose ml-4 text-xl font-bold">{name}</p>
    </div>
  )
}

export default Avatar
