import { useState } from 'react';
import { useDispatch } from '../store/hooks';
import { addUserRequest } from '../store/slices/userSlice';
import type { User } from '../store/slices/types';
import './AddUserForm.css';

const AddUserForm = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    company: { name: '' },
    address: { city: '', zipcode: '' }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: Omit<User, 'id'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      company: { name: formData.company.name },
      address: { city: formData.address.city, zipcode: formData.address.zipcode }
    };

    dispatch(addUserRequest(newUser));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',
      company: { name: '' },
      address: { city: '', zipcode: '' }
    });
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...(prev as any)[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (!isOpen) {
    return (
      <div className="add-user-trigger">
        <button 
          className="add-user-button" 
          onClick={() => setIsOpen(true)}
        >
          ➕ Add New User
        </button>
      </div>
    );
  }

  return (
    <div className="add-user-overlay" onClick={() => setIsOpen(false)}>
      <div className="add-user-form" onClick={(e) => e.stopPropagation()}>
        <div className="add-user-header">
          <h2>Add New User</h2>
          <button 
            className="add-user-close" 
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="company.name">Company</label>
            <input
              type="text"
              id="company.name"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address.city">City</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address.zipcode">Zip Code</label>
              <input
                type="text"
                id="address.zipcode"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => setIsOpen(false)} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;