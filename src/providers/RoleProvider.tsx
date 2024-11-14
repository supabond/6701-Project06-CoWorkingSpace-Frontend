'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RoleContextType {
  roleColor: string;
  setRoleColor: (color: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roleColor, setRoleColor] = useState<string>('blue-700');

  return (
    <RoleContext.Provider value={{ roleColor, setRoleColor }}>
      {children}
    </RoleContext.Provider>
  );
};
