import { describe, it, expect, vi } from 'vitest'
import { add, multiply, formatCurrency, validateEmail, debounce } from './index'

describe('Utility Functions', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5)
    })

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2)
    })

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5)
      expect(add(5, 0)).toBe(5)
    })
  })

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12)
    })

    it('should multiply negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6)
    })

    it('should multiply positive and negative numbers', () => {
      expect(multiply(5, -3)).toBe(-15)
    })

    it('should handle zero', () => {
      expect(multiply(0, 5)).toBe(0)
      expect(multiply(5, 0)).toBe(0)
    })
  })

  describe('formatCurrency', () => {
    it('should format positive currency', () => {
      expect(formatCurrency(123.45)).toBe('$123.45')
    })

    it('should format zero currency', () => {
      expect(formatCurrency(0)).toBe('$0.00')
    })

    it('should format negative currency', () => {
      expect(formatCurrency(-123.45)).toBe('-$123.45')
    })

    it('should format large amounts', () => {
      expect(formatCurrency(1234567.89)).toBe('$1,234,567.89')
    })
  })

  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('user+tag@example.org')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('user@')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('user@domain')).toBe(false)
      expect(validateEmail('')).toBe(false)
      expect(validateEmail('user space@domain.com')).toBe(false)
    })
  })

  describe('debounce', () => {
    it('should call the function after the specified delay', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('test')
      expect(mockFn).not.toHaveBeenCalled()
      
      await new Promise(resolve => setTimeout(resolve, 150))
      expect(mockFn).toHaveBeenCalledWith('test')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should cancel previous calls when called multiple times', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('first')
      debouncedFn('second')
      debouncedFn('third')
      
      await new Promise(resolve => setTimeout(resolve, 150))
      expect(mockFn).toHaveBeenCalledWith('third')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple arguments', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 50)
      
      debouncedFn('arg1', 'arg2', 'arg3')
      
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3')
    })
  })
})