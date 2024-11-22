'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import { io } from 'socket.io-client';
import { useRefresh } from './RefreshPageContext';
import { useSearchParams } from 'next/navigation';

const SOCKET_SERVER_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com:3000/notifications';

interface Notification {
  data: string;
  user: string;
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: boolean;
  setShowNotification: (value: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const { refreshPage } = useRefresh();

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    socket.on('newPost', (data) => {
      setNotification({ data: data.message, user: data.user });
      setShowNotification(true);
      console.log("page", page);
      if (page === '1') {
        refreshPage();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [page]);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, setShowNotification }}>
      {children}
      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={() => setShowNotification(false)}
        message={`${notification?.user} added new post: ${notification?.data}`}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('NotificationProvider must be used within its context.');
  }
  return context;
};
