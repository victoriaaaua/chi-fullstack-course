import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface RefreshPageType {
  change: boolean;
  refreshPage: () => void;
}

interface FeedProviderProps {
  children: ReactNode; 
}

const RefreshPageContext = createContext<RefreshPageType | undefined>(undefined);

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
  const [change, setChange] = useState(false);

  const refreshPage = useCallback(() => {
    setChange((prev) => !prev);
  }, []);

  return (
    <RefreshPageContext.Provider value={{ change, refreshPage }}>
      {children}
    </RefreshPageContext.Provider>
  );
};

export const useRefresh = (): RefreshPageType => {
  const context = useContext(RefreshPageContext);
  if (!context) {
    throw new Error('Error!!!');
  }
  return context;
};
