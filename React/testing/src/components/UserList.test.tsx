import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserList } from './UserList'

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@test.com' },
]

describe('UserList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component title', () => {
    render(<UserList users={mockUsers} />)
    expect(screen.getByRole('heading', { name: /user list/i })).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<UserList users={mockUsers} />)
    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search users...')
  })

  it('displays all users when no search term', () => {
    render(<UserList users={mockUsers} />)
    
    expect(screen.getByTestId('user-1')).toBeInTheDocument()
    expect(screen.getByTestId('user-2')).toBeInTheDocument()
    expect(screen.getByTestId('user-3')).toBeInTheDocument()
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('shows loading state initially when no users provided', async () => {
    render(<UserList users={[]} />)
    
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByText('Loading users...')).toBeInTheDocument()
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    }, { timeout: 1500 })
  })

  it('shows no users message when empty array and not loading', async () => {
    render(<UserList users={[]} />)
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    }, { timeout: 1500 })
    
    expect(screen.getByTestId('no-users')).toBeInTheDocument()
    expect(screen.getByText('No users found')).toBeInTheDocument()
  })

  it('filters users by name when searching', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'john')
    
    // Wait for loading to finish and filtering to apply
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByTestId('user-1')).toBeInTheDocument() // John Doe
      expect(screen.getByTestId('user-3')).toBeInTheDocument() // Bob Johnson
      expect(screen.queryByTestId('user-2')).not.toBeInTheDocument() // Jane Smith
    })
  })

  it('filters users by email when searching', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'test.com')
    
    // Wait for loading to finish and filtering to apply
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByTestId('user-3')).toBeInTheDocument() // Bob with bob@test.com
      expect(screen.queryByTestId('user-1')).not.toBeInTheDocument()
      expect(screen.queryByTestId('user-2')).not.toBeInTheDocument()
    })
  })

  it('shows loading state during search', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'test')
    
    // Loading should appear briefly
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  it('shows no users found when search has no results', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'nonexistent')
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByTestId('no-users')).toBeInTheDocument()
      expect(screen.getByText('No users found')).toBeInTheDocument()
    })
  })

  it('selects user when clicked', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    const userItem = screen.getByTestId('user-1')
    await user.click(userItem)
    
    expect(userItem).toHaveClass('selected')
    expect(screen.getByTestId('selected-user')).toBeInTheDocument()
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument()
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument()
  })

  it('calls onUserSelect callback when user is clicked', async () => {
    const user = userEvent.setup()
    const mockOnUserSelect = vi.fn()
    render(<UserList users={mockUsers} onUserSelect={mockOnUserSelect} />)
    
    const userItem = screen.getByTestId('user-2')
    await user.click(userItem)
    
    expect(mockOnUserSelect).toHaveBeenCalledWith(mockUsers[1])
    expect(mockOnUserSelect).toHaveBeenCalledTimes(1)
  })

  it('updates selected user when different user is clicked', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    // Select first user
    await user.click(screen.getByTestId('user-1'))
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument()
    
    // Select second user
    await user.click(screen.getByTestId('user-2'))
    expect(screen.getByText('Name: Jane Smith')).toBeInTheDocument()
    expect(screen.queryByText('Name: John Doe')).not.toBeInTheDocument()
  })

  it('search is case insensitive', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'JANE')
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByTestId('user-2')).toBeInTheDocument()
      expect(screen.queryByTestId('user-1')).not.toBeInTheDocument()
      expect(screen.queryByTestId('user-3')).not.toBeInTheDocument()
    })
  })

  it('clears search and shows all users when search input is cleared', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    const searchInput = screen.getByTestId('search-input')
    
    // Search for something specific
    await user.type(searchInput, 'jane')
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.queryByTestId('user-1')).not.toBeInTheDocument()
    })
    
    // Clear search
    await user.clear(searchInput)
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('user-1')).toBeInTheDocument()
      expect(screen.getByTestId('user-2')).toBeInTheDocument()
      expect(screen.getByTestId('user-3')).toBeInTheDocument()
    })
  })

  it('handles undefined onUserSelect prop gracefully', async () => {
    const user = userEvent.setup()
    render(<UserList users={mockUsers} />)
    
    const userItem = screen.getByTestId('user-1')
    
    // Should not throw an error
    await user.click(userItem)
    
    // User should still be selected
    await waitFor(() => {
      expect(userItem).toHaveClass('selected')
    })
  })
})