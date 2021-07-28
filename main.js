const { platform } = require('os')
const { charsInString } = require('@igor.dvlpr/chars-in-string')
const { strIsIn } = require('@igor.dvlpr/str-is-in')
const { slash } = require('@igor.dvlpr/upath')

const isWindows = platform() === 'win32'
const winMaxPath = 260
// Windows doesn't allow these characters to appear in the path
const winNotAllowed = ['/', ':', '*', '?', '"', '<', '>', '|']
// prettier-ignore
const winDevices = [ 'CON',  'PRN',  'AUX',  'NUL',  'COM1',  'COM2',  'COM3',  'COM4',  'COM5',  'COM6',  'COM7',  'COM8',  'COM9',  'LPT1',  'LPT2',  'LPT3',  'LPT4',  'LPT5',  'LPT6',  'LPT7',  'LPT8',  'LPT9' ]

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
  const isDevice = strIsIn(path, winDevices, (entry, value) => {
    return new RegExp(`^\\s*${entry}\\s*(?:\\.{1}[^\\.]{0,}){0,}\\s*$`, 'i').test(value)
  })

  return !isDevice && validPath(path, winNotAllowed, winMaxPath, isFile, '\\')
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
