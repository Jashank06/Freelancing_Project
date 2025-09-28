import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form data for editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    dateOfBirth: '',
    gender: ''
  });

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/auth');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data.user || response.data;
      setUser(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || '',
        state: userData.state || '',
        pincode: userData.pincode || '',
        dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : '',
        gender: userData.gender || ''
      });
    } catch (err) {
      console.error('Profile loading failed:', err.response?.data?.message || err.message);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth');
      } else {
        const errorMsg = err.response?.data?.message || err.message || 'Failed to load profile data';
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setUser(response.data.user || response.data);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-primary">Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95">
      {/* Header */}
      <div className="bg-black/90 py-6 px-6 border-b border-primary/30">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-pink-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Card */}
          <div className="bg-black/90 rounded-2xl p-8 border border-primary/30 shadow-2xl">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-primary to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{user?.name || 'User'}</h2>
              <p className="text-gray-300">{user?.email}</p>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 p-4 bg-green-600/20 border border-green-600 rounded-lg text-green-400 text-center">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-center">
                {error}
              </div>
            )}

            {/* Profile Information */}
            {!isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <label className="text-primary font-semibold">Full Name</label>
                      <p className="text-white mt-1">{user?.name || 'Not provided'}</p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <label className="text-primary font-semibold">Email</label>
                      <p className="text-white mt-1">{user?.email || 'Not provided'}</p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <label className="text-primary font-semibold">Phone Number</label>
                      <p className="text-white mt-1">{user?.phone || 'Not provided'}</p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <label className="text-primary font-semibold">Date of Birth</label>
                      <p className="text-white mt-1">
                        {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <label className="text-primary font-semibold">Address</label>
                      <p className="text-white mt-1">{user?.address || 'Not provided'}</p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <label className="text-primary font-semibold">City</label>
                      <p className="text-white mt-1">{user?.city || 'Not provided'}</p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <label className="text-primary font-semibold">State</label>
                      <p className="text-white mt-1">{user?.state || 'Not provided'}</p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <label className="text-primary font-semibold">PIN Code</label>
                      <p className="text-white mt-1">{user?.pincode || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-pink-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-primary transition-all duration-300 transform hover:scale-105"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              /* Edit Form */
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-primary font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-primary font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                        required
                        disabled
                      />
                      <p className="text-gray-400 text-sm mt-1">Email cannot be changed</p>
                    </div>
                    
                    <div>
                      <label className="block text-primary font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-primary font-semibold mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-primary font-semibold mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-primary font-semibold mb-2">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-primary font-semibold mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-primary font-semibold mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-primary font-semibold mb-2">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setError('');
                      // Reset form data to original user data
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                        address: user?.address || '',
                        city: user?.city || '',
                        state: user?.state || '',
                        pincode: user?.pincode || '',
                        dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
                        gender: user?.gender || ''
                      });
                    }}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    disabled={updateLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-primary to-pink-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-primary transition-all duration-300"
                    disabled={updateLoading}
                  >
                    {updateLoading ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
