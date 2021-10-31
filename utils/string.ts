export function toTitleCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
}

export function toSlugCase(string: string): string {
  return (
    string
      .replace(/^\s+|\s+$/g, '')
      .toLowerCase()
      // Remove invalid chars
      .replace(/[^a-z0-9 -]/g, '')
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-')
      // Collapse dashes
      .replace(/-+/g, '-')
  )
}
