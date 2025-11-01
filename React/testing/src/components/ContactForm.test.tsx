import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from './ContactForm'

describe('ContactForm Component', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('updates input values when user types', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const messageInput = screen.getByTestId('message-input')
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'Hello, this is a test message.')
    
    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(messageInput).toHaveValue('Hello, this is a test message.')
  })

  it('shows validation errors when form is submitted with empty fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    expect(screen.getByTestId('name-error')).toHaveTextContent('Name is required')
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required')
    expect(screen.getByTestId('message-error')).toHaveTextContent('Message is required')
  })

  it('shows email validation error for invalid email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const messageInput = screen.getByTestId('message-input')
    const submitButton = screen.getByTestId('submit-button')
    
    // Fill required fields except make email invalid
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'invalid-email')
    await user.type(messageInput, 'Test message')
    await user.click(submitButton)
    
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is invalid')
  })

  it('clears validation errors when user starts typing in error fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Submit empty form to trigger errors
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    expect(screen.getByTestId('name-error')).toBeInTheDocument()
    
    // Start typing in name field
    const nameInput = screen.getByTestId('name-input')
    await user.type(nameInput, 'J')
    
    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument()
  })

  it('calls onSubmit with form data when form is valid', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ContactForm onSubmit={mockOnSubmit} />)
    
    // Fill out form
    await user.type(screen.getByTestId('name-input'), 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    await user.type(screen.getByTestId('message-input'), 'Test message')
    
    // Submit form
    await user.click(screen.getByTestId('submit-button'))
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    })
  })

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill out and submit form
    await user.type(screen.getByTestId('name-input'), 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    await user.type(screen.getByTestId('message-input'), 'Test message')
    await user.click(screen.getByTestId('submit-button'))
    
    expect(screen.getByTestId('success-message')).toBeInTheDocument()
    expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    expect(screen.getByText(/your message has been sent successfully/i)).toBeInTheDocument()
  })

  it('resets form when reset button is clicked in success state', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill out and submit form
    await user.type(screen.getByTestId('name-input'), 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    await user.type(screen.getByTestId('message-input'), 'Test message')
    await user.click(screen.getByTestId('submit-button'))
    
    // Click reset button
    await user.click(screen.getByTestId('reset-button'))
    
    // Form should be back to initial state
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    expect(screen.getByTestId('name-input')).toHaveValue('')
    expect(screen.getByTestId('email-input')).toHaveValue('')
    expect(screen.getByTestId('message-input')).toHaveValue('')
  })

  it('does not call onSubmit when form is invalid', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ContactForm onSubmit={mockOnSubmit} />)
    
    // Submit empty form
    await user.click(screen.getByTestId('submit-button'))
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('has proper accessibility attributes', () => {
    render(<ContactForm />)
    
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const messageInput = screen.getByTestId('message-input')
    
    expect(nameInput).toHaveAttribute('aria-invalid', 'false')
    expect(emailInput).toHaveAttribute('aria-invalid', 'false')
    expect(messageInput).toHaveAttribute('aria-invalid', 'false')
  })

  it('updates aria-invalid when validation errors occur', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    await user.click(screen.getByTestId('submit-button'))
    
    const nameInput = screen.getByTestId('name-input')
    const emailInput = screen.getByTestId('email-input')
    const messageInput = screen.getByTestId('message-input')
    
    expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    expect(emailInput).toHaveAttribute('aria-invalid', 'true')
    expect(messageInput).toHaveAttribute('aria-invalid', 'true')
  })

  it('associates error messages with inputs using aria-describedby', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    await user.click(screen.getByTestId('submit-button'))
    
    const nameInput = screen.getByTestId('name-input')
    expect(nameInput).toHaveAttribute('aria-describedby', 'name-error')
    
    const emailInput = screen.getByTestId('email-input')
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
    
    const messageInput = screen.getByTestId('message-input')
    expect(messageInput).toHaveAttribute('aria-describedby', 'message-error')
  })

  it('handles form submission via Enter key', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<ContactForm onSubmit={mockOnSubmit} />)
    
    // Fill out form
    const nameInput = screen.getByTestId('name-input')
    await user.type(nameInput, 'John Doe')
    await user.type(screen.getByTestId('email-input'), 'john@example.com')
    await user.type(screen.getByTestId('message-input'), 'Test message')
    
    // Press Enter while focused on an input
    await user.type(nameInput, '{enter}')
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    })
  })
})