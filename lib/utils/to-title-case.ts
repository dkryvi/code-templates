function toTitleCase(title: string): string {
  return title.charAt(0).toUpperCase() + title.substr(1).toLowerCase()
}

export default toTitleCase
