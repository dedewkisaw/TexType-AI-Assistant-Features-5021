import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import ArtisticIcon from '../common/ArtisticIcon';
import { useAuth } from '../contexts/AuthContext';
import CardNeumorphic from '../components/CardNeumorphic';

// Dashboard sub-pages
import TextGenerator from './dashboard/TextGenerator';
import ImageGenerator from './dashboard/ImageGenerator';
import LLMComparison from './dashboard/LLMComparison';
import EmailWriter from './dashboard/EmailWriter';
import Settings from './dashboard/Settings';

const { FiMenu, FiX, FiHome, FiUser, FiSettings, FiMessageSquare, FiImage, FiTrendingUp, FiMail, FiLogOut } = FiIcons;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/dashboard/text-generator', label: 'Text Generator', icon: FiMessageSquare },
    { path: '/dashboard/image-generator', label: 'Image Generator', icon: FiImage },
    { path: '/dashboard/llm-comparison', label: 'LLM Comparison', icon: FiTrendingUp },
    { path: '/dashboard/email-writer', label: 'Email Writer', icon: FiMail },
    { path: '/dashboard/settings', label: 'Settings', icon: FiSettings },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-16 left-4 z-40 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/5 backdrop-filter backdrop-blur-lg border border-white/10"
        >
          <ArtisticIcon icon={sidebarOpen ? FiX : FiMenu} className="text-white text-xl" animated />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 bottom-0 w-64 bg-black/30 backdrop-blur-lg border-r border-white/10 transition-transform duration-300 ease-in-out z-30 card-neumorphic ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-8 p-2 card-glassmorphic rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center glow-sm">
              <ArtisticIcon icon={FiUser} className="text-white text-lg" animated />
            </div>
            <div>
              <div className="text-white font-medium">{user?.name || 'User'}</div>
              <div className="text-gray-400 text-sm truncate">{user?.email || 'user@example.com'}</div>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-purple-500/20 text-white card-glassmorphic glow-sm'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <ArtisticIcon 
                  icon={item.icon} 
                  className="text-lg" 
                  animated={isActive(item.path)} 
                  glow={isActive(item.path)}
                />
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-5 rounded-full bg-gradient-to-b from-purple-400 to-pink-400 glow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <ArtisticIcon icon={FiLogOut} className="text-lg" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:pl-64 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/text-generator" element={<TextGenerator />} />
            <Route path="/image-generator" element={<ImageGenerator />} />
            <Route path="/llm-comparison" element={<LLMComparison />} />
            <Route path="/email-writer" element={<EmailWriter />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Dashboard home component
const DashboardHome = () => {
  const { user } = useAuth();
  
  const tools = [
    {
      path: '/dashboard/text-generator',
      title: 'Text Generator',
      description: 'Generate AI-powered text for any purpose',
      icon: FiIcons.FiMessageSquare,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      path: '/dashboard/image-generator',
      title: 'Image Generator',
      description: 'Create unique images with AI technology',
      icon: FiIcons.FiImage,
      color: 'from-purple-500 to-pink-600'
    },
    {
      path: '/dashboard/llm-comparison',
      title: 'LLM Comparison',
      description: 'Compare results from 20+ LLM models',
      icon: FiIcons.FiTrendingUp,
      color: 'from-green-500 to-teal-600'
    },
    {
      path: '/dashboard/email-writer',
      title: 'Email Writer',
      description: 'Write professional emails in seconds',
      icon: FiIcons.FiMail,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold text-white mb-2 gradient-text">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-gray-300">Explore the power of TexType's AI tools</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-neumorphic p-6"
        >
          <div className="text-4xl font-bold text-white mb-1">20+</div>
          <div className="text-gray-400">AI Models</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-neumorphic p-6"
        >
          <div className="text-4xl font-bold text-white mb-1">14+</div>
          <div className="text-gray-400">Languages</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-neumorphic p-6"
        >
          <div className="text-4xl font-bold text-white mb-1">100+</div>
          <div className="text-gray-400">Generations</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-neumorphic p-6"
        >
          <div className="text-4xl font-bold text-white mb-1">500MB</div>
          <div className="text-gray-400">Storage</div>
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            whileHover={{ y: -5 }}
            className="card-glassmorphic overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 icon-wrapper">
                <ArtisticIcon icon={tool.icon} className="text-white text-xl" animated glow />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
              <Link
                to={tool.path}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center"
              >
                Open Tool <ArtisticIcon icon={FiIcons.FiArrowRight} className="ml-2" size="sm" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;