/* eslint-disable @typescript-eslint/no-var-requires */
const {ESLint} = require('eslint')

const eslint = new ESLint()
const isWin = process.platform === 'win32'

module.exports = {
  '**/*.{tsx,ts}': ["bash -c 'npm run check:types'"],
  '**/*.{js,jsx,tsx,ts,css,md}': (filenames) => {
    const escapedFileNames = filenames
      .filter((file) => !eslint.isPathIgnored(file))
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .join(' ')

    return [
      `npm run check:format ${escapedFileNames}`,
      `npm run check:lint ${filenames
        .filter((file) => !eslint.isPathIgnored(file))
        .map((f) => `"${f}"`)
        .join(' ')}`
    ]
  }
}
