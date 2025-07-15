// Mock authentication service for demo purposes
// This simulates API calls with localStorage for persistence

const MOCK_USERS_KEY = 'textype_mock_users';
const CURRENT_USER_KEY = 'textype_current_user';
const AUTH_TOKEN_KEY = 'authToken';

// Initialize mock users if not exists
if (!localStorage.getItem(MOCK_USERS_KEY)) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([
    {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123' // In a real app, this would be hashed
    }
  ]));
}

export const authService = {
  async login(credentials) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const user = users.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Create a mock token
    const token = `mock-jwt-token-${Date.now()}`;
    
    // Store the token
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    
    // Store the current user (without password)
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return {
      user: userWithoutPassword,
      token
    };
  },
  
  async register(userData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser = {
      id: `${users.length + 1}`,
      ...userData
    };
    
    // Save to mock storage
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([...users, newUser]));
    
    return { success: true };
  },
  
  async logout() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove auth data
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    
    return { success: true };
  },
  
  async getCurrentUser() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    if (!userJson) {
      return null;
    }
    
    return JSON.parse(userJson);
  }
};