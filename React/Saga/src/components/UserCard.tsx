import { useSelector, useDispatch } from '../store/hooks';
import { clearSelectedUser } from '../store/slices/userSlice';
import './UserCard.css';

const UserCard = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state: any) => state.users);

  const handleClose = () => {
    dispatch(clearSelectedUser());
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="user-card-overlay" onClick={handleClose}>
      <div className="user-card" onClick={(e) => e.stopPropagation()}>
        <button className="user-card-close" onClick={handleClose}>
          ×
        </button>
        
        <div className="user-card-header">
          <div className="user-card-avatar">
            {selectedUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-card-title">
            <h2 className="user-card-name">{selectedUser.name}</h2>
            <p className="user-card-company">{selectedUser.company.name}</p>
          </div>
        </div>
        
        <div className="user-card-content">
          <div className="user-card-section">
            <h3 className="user-card-section-title">Contact Information</h3>
            <div className="user-card-info">
              <div className="user-card-info-item">
                <span className="user-card-info-icon">📧</span>
                <div>
                  <label>Email</label>
                  <p>{selectedUser.email}</p>
                </div>
              </div>
              <div className="user-card-info-item">
                <span className="user-card-info-icon">📞</span>
                <div>
                  <label>Phone</label>
                  <p>{selectedUser.phone}</p>
                </div>
              </div>
              <div className="user-card-info-item">
                <span className="user-card-info-icon">🌐</span>
                <div>
                  <label>Website</label>
                  <p>{selectedUser.website}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="user-card-section">
            <h3 className="user-card-section-title">Address</h3>
            <div className="user-card-info">
              <div className="user-card-info-item">
                <span className="user-card-info-icon">📍</span>
                <div>
                  <label>City</label>
                  <p>{selectedUser.address.city}</p>
                </div>
              </div>
              <div className="user-card-info-item">
                <span className="user-card-info-icon">📮</span>
                <div>
                  <label>Zip Code</label>
                  <p>{selectedUser.address.zipcode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;