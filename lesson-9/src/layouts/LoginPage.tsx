import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLoginThunk, UserState } from '../store/slices/userSlice';
import LoginForm from '../components/LoginForm'; 
import ControlBar from '../components/ControlBar';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';

const LoginPage: React.FC = () => {
  const loginState = useSelector((state: RootState) => state.user.state);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (loginState === UserState.loggedIn) {
      navigate('/home');
    }
  }, [loginState, navigate]);

  const handleLogin = (values: { username: string; password: string }) => {
    dispatch(doLoginThunk(values));
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;

