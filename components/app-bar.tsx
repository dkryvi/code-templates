import Autocomplete from 'components/autocomplete'

const AppBar: React.FC = () => {
  return (
    <section className="mb-8">
      <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-tight lg:pr-8 mb-8">
        Code Templates.
      </h1>
      <Autocomplete />
    </section>
  )
}

export default AppBar
