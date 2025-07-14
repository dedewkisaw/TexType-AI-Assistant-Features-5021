import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiMenu, FiX, FiHome, FiUser, FiLogIn, FiLogOut, FiLayout } = FiIcons;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { to: '/', label: 'Home', icon: FiHome },
    ...(user 
      ? [
          { to: '/dashboard', label: 'Dashboard', icon: FiLayout },
          { action: handleLogout, label: 'Logout', icon: FiLogOut }
        ] 
      : [
          { to: '/login', label: 'Login', icon: FiLogIn },
          { to: '/register', label: 'Register', icon: FiUser }
        ]
    )
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiIcons.FiZap} className="text-white text-sm" />
              </div>
              <span className="text-2xl font-bold text-white">TexType</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              item.to ? (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center space-x-2 transition-colors ${
                    isActive(item.to) ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </button>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/40 backdrop-blur-lg border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item, index) => (
              item.to ? (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center space-x-2 transition-colors ${
                    isActive(item.to) ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    closeMenu();
                  }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </button>
              )
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;