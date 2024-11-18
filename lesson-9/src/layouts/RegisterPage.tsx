import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doRegisterThunk } from '../store/slices/userSlice';
import RegisterForm from '../components/RegisterForm';
import ControlBar from '../components/ControlBar';
import { AppDispatch } from '../store/store';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async (values: { username: string, password: string }) => {
    try {
      await dispatch(doRegisterThunk(values)).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <RegisterForm onSubmit={handleRegister} />
    </>
  );
};

export default RegisterPage;
