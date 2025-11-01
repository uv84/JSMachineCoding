import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { expect } from 'vitest'

// Custom render function with common providers
const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <div data-testid="test-wrapper">
      {children}
    </div>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Common test utilities
export const createMockUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  ...overrides
})

export const createMockUsers = (count = 3) => 
  Array.from({ length: count }, (_, index) => 
    createMockUser({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`
    })
  )

// Wait for element to disappear
export const waitForElementToBeRemoved = async (element: () => HTMLElement | null) => {
  const { waitFor } = await import('@testing-library/react')
  return waitFor(() => {
    expect(element()).not.toBeInTheDocument()
  })
}

// Mock local storage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {}
  
  const mockStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach(key => delete store[key])
    }
  }
  
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true
  })
  
  return mockStorage
}

// Helper to fill form fields
export const fillForm = async (user: any, fields: Record<string, string>) => {
  for (const [testId, value] of Object.entries(fields)) {
    const { screen } = await import('@testing-library/react')
    const field = screen.getByTestId(testId)
    await user.clear(field)
    await user.type(field, value)
  }
}