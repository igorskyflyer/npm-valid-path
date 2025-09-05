import { assert, describe, it } from 'vitest'
import { isValidPathUnix, isValidPathWin } from '../src/index.js'

describe('🧪 isValidPath tests 🧪', () => {
  describe('isValidPathUnix()', () => {
    it('should return true', () => {
      assert.isTrue(isValidPathUnix('hello.js'))
    })

    it('should return true', () => {
      assert.isTrue(isValidPathUnix('hello&world.js'))
    })

    it('should return true', () => {
      assert.isTrue(isValidPathUnix('hello&world.js', true))
    })

    it('should return false', () => {
      assert.isFalse(isValidPathUnix('hello/world.js', true))
    })

    it('should return true', () => {
      assert.isTrue(isValidPathUnix('hello/world', false))
    })
  }) // isValidPathUnix

  describe('isValidPathWin()', () => {
    it('should return true', () => {
      assert.isTrue(isValidPathWin('hello.js'))
    })

    it('should return true', () => {
      assert.isTrue(isValidPathWin('hello&world.js'))
    })

    it('should return true', () => {
      assert.isTrue(isValidPathWin('hello&world.js', true))
    })

    it('should return false', () => {
      assert.isFalse(isValidPathWin('hello/world.js', true))
    })

    it('should return true', () => {
      assert.isTrue(isValidPathWin('hello/world', false))
    })

    it('should return false', () => {
      assert.isFalse(isValidPathWin('COM7'))
    })

    it('should return true', () => {
      assert.isTrue(isValidPathWin('CON7'))
    })

    it('should return false', () => {
      assert.isFalse(isValidPathWin('lpt1'))
    })

    it('should return true', () => {
      assert.isTrue(isValidPathWin('connection'))
    })

    it('should return false', () => {
      assert.isFalse(isValidPathWin('lpt1.txt'))
    })

    it('should return false', () => {
      assert.isFalse(isValidPathWin('hello*world'))
    })
  }) // isValidPathWin
})
