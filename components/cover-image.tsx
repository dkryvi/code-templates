import Image from 'next/image'

type Props = {
  title: string
  src: string
}

const CoverImage: React.FC<Props> = ({title, src}) => {
  return (
    <div className="sm:mx-0">
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        layout="responsive"
        objectFit="cover"
        width={16}
        height={9}
      />
    </div>
  )
}

export default CoverImage
