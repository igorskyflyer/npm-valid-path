const { platform } = require('os')
const { charsInString } = require('@igor.dvlpr/chars-in-string')
const { slash } = require('@igor.dvlpr/upath')
const { isWindowsDevice } = require('@igor.dvlpr/windev')

const isWindows = platform() === 'win32'
const winMaxPath = 260
// Windows doesn't allow these characters to appear in the path
const winNotAllowed = ['/', ':', '*', '?', '"', '<', '>', '|']

const unixMaxPath = 255
// Unix systems don't allow \0 (and a forward slash if it's a file name) as a part of the path
const unixNotAllowed = []

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
function isValidPathWin(path, isFile = true) {
  return !isWindowsDevice(path) && validPath(path, winNotAllowed, winMaxPath, isFile, '\\')
}

/**
 * Returns whether the given path can be a valid file/directory name on Unix and Unix-like OS'.
 * @param {string} path
 * @param {boolean} [isFile=true]
 * @returns {boolean}
 */
function isValidPathUnix(path, isFile = true) {
  return validPath(path, unixNotAllowed, unixMaxPath, isFile, '/')
}

/**
 * Returns whether the given path can be a valid file/directory name on the host machine.
 * @param {string} path
 * @param {boolean} [isFile=true]
 * @returns {boolean}
 */
function isValidPath(path, isFile = true) {
  if (isWindows) {
    return isValidPathWin(path, isFile)
  } else {
    return isValidPathUnix(path, isFile)
  }
}

module.exports = {
  isValidPath,
  isValidPathUnix,
  isValidPathWin,
}
