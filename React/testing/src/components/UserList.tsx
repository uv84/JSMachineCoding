import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

interface UserListProps {
  users?: User[]
  onUserSelect?: (user: User) => void
}

export const UserList: React.FC<UserListProps> = ({ users = [], onUserSelect }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    onUserSelect?.(user)
  }

  const handleSearch = (term: string) => {
    setLoading(true)
    setSearchTerm(term)
    // Simulate API delay
    setTimeout(() => setLoading(false), 300)
  }

  useEffect(() => {
    if (users.length === 0) {
      setLoading(true)
      setTimeout(() => setLoading(false), 1000)
    }
  }, [users.length])

  if (loading) {
    return <div data-testid="loading">Loading users...</div>
  }

  return (
    <div className="user-list">
      <h2>User List</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          data-testid="search-input"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p data-testid="no-users">No users found</p>
      ) : (
        <ul className="users" data-testid="user-list">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
              onClick={() => handleUserClick(user)}
              data-testid={`user-${user.id}`}
            >
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div className="selected-user" data-testid="selected-user">
          <h3>Selected User</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
        </div>
      )}
    </div>
  )
}