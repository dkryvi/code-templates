export function toTitleCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
}

export function toSlugCase(string: string): string {
  let stringCopy = string

  stringCopy = stringCopy.replace(/^\s+|\s+$/g, '')

  // Make the string lowercase
  stringCopy = stringCopy.toLowerCase()

  // Remove accents, swap ñ for n, etc
  const from =
    'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
  const to =
    'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
  for (let i = 0, l = from.length; i < l; i++) {
    stringCopy = stringCopy.replace(
      new RegExp(from.charAt(i), 'g'),
      to.charAt(i)
    )
  }

  // Remove invalid chars
  stringCopy = stringCopy
    .replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-')

  return stringCopy
}
