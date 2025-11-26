import React, { createContext, useContext, useState, ReactNode } from 'react';
import CustomLoading from '../components/CustomLoading/CustomLoading';

interface LoadingContextType {
  setIsLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
    setIsLoading: (value: boolean) => {}
});


export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {children}
      {isLoading && (
        <CustomLoading />
      )}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);