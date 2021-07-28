const chai = require('chai').assert
const { isValidPathUnix, isValidPathWin } = require('../main')

describe('🧪 isValidPath tests 🧪', () => {
  describe('isValidPathUnix()', () => {
    it('should return true', () => {
      chai.isTrue(isValidPathUnix('hello.js'))
    })

    it('should return true', () => {
      chai.isTrue(isValidPathUnix('hello&world.js'))
    })

    it('should return true', () => {
      chai.isTrue(isValidPathUnix('hello&world.js', true))
    })

    it('should return false', () => {
      chai.isFalse(isValidPathUnix('hello/world.js', true))
    })

    it('should return true', () => {
      chai.isTrue(isValidPathUnix('hello/world', false))
    })
  }) // isValidPathUnix

  describe('isValidPathWin()', () => {
    it('should return true', () => {
      chai.isTrue(isValidPathWin('hello.js'))
    })

    it('should return true', () => {
      chai.isTrue(isValidPathWin('hello&world.js'))
    })

    it('should return true', () => {
      chai.isTrue(isValidPathWin('hello&world.js', true))
    })

    it('should return false', () => {
      chai.isFalse(isValidPathWin('hello/world.js', true))
    })

    it('should return false', () => {
      chai.isFalse(isValidPathWin('hello/world', false))
    })

    it('should return false', () => {
      chai.isFalse(isValidPathWin('COM7'))
    })

    it('should return true', () => {
      chai.isTrue(isValidPathWin('CON7'))
    })

    it('should return false', () => {
      chai.isFalse(isValidPathWin('lpt1'))
    })

    it('should return true', () => {
      chai.isTrue(isValidPathWin('connection'))
    })

    it('should return false', () => {
      chai.isFalse(isValidPathWin('lpt1.txt'))
    })

    it('should return false', () => {
      chai.isFalse(isValidPathWin('hello*world'))
    })
  }) // isValidPathWin
})
