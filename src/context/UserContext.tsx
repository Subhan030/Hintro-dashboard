import React, { createContext, useContext, useState } from 'react';

export type UserId = 'u1' | 'u2';

interface UserContextType {
  userId: UserId;
  setUserId: (id: UserId) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserIdState] = useState<UserId>(() => {
    const saved = localStorage.getItem('userId');
    return (saved === 'u1' || saved === 'u2') ? saved : 'u1';
  });

  const setUserId = (id: UserId) => {
    setUserIdState(id);
    localStorage.setItem('userId', id);
    console.log('User switched to:', id);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
