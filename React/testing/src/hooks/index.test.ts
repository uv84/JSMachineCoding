import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCounter, useFetch, useLocalStorage } from './index'

// Mock fetch for useFetch tests
const mockFetch = vi.fn()
globalThis.fetch = mockFetch

describe('Custom Hooks', () => {
  describe('useCounter', () => {
    it('initializes with default value of 0', () => {
      const { result } = renderHook(() => useCounter())
      expect(result.current.count).toBe(0)
    })

    it('initializes with provided initial value', () => {
      const { result } = renderHook(() => useCounter(10))
      expect(result.current.count).toBe(10)
    })

    it('increments count', () => {
      const { result } = renderHook(() => useCounter(5))
      
      act(() => {
        result.current.increment()
      })
      
      expect(result.current.count).toBe(6)
    })

    it('decrements count', () => {
      const { result } = renderHook(() => useCounter(5))
      
      act(() => {
        result.current.decrement()
      })
      
      expect(result.current.count).toBe(4)
    })

    it('resets count to initial value', () => {
      const { result } = renderHook(() => useCounter(10))
      
      act(() => {
        result.current.increment()
        result.current.increment()
      })
      
      expect(result.current.count).toBe(12)
      
      act(() => {
        result.current.reset()
      })
      
      expect(result.current.count).toBe(10)
    })

    it('maintains function references (memoization)', () => {
      const { result, rerender } = renderHook(() => useCounter(0))
      
      const { increment: increment1, decrement: decrement1, reset: reset1 } = result.current
      
      rerender()
      
      const { increment: increment2, decrement: decrement2, reset: reset2 } = result.current
      
      expect(increment1).toBe(increment2)
      expect(decrement1).toBe(decrement2)
      expect(reset1).toBe(reset2)
    })
  })

  describe('useFetch', () => {
    beforeEach(() => {
      mockFetch.mockClear()
    })

    it('starts with loading state', () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'success' })
      })

      const { result } = renderHook(() => useFetch('/api/test'))
      
      expect(result.current.loading).toBe(true)
      expect(result.current.data).toBe(null)
      expect(result.current.error).toBe(null)
    })

    it('fetches data successfully', async () => {
      const mockData = { id: 1, name: 'Test' }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      })

      const { result } = renderHook(() => useFetch('/api/test'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toEqual(mockData)
      expect(result.current.error).toBe(null)
    })

    it('handles HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      })

      const { result } = renderHook(() => useFetch('/api/notfound'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toBe(null)
      expect(result.current.error).toBe('HTTP error! status: 404')
    })

    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useFetch('/api/test'))
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toBe(null)
      expect(result.current.error).toBe('Network error')
    })

    it('refetches when URL changes', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: 'first' })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: 'second' })
        })

      const { result, rerender } = renderHook(
        ({ url }) => useFetch(url),
        { initialProps: { url: '/api/first' } }
      )
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      expect(result.current.data).toEqual({ data: 'first' })
      
      rerender({ url: '/api/second' })
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })
      
      expect(result.current.data).toEqual({ data: 'second' })
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('useLocalStorage', () => {
    beforeEach(() => {
      localStorage.clear()
      vi.clearAllMocks()
    })

    afterEach(() => {
      localStorage.clear()
    })

    it('initializes with default value when localStorage is empty', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      
      expect(result.current[0]).toBe('default')
    })

    it('initializes with value from localStorage when it exists', () => {
      localStorage.setItem('test-key', JSON.stringify('stored-value'))
      
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      
      expect(result.current[0]).toBe('stored-value')
    })

    it('updates localStorage when setValue is called', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
      
      act(() => {
        result.current[1]('new-value')
      })
      
      expect(result.current[0]).toBe('new-value')
      expect(localStorage.getItem('test-key')).toBe('"new-value"')
    })

    it('works with function updater', () => {
      const { result } = renderHook(() => useLocalStorage('counter', 0))
      
      act(() => {
        result.current[1](prev => prev + 1)
      })
      
      expect(result.current[0]).toBe(1)
      expect(localStorage.getItem('counter')).toBe('1')
    })

    it('handles different data types', () => {
      const { result } = renderHook(() => useLocalStorage('object', { count: 0 }))
      
      act(() => {
        result.current[1]({ count: 5 })
      })
      
      expect(result.current[0]).toEqual({ count: 5 })
      expect(JSON.parse(localStorage.getItem('object')!)).toEqual({ count: 5 })
    })

    it('handles localStorage errors gracefully', () => {
      // Mock localStorage.setItem to throw an error
      const originalSetItem = localStorage.setItem
      const mockSetItem = vi.fn(() => {
        throw new Error('Storage full')
      })
      localStorage.setItem = mockSetItem
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const { result } = renderHook(() => useLocalStorage('test', 'initial'))
      
      act(() => {
        result.current[1]('new-value')
      })
      
      expect(consoleSpy).toHaveBeenCalledWith('Error setting localStorage:', expect.any(Error))
      
      // Restore original methods
      localStorage.setItem = originalSetItem
      consoleSpy.mockRestore()
    })

    it('handles malformed JSON in localStorage', () => {
      localStorage.setItem('test-key', 'invalid-json{')
      
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      
      expect(result.current[0]).toBe('default')
    })
  })
})