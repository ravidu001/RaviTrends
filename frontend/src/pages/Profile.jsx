import React, { useContext, useEffect, useState } from 'react'

import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    houseNo: '',
    street: '',
    city: '',
    district: '',
    province: '',
    postalCode: '',
    phoneNumber: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load user profile data
  useEffect(() => {
    if (token) {
      loadUserProfile();
      loadUserOrders();
    }
  }, [token]);

  const loadUserProfile = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/profile', {
        headers: { token }
      });
      if (response.data.success) {
        setProfileData(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserOrders = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {
        headers: { token }
      });
      if (response.data.success) {
        // Filter to show only delivered orders in profile
        const deliveredOrders = response.data.orders.filter(order => order.status === 'Delivered' || order.status === 'Delivery Failed');
        setOrders(deliveredOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProfileData(data => ({ ...data, [name]: value }));
  };

  const onPasswordChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPasswordData(data => ({ ...data, [name]: value }));
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/update-profile', profileData, {
        headers: { token }
      });
      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        // Save to localStorage for auto-fill functionality
        localStorage.setItem('userProfile', JSON.stringify(profileData));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      const response = await axios.post(backendUrl + '/api/user/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { token }
      });
      if (response.data.success) {
        toast.success('Password updated successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    navigate('/');
    toast.success('Logged out successfully!');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    
    try {
      const response = await axios.post(backendUrl + '/api/user/delete-account', {}, {
        headers: { token }
      });
      if (response.data.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
        setShowDeleteModal(false);
        navigate('/');
        toast.success('Account deleted successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error deleting account');
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setShowDeleteModal(false);
    }
  };

  if (!token) {
    return (
      <div className='text-center py-20'>
        <p className='text-gray-500 mb-4'>Please login to view your profile</p>
        <button 
          onClick={() => navigate('/login')}
          className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800'
        >
          LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className='border-t pt-16 min-h-[80vh]'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      {/* Tab Navigation */}
      <div className='flex border-b mb-8'>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3 font-medium ${activeTab === 'profile' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
        >
          Profile Information
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-medium ${activeTab === 'orders' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
        >
          Order History
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`px-6 py-3 font-medium ${activeTab === 'security' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
        >
          Security
        </button>
      </div>

      {/* Profile Information Tab */}
      {activeTab === 'profile' && (
        <div className='max-w-2xl'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-xl font-medium'>Personal Information</h3>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800'
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleProfileUpdate} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>First Name</label>
                <input 
                  type="text" 
                  name='firstName'
                  value={profileData.firstName}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
                <input 
                  type="text" 
                  name='lastName'
                  value={profileData.lastName}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
              <input 
                type="email" 
                name='email'
                value={profileData.email}
                onChange={onChangeHandler}
                disabled={!isEditing}
                className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>House No.</label>
                <input 
                  type="text" 
                  name='houseNo'
                  value={profileData.houseNo}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Street</label>
                <input 
                  type="text" 
                  name='street'
                  value={profileData.street}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                <input 
                  type="text" 
                  name='city'
                  value={profileData.city}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>District</label>
                <input 
                  type="text" 
                  name='district'
                  value={profileData.district}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Province</label>
                <input 
                  type="text" 
                  name='province'
                  value={profileData.province}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Postal Code</label>
                <input 
                  type="text" 
                  name='postalCode'
                  value={profileData.postalCode}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
              <input 
                type="tel" 
                name='phoneNumber'
                value={profileData.phoneNumber}
                onChange={onChangeHandler}
                disabled={!isEditing}
                className={`w-full border border-gray-300 rounded py-2 px-3 ${!isEditing ? 'bg-gray-50' : ''}`}
              />
            </div>

            {isEditing && (
              <div className='flex gap-4 pt-4'>
                <button 
                  type='submit'
                  className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800'
                >
                  Save Changes
                </button>
                <button 
                  type='button'
                  onClick={() => setIsEditing(false)}
                  className='border border-gray-300 px-8 py-3 text-sm hover:bg-gray-50'
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Order History Tab */}
      {activeTab === 'orders' && (
        <div>
          <h3 className='text-xl font-medium mb-6'>Order History</h3>
          <p className='text-sm text-gray-600 mb-4'>Showing your completed orders (delivered and failed deliveries)</p>
          {orders.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-500 mb-4'>No completed orders found</p>
              <button 
                onClick={() => navigate('/collection')}
                className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800'
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className='space-y-4'>
              {orders.map((order, index) => (
                <div key={index} className='border border-gray-200 p-6 rounded-lg'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h4 className='font-medium'>Order #{order._id}</h4>
                      <p className='text-sm text-gray-500'>
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium'>${order.amount}</p>
                      <p className={`text-sm px-2 py-1 rounded ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className='flex items-center gap-4'>
                        <img src={item.image[0]} alt={item.name} className='w-12 h-12 object-cover rounded' />
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>{item.name}</p>
                          <p className='text-xs text-gray-500'>Size: {item.size} | Qty: {item.quantity}</p>
                        </div>
                        <p className='text-sm font-medium'>${item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className='max-w-md'>
          <h3 className='text-xl font-medium mb-6'>Security Settings</h3>
          
          {/* Change Password Section */}
          <div className='mb-12'>
            <h4 className='text-lg font-medium mb-4'>Change Password</h4>
            <form onSubmit={handlePasswordUpdate} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Current Password</label>
                <input 
                  type="password" 
                  name='currentPassword'
                  value={passwordData.currentPassword}
                  onChange={onPasswordChangeHandler}
                  required
                  className='w-full border border-gray-300 rounded py-2 px-3'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>New Password</label>
                <input 
                  type="password" 
                  name='newPassword'
                  value={passwordData.newPassword}
                  onChange={onPasswordChangeHandler}
                  required
                  className='w-full border border-gray-300 rounded py-2 px-3'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm New Password</label>
                <input 
                  type="password" 
                  name='confirmPassword'
                  value={passwordData.confirmPassword}
                  onChange={onPasswordChangeHandler}
                  required
                  className='w-full border border-gray-300 rounded py-2 px-3'
                />
              </div>
              <button 
                type='submit'
                className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800'
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Delete Account Section */}
          <div className='pt-8 border-t border-red-200'>
            <h4 className='text-lg font-medium mb-4 text-red-600'>Danger Zone</h4>
            <p className='text-sm text-gray-600 mb-4'>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button 
              onClick={openDeleteModal}
              className='bg-red-600 text-white px-8 py-3 text-sm hover:bg-red-700 border border-red-600'
            >
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <div className='flex items-center mb-4'>
              <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3'>
                <svg className='w-6 h-6 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-900'>Delete Account</h3>
            </div>
            
            <p className='text-gray-600 mb-6'>
              Are you sure you want to delete your account? This action cannot be undone and you will lose all your data including:
            </p>
            
            <ul className='text-sm text-gray-600 mb-6 list-disc list-inside space-y-1'>
              <li>Your profile information</li>
              <li>Order history</li>
              <li>Cart items</li>
            </ul>
            
            <div className='flex justify-end space-x-3'>
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]'
              >
                {isDeleting ? (
                  <div className='flex items-center justify-center'>
                    <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                    Deleting...
                  </div>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile