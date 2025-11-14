import type { User } from '../slices/types';

export const api = {
  // Fetch users from JSONPlaceholder API
  async fetchUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  // Add a new user (mock API call)
  async addUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    
    const newUser = await response.json();
    // Since JSONPlaceholder returns id: 11 for new posts, we'll use a random id
    return { ...newUser, id: Date.now() };
  },
};