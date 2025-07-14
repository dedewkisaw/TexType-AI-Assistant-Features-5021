import { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';

const { FiUser, FiMail, FiLock, FiSave, FiLoader, FiCheck, FiAlertCircle, FiBell, FiGlobe, FiShield, FiCreditCard } = FiIcons;

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Profile settings
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false
  });
  
  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'english'
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleNotificationChange = (setting) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting]
    });
  };
  
  const handleAppearanceChange = (setting, value) => {
    setAppearance({
      ...appearance,
      [setting]: value
    });
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Simulating API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        
        // Reset success message after a delay
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 1000);
      
      // Actual API call would be:
      // await userService.updateProfile(profile);
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile');
      setLoading(false);
    }
  };
  
  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Simulating API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        
        // Reset success message after a delay
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 1000);
      
      // Actual API call would be:
      // await userService.updateNotifications(notifications);
    } catch (err) {
      console.error('Notifications update error:', err);
      setLoading(false);
    }
  };
  
  const handleAppearanceSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Simulating API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        
        // Reset success message after a delay
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 1000);
      
      // Actual API call would be:
      // await userService.updateAppearance(appearance);
    } catch (err) {
      console.error('Appearance update error:', err);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-300">Manage your account preferences and settings</p>
      </div>
      
      {success && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <SafeIcon icon={FiCheck} className="text-green-400 text-lg mt-0.5" />
          <p className="text-green-300 text-sm">Settings saved successfully!</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <SafeIcon icon={FiAlertCircle} className="text-red-400 text-lg mt-0.5" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
      
      <div className="grid gap-8">
        {/* Profile Settings */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center mb-6">
            <SafeIcon icon={FiUser} className="text-purple-400 text-xl mr-3" />
            <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
          </div>
          
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-white mb-3">Change Password</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={profile.currentPassword}
                    onChange={handleProfileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={profile.newPassword}
                    onChange={handleProfileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={profile.confirmPassword}
                    onChange={handleProfileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSave} className="mr-2" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Notifications Settings */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center mb-6">
            <SafeIcon icon={FiBell} className="text-purple-400 text-xl mr-3" />
            <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
          </div>
          
          <form onSubmit={handleNotificationsSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div>
                  <h3 className="text-white font-medium">Email Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive notifications via email</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onChange={() => handleNotificationChange('emailNotifications')}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="emailNotifications"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                      notifications.emailNotifications ? 'bg-purple-500' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                        notifications.emailNotifications ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div>
                  <h3 className="text-white font-medium">Product Updates</h3>
                  <p className="text-gray-400 text-sm">Receive updates about new features</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="productUpdates"
                    checked={notifications.productUpdates}
                    onChange={() => handleNotificationChange('productUpdates')}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="productUpdates"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                      notifications.productUpdates ? 'bg-purple-500' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                        notifications.productUpdates ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div>
                  <h3 className="text-white font-medium">Security Alerts</h3>
                  <p className="text-gray-400 text-sm">Get notified about security events</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="securityAlerts"
                    checked={notifications.securityAlerts}
                    onChange={() => handleNotificationChange('securityAlerts')}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="securityAlerts"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                      notifications.securityAlerts ? 'bg-purple-500' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                        notifications.securityAlerts ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div>
                  <h3 className="text-white font-medium">Marketing Emails</h3>
                  <p className="text-gray-400 text-sm">Receive promotional content</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onChange={() => handleNotificationChange('marketingEmails')}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="marketingEmails"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                      notifications.marketingEmails ? 'bg-purple-500' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                        notifications.marketingEmails ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSave} className="mr-2" />
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Appearance Settings */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center mb-6">
            <SafeIcon icon={FiGlobe} className="text-purple-400 text-xl mr-3" />
            <h2 className="text-xl font-semibold text-white">Appearance & Language</h2>
          </div>
          
          <form onSubmit={handleAppearanceSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleAppearanceChange('theme', 'dark')}
                    className={`flex flex-col items-center p-3 rounded-lg border ${
                      appearance.theme === 'dark'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-full h-20 bg-gray-900 rounded-md mb-2 border border-white/5"></div>
                    <span className={appearance.theme === 'dark' ? 'text-white' : 'text-gray-300'}>Dark</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleAppearanceChange('theme', 'light')}
                    className={`flex flex-col items-center p-3 rounded-lg border ${
                      appearance.theme === 'light'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-full h-20 bg-gray-100 rounded-md mb-2 border border-gray-200"></div>
                    <span className={appearance.theme === 'light' ? 'text-white' : 'text-gray-300'}>Light</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={appearance.language}
                  onChange={(e) => handleAppearanceChange('language', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                  <option value="japanese">Japanese</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSave} className="mr-2" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;