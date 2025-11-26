import React, { createContext, useContext, useState } from 'react';

interface ErrorHandlerContextType {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  errorMessage: string;
  setErrorMessage: (value: string) => void;
}

const ErrorHandlerContext = createContext<ErrorHandlerContextType>({
  showModal: false,
  setShowModal: () => { },
  errorMessage: "",
  setErrorMessage: () => { },
});

export default function ErrorHandlerProvider(props: React.PropsWithChildren<{}>) {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <ErrorHandlerContext.Provider value={{ showModal, setShowModal, errorMessage, setErrorMessage }}>
      {props.children}
    </ErrorHandlerContext.Provider>
  );
};

export const useErrorHandlerContext = () => useContext(ErrorHandlerContext);