import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { getCurrentUser, setCurrentUser, loginUser, registerUser, generateId } from '@/lib/storage';

export function useAuth() {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUserState(user);
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const user = loginUser(email, password);
    if (user) {
      setCurrentUser(user);
      setCurrentUserState(user);
      return true;
    }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, password: string, role: User['role']): boolean => {
    const user: User = {
      id: generateId(),
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };
    const success = registerUser(user, password);
    if (success) {
      setCurrentUser(user);
      setCurrentUserState(user);
    }
    return success;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentUserState(null);
  }, []);

  return { currentUser, loading, login, register, logout };
}
