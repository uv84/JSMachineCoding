import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setUsers, setLoading, setError, addUser, updateUser, deleteUser } from '../store/slices/userSlice';
import { dbService } from '../services/database';
import { authService } from '../services/auth';
import { UserForm } from '../components/users/UserForm';
import type { User } from '../store/slices/authSlice';

export const UsersPage: React.FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { users, loading, error, searchTerm, filterRole } = useAppSelector((state) => state.user as any);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    dispatch(setLoading(true));
    try {
      const allUsers = await dbService.getUsers();
      dispatch(setUsers(allUsers));
    } catch (error) {
      console.error('Failed to load users:', error);
      dispatch(setError('Failed to load users'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      const result = await authService.register(userData);
      if (result.success && result.user) {
        dispatch(addUser(result.user));
        setShowAddModal(false);
      } else {
        dispatch(setError(result.error || 'Failed to add user'));
      }
    } catch (error) {
      console.error('Failed to add user:', error);
      dispatch(setError('Failed to add user'));
    }
  };

  const handleUpdateUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    if (!editingUser) return;

    try {
      const updatedUser: User = {
        ...editingUser,
        ...userData,
        updatedAt: new Date().toISOString(),
      };
      
      await dbService.updateUser(updatedUser);
      dispatch(updateUser(updatedUser));
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
      dispatch(setError('Failed to update user'));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await dbService.deleteUser(userId);
      dispatch(deleteUser(userId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
      dispatch(setError('Failed to delete user'));
    }
  };

  const filteredUsers = users.filter((user: any) => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {intl.formatMessage({ id: 'nav.users' })}
          </h1>
          <p className="text-gray-600">
            Manage user accounts and permissions
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          {intl.formatMessage({ id: 'user.addUser' })}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search Users
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, email, or username..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700">
              Filter by Role
            </label>
            <select
              id="roleFilter"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user: any) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-800 font-medium">
                          {user.firstName[0]}{user.lastName[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'hr' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {intl.formatMessage({ id: `user.${user.role}` })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.department || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {intl.formatMessage({ id: user.isActive ? 'user.active' : 'user.inactive' })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    {intl.formatMessage({ id: 'common.edit' })}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(user)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {intl.formatMessage({ id: 'common.delete' })}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {intl.formatMessage({ id: 'user.addUser' })}
              </h3>
            </div>
            <UserForm
              onSubmit={handleAddUser}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {intl.formatMessage({ id: 'user.editUser' })}
              </h3>
            </div>
            <UserForm
              user={editingUser}
              onSubmit={handleUpdateUser}
              onCancel={() => setEditingUser(null)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                {intl.formatMessage({ id: 'user.deleteUser' })}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete {deleteConfirm.firstName} {deleteConfirm.lastName}?
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-3 px-4 py-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {intl.formatMessage({ id: 'common.cancel' })}
                </button>
                <button
                  onClick={() => handleDeleteUser(deleteConfirm.id)}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  {intl.formatMessage({ id: 'common.delete' })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};