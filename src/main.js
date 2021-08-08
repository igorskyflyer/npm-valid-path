import { platform } from 'os'
import { charsInString } from '@igor.dvlpr/chars-in-string'
import { slash } from '@igor.dvlpr/upath'
import { isWindowsDevice } from '@igor.dvlpr/windev'

/**
 * @private
 * @param {string} path
 * @param {string[]} notAllowedChars
 * @param {number} maxPath
 * @param {boolean} [isFile=true]
 * @param {string} [separator=slash]
 * @returns {boolean}
 */
function validPath(path, notAllowedChars, maxPath, isFile = true, separator = slash) {
  if (!path || typeof path !== 'string') {
    return false
  }

  const count = path.length

  if (count === 0 || count > maxPath) {
    return false
  }

  const notAllowed = notAllowedChars.slice()

  if (isFile) {
    notAllowed.push(separator)
  }

  return !charsInString(notAllowed, path)
}

/**
 * Returns whether the given path can be a valid file/directory name on Windows OS.
 * @param {string} path
 * @param {boolean} [isFile=true]
 * @returns {boolean}
 */
export function isValidPathWin(path, isFile = true) {
  const winMaxPath = 260
  // Windows doesn't allow these characters to appear in the path
  const winNotAllowed = ['/', ':', '*', '?', '"', '<', '>', '|']

  return !isWindowsDevice(path) && validPath(path, winNotAllowed, winMaxPath, isFile, '\\')
}

/**
 * Returns whether the given path can be a valid file/directory name on Unix and Unix-like OS'.
 * @param {string} path
 * @param {boolean} [isFile=true]
 * @returns {boolean}
 */
export function isValidPathUnix(path, isFile = true) {
  const unixMaxPath = 255
  // Unix systems don't allow \0 (and a forward slash if it's a file name) as a part of the path
  /**
   * @type {string[]}
   */
  const unixNotAllowed = []

  return validPath(path, unixNotAllowed, unixMaxPath, isFile, '/')
}

/**
 * Returns whether the given path can be a valid file/directory name on the host machine.
 * @param {string} path
 * @param {boolean} [isFile=true]
 * @returns {boolean}
 */
export function isValidPath(path, isFile = true) {
  if (platform() === 'win32') {
    return isValidPathWin(path, isFile)
  } else {
    return isValidPathUnix(path, isFile)
  }
}
