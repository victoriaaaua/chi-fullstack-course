"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserState } from '../store/slices/userSlice';

interface ProtectedRouteProps {
  children: JSX.Element;
  isAllowed: UserState;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAllowed }) => {
  const router = useRouter();

  useEffect(() => {
    if (isAllowed !== UserState.loggedIn) {
      router.push('/login');
    }
  }, [isAllowed, router]);

  if (isAllowed !== UserState.loggedIn) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
