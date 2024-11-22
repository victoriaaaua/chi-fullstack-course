'use client'

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';


const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
