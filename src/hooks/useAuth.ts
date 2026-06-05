import { useState } from 'react';
import { User } from '@/types';
import { getUsers, saveUsers, getCurrentUser, saveCurrentUser, clearCurrentUser } from '@/lib/storage';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentUser());

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      saveCurrentUser(user);
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const users = getUsers();
    if (users.find(u => u.email === email)) return false;
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    saveCurrentUser(newUser);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  return { currentUser, login, register, logout };
}
