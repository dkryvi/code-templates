export function toTitleCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
}

export function toSlugCase(string: string): string {
  return string.toLowerCase().trim().replace(/\s/g, '-')
}
