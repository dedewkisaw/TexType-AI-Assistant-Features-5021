import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import ArtisticIcon from '../common/ArtisticIcon';
import CardNeumorphic from '../components/CardNeumorphic';
import { useAuth } from '../contexts/AuthContext';

const { FiUser, FiMail, FiLock, FiAlertCircle, FiLoader, FiCheckCircle } = FiIcons;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await register({ name, email, password });
      setSuccess(true);
      // Redirect to login after successful registration (with delay for success message)
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <CardNeumorphic className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 gradient-text">Create Account</h2>
            <p className="text-gray-400">Join TexType's AI-powered platform</p>
          </div>

          {error && (
            <div className="neumorphic-inset rounded-lg p-4 mb-6 flex items-start gap-3">
              <ArtisticIcon icon={FiAlertCircle} className="text-red-400 text-lg mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="card-glassmorphic rounded-lg p-4 mb-6 flex items-start gap-3">
              <ArtisticIcon icon={FiCheckCircle} className="text-green-400 text-lg mt-0.5" />
              <p className="text-green-300 text-sm">Registration successful! Redirecting to login...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArtisticIcon icon={FiUser} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full input-neumorphic py-3 pl-10 pr-3 placeholder-gray-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArtisticIcon icon={FiMail} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full input-neumorphic py-3 pl-10 pr-3 placeholder-gray-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArtisticIcon icon={FiLock} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full input-neumorphic py-3 pl-10 pr-3 placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArtisticIcon icon={FiLock} className="text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full input-neumorphic py-3 pl-10 pr-3 placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full btn-gradient text-white py-3 px-4 rounded-lg font-semibold flex justify-center items-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <ArtisticIcon icon={FiLoader} className="animate-spin mr-2" />
                  Creating account...
                </>
              ) : success ? (
                <>
                  <ArtisticIcon icon={FiCheckCircle} className="mr-2" />
                  Account created!
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardNeumorphic>
      </motion.div>
    </div>
  );
};

export default Register;