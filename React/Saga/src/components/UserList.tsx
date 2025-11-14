import { useEffect } from 'react';
import { useDispatch, useSelector } from '../store/hooks';
import { fetchUsersRequest, selectUser } from '../store/slices/userSlice';
import type { User } from '../store/slices/types';
import './UserList.css';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleUserSelect = (user: User) => {
    dispatch(selectUser(user));
  };

  if (loading) {
    return <div className="user-list-loading">Loading users...</div>;
  }

  if (error) {
    return <div className="user-list-error">Error: {error}</div>;
  }

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Users</h2>
      <div className="user-list-grid">
        {users.map((user: User) => (
          <div
            key={user.id}
            className="user-list-item"
            onClick={() => handleUserSelect(user)}
          >
            <div className="user-list-item-header">
              <h3 className="user-list-item-name">{user.name}</h3>
              <span className="user-list-item-company">{user.company.name}</span>
            </div>
            <div className="user-list-item-details">
              <p className="user-list-item-email">{user.email}</p>
              <p className="user-list-item-location">{user.address.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;