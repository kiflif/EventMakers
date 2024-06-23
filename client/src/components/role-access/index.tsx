import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';

interface ProtectedComponentProps {
  roles: string[];
  children: ReactNode;
}

interface User {
  role: string;
  // добавьте здесь другие поля, если необходимо
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ roles, children }) => {
  const user = useSelector(selectUser) as User | null;

  if (!user || !roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedComponent;
