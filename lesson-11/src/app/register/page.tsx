"use client"

import React from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { doRegisterThunk } from "@/store/slices/userSlice";
import RegisterForm from "./RegisterForm";
import { AppDispatch } from "@/store/store";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  const handleRegister = async (values: { username: string, password: string }) => {
    try {
      await dispatch(doRegisterThunk(values)).unwrap();
      router.push('/login');
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
