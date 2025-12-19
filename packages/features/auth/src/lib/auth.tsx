import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ApiResponse } from '@react-demo/types';
import { apiClient } from '@react-demo/api-client';
import { userService } from '@react-demo/user-management';
import { Button, Input, Card, Loading } from '@react-demo/ui-components';
import styles from './auth.module.css';

// ============================================================================
// Auth Types
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ============================================================================
// Auth Context
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        apiClient.setAuthToken(token);
        try {
          const currentUser = await userService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          // Token invalid, clear it
          localStorage.removeItem('authToken');
          apiClient.clearAuthToken();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<ApiResponse<{ user: User; token: string }>>(
        '/auth/login',
        credentials
      );

      const { user, token } = response.data;
      localStorage.setItem('authToken', token);
      apiClient.setAuthToken(token);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<ApiResponse<{ user: User; token: string }>>(
        '/auth/register',
        data
      );

      const { user, token } = response.data;
      localStorage.setItem('authToken', token);
      apiClient.setAuthToken(token);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiClient.post('/auth/logout', {});
    } finally {
      localStorage.removeItem('authToken');
      apiClient.clearAuthToken();
      setUser(null);
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!user) return;

    try {
      const currentUser = await userService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      // If refresh fails, logout
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================================================
// Auth Hook
// ============================================================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ============================================================================
// Login Form Component
// ============================================================================

export interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}

export function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <Card className={styles['auth-card']}>
      <h2 className={styles['auth-title']}>Login</h2>
      <form onSubmit={handleSubmit} className={styles['auth-form']}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        {error && <div className={styles['error']}>{error}</div>}
        <Button type="submit" disabled={isLoading} fullWidth>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        {onRegisterClick && (
          <Button variant="outline" onClick={onRegisterClick} fullWidth>
            Create Account
          </Button>
        )}
      </form>
    </Card>
  );
}

// ============================================================================
// Register Form Component
// ============================================================================

export interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

export function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className={styles['auth-card']}>
      <h2 className={styles['auth-title']}>Create Account</h2>
      <form onSubmit={handleSubmit} className={styles['auth-form']}>
        <Input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
          disabled={isLoading}
          required
        />
        {error && <div className={styles['error']}>{error}</div>}
        <Button type="submit" disabled={isLoading} fullWidth>
          {isLoading ? 'Creating Account...' : 'Register'}
        </Button>
        {onLoginClick && (
          <Button variant="outline" onClick={onLoginClick} fullWidth>
            Already have an account? Login
          </Button>
        )}
      </form>
    </Card>
  );
}

// ============================================================================
// Protected Route Component
// ============================================================================

export interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (!isAuthenticated) {
    return <>{fallback || <LoginForm />}</>;
  }

  return <>{children}</>;
}

export default AuthProvider;
