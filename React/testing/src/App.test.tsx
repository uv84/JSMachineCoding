import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: /vite \+ react/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders both logo images with correct alt text', () => {
    render(<App />)
    
    const viteLogo = screen.getByAltText(/vite logo/i)
    const reactLogo = screen.getByAltText(/react logo/i)
    
    expect(viteLogo).toBeInTheDocument()
    expect(reactLogo).toBeInTheDocument()
  })

  it('renders logo links with correct href attributes', () => {
    render(<App />)
    
    const viteLink = screen.getByRole('link', { name: /vite logo/i })
    const reactLink = screen.getByRole('link', { name: /react logo/i })
    
    expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
  })

  it('renders the count button with initial count of 0', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()
  })

  it('increments count when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const button = screen.getByRole('button', { name: /count is 0/i })
    
    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
    
    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument()
  })

  it('increments count multiple times correctly', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const button = screen.getByRole('button', { name: /count is 0/i })
    
    // Click 5 times
    for (let i = 0; i < 5; i++) {
      await user.click(button)
    }
    
    expect(screen.getByRole('button', { name: /count is 5/i })).toBeInTheDocument()
  })

  it('renders the edit instruction text', () => {
    render(<App />)
    const editText = screen.getByText(/edit src\/app\.tsx and save to test hmr/i)
    expect(editText).toBeInTheDocument()
  })

  it('renders the read-the-docs text', () => {
    render(<App />)
    const docsText = screen.getByText(/click on the vite and react logos to learn more/i)
    expect(docsText).toBeInTheDocument()
  })

  it('has correct CSS classes applied', () => {
    render(<App />)
    
    const viteLogo = screen.getByAltText(/vite logo/i)
    const reactLogo = screen.getByAltText(/react logo/i)
    const card = screen.getByText(/edit src\/app\.tsx/i).closest('.card')
    const docsText = screen.getByText(/click on the vite and react logos/i)
    
    expect(viteLogo).toHaveClass('logo')
    expect(reactLogo).toHaveClass('logo', 'react')
    expect(card).toBeInTheDocument()
    expect(docsText).toHaveClass('read-the-docs')
  })

  it('should have external links open in new tab', () => {
    render(<App />)
    
    const links = screen.getAllByRole('link')
    
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
    })
  })
})