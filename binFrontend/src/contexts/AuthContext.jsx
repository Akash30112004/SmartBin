import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { login_request } from '../services/auth.service';
=======
import api from '../services/api';
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load token and user from localStorage on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
<<<<<<< HEAD
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
=======
      setUser(JSON.parse(storedUser));
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
    }
    setLoading(false);
  }, []);

<<<<<<< HEAD
  const login = async (email, password) => {
    try {
      const response = await login_request({ email, password });
      const login_data = response?.data;

      if (!login_data?.token || !login_data?.user) {
        return { success: false, error: 'Invalid login response from server.' };
      }

      localStorage.setItem('token', login_data.token);
      localStorage.setItem('user', JSON.stringify(login_data.user));

      setToken(login_data.token);
      setUser(login_data.user);
=======
  const login = async (username, password) => {
    try {
      // Mock login - replace with actual API call
      // const response = await api.post('/auth/login', { username, password });
      
      // Mock response
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = { 
        id: 1, 
        username, 
        name: username.charAt(0).toUpperCase() + username.slice(1),
        role: 'admin' 
      };

      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setToken(mockToken);
      setUser(mockUser);
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
      
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
<<<<<<< HEAD
      return { success: false, error: error.message || 'Login failed. Please try again.' };
=======
      console.error('Login failed:', error);
      return { success: false, error: error.message };
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
