import { dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'


export const appDir = process.cwd()

export function fileShortPath(importUrl: string, separator = '/'): string {
  let path = relative(appDir, genCurrentFilename(importUrl))
  if (separator && separator !== sep) {
    path = path.replaceAll(sep, separator)
  }
  return path
}

/**
 * Generate __filename for ESM
 * @param inputUrl import.meta.url
 */
export function genCurrentFilename(inputUrl: string, separator = '/'): string {
  let path = fileURLToPath(inputUrl)
  if (separator && separator !== sep) {
    path = path.replaceAll(sep, separator)
  }
  return path
}
/**
 * Generate __dirname for ESM
 * @param inputUrl import.meta.url
 */
export function genCurrentDirname(inputUrl: string, separator = '/'): string {
  const __filename = genCurrentFilename(inputUrl, sep)
  let dir = dirname(__filename)
  if (separator && separator !== sep) {
    dir = dir.replaceAll(sep, separator)
  }
  return dir
}

