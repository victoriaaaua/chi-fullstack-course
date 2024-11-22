"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { doLoginThunk, UserState } from '@/store/slices/userSlice';
import LoginForm from './LoginForm'; 
import { RootState, AppDispatch } from '@/store/store';

const LoginPage: React.FC = () => {
  const loginState = useSelector((state: RootState) => state.user.state);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (loginState === UserState.loggedIn) {
        router.push('/home');
    }
  }, [loginState, router]);

  const handleLogin = (values: { username: string; password: string }) => {
    dispatch(doLoginThunk(values));
  };

  return (
    
  
      <LoginForm onSubmit={handleLogin} />

  );
};

export default LoginPage;



