import { charsInString } from '@igorskyflyer/chars-in-string'
import { slash } from '@igorskyflyer/upath'
import { isWindowsDevice } from '@igorskyflyer/windev'
import { platform } from 'node:os'

const WINDOWS_NOT_ALLOWED: string[] = ['<', '>', ':', '"', '/', '|', '?', '*']
const WINDOWS_MAX_PATH: number = 260
const WINDOWS_MAX_SEGMENT: number = 255
const WINDOWS_SEPARATOR: string = '\\'

const UNIX_NOT_ALLOWED: string[] = ['\0']
const UNIX_MAX_PATH_BYTES: number = 4096
const UNIX_MAX_SEGMENT_BYTES: number = 255
const UNIX_SEPARATOR: string = '/'

const REGEX_DRIVE: RegExp = /^[A-Z]:/i
const REGEX_WIN_SEP_NORM: RegExp = /\//g
const REGEX_UNIX_SEP_NORM: RegExp = /\\/g

const isWin: boolean = platform() === 'win32'

function normalizeSeparators(path: string, separator: string): string {
  return separator === WINDOWS_SEPARATOR
    ? path.replace(REGEX_WIN_SEP_NORM, WINDOWS_SEPARATOR)
    : path.replace(REGEX_UNIX_SEP_NORM, UNIX_SEPARATOR)
}

function allSegmentsPass(
  path: string,
  separator: string,
  callback: (segment: string) => boolean
): boolean {
  const segments: string[] = path.split(separator).filter(Boolean)
  const segmentsMax: number = segments.length

  for (let i = 0; i < segmentsMax; i++) {
    if (!callback(segments[i])) {
      return false
    }
  }

  return true
}

function hasOnlyDriveColon(path: string): boolean {
  const positions: number[] = []

  for (let i = 0; i < path.length; i++) {
    if (path.charCodeAt(i) === 58 /* : */) {
      positions.push(i)
    }
  }

  if (positions.length === 0) {
    return true
  }

  return positions.length === 1 && positions[0] === 1 && REGEX_DRIVE.test(path)
}

function windowsHasIllegalTrailing(segment: string): boolean {
  const last: string = segment.charAt(segment.length - 1)
  return last === ' ' || last === '.'
}

function isValidLength(path: string, separator: string): boolean {
  if (separator === WINDOWS_SEPARATOR) {
    if (path.length > WINDOWS_MAX_PATH) {
      return false
    }

    return allSegmentsPass(
      path,
      WINDOWS_SEPARATOR,
      (seg: string) => seg.length <= WINDOWS_MAX_SEGMENT
    )
  }

  if (Buffer.byteLength(path, 'utf8') > UNIX_MAX_PATH_BYTES) {
    return false
  }

  return allSegmentsPass(
    path,
    UNIX_SEPARATOR,
    (seg: string) => Buffer.byteLength(seg, 'utf8') <= UNIX_MAX_SEGMENT_BYTES
  )
}

function isNoWinDev(path: string): boolean {
  if (typeof path !== 'string') {
    return false
  }

  return allSegmentsPass(path, WINDOWS_SEPARATOR, (segment: string) => {
    return !isWindowsDevice(segment)
  })
}

function validPath(
  path: string,
  notAllowedChars: string[],
  isFile = true,
  separator = slash
): boolean {
  if (typeof path !== 'string') {
    return false
  }

  if (!path.trim()) {
    return false
  }

  if (!isValidLength(path, separator)) {
    return false
  }

  const disallowed: string[] = [...notAllowedChars]

  if (isFile && !disallowed.includes(separator)) {
    disallowed.push(separator)
  }

  return !charsInString(disallowed, path)
}

/**
 * Returns whether the given path can be a valid file/directory name on Windows OS.
 */
export function isValidPathWin(path: string, isFile: boolean = true): boolean {
  const normalizedPath: string = normalizeSeparators(path, WINDOWS_SEPARATOR)

  if (!isNoWinDev(normalizedPath)) {
    return false
  }

  if (!hasOnlyDriveColon(normalizedPath)) {
    return false
  }

  if (
    !allSegmentsPass(normalizedPath, WINDOWS_SEPARATOR, (segment: string) => {
      return segment.length === 0 ? true : !windowsHasIllegalTrailing(segment)
    })
  ) {
    return false
  }

  const WINDOWS_NOT_ALLOWED_NO_COLON = WINDOWS_NOT_ALLOWED.filter(
    (c: string) => c !== ':'
  )

  return validPath(
    normalizedPath,
    WINDOWS_NOT_ALLOWED_NO_COLON,
    isFile,
    WINDOWS_SEPARATOR
  )
}

/**
 * Returns whether the given path can be a valid file/directory name on Unix and Unix-like OS'.
 */
export function isValidPathUnix(path: string, isFile: boolean = true): boolean {
  const normalizedPath: string = normalizeSeparators(path, UNIX_SEPARATOR)

  return validPath(normalizedPath, UNIX_NOT_ALLOWED, isFile, UNIX_SEPARATOR)
}

/**
 * Returns whether the given path can be a valid file/directory name on the host machine.
 */
export function isValidPath(path: string, isFile: boolean = true): boolean {
  return isWin ? isValidPathWin(path, isFile) : isValidPathUnix(path, isFile)
}
