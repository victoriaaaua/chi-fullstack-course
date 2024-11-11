import React, { createContext, useContext, useState } from 'react';

interface PageContextType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};
