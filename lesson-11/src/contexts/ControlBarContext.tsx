'use client'

import React, { createContext, useState, useContext } from 'react';
import ControlBar from '../components/ControlBar';
import { SelectChangeEvent } from '@mui/material';
interface ControlBarContextProps {
  isSortedByDateDescending: boolean;
  setIsSortedByDateDescending: (value: boolean) => void;
  isShowMyPosts: boolean;
  setIsShowMyPosts: (value: boolean) => void;
  handleSelectChange?: (event: SelectChangeEvent<string>) => void; 
  handleSort: () => void;
}

const ControlBarContext = createContext<ControlBarContextProps | undefined>(undefined);

export const ControlBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSortedByDateDescending, setIsSortedByDateDescending] = useState(true);
    const [isShowMyPosts, setIsShowMyPosts] = useState(false);
  
    const handleSort = () => {
      setIsSortedByDateDescending(!isSortedByDateDescending);
    };
  
    const handleSelectChange = (event: SelectChangeEvent) => {
      const newValue = event.target.value === 'myPosts';
      setIsShowMyPosts(newValue);
    };
  
    return (
      <ControlBarContext.Provider
        value={{
          isSortedByDateDescending,
          setIsSortedByDateDescending,
          isShowMyPosts,
          setIsShowMyPosts,
          handleSort,
          handleSelectChange,
        }}
      >
        <ControlBar /> 
        {children}
      </ControlBarContext.Provider>
    );
  };
  

export const useControlBar = () => {
  const context = useContext(ControlBarContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};
