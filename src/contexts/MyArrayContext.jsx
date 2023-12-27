// MyArrayContext.jsx

import React, { createContext, useContext, useState } from 'react';

const MyArrayContext = createContext();

export const MyArrayContextProvider = ({ children }) => {
  const [myArray, setMyArray] = useState([]);

  const addElementToMyArray = (element) => {
    setMyArray((prevArray) => [...prevArray, element]);
  };

  const removeElementFromMyArray = (element) => {
    setMyArray((prevArray) => prevArray.filter((item) => item !== element));
  };

  const toggleElementInMyArray = (element) => {
    setMyArray((prevArray) => {
      if (prevArray.includes(element)) {
        // Remove the element
        return prevArray.filter((item) => item !== element);
      } else {
        // Add the element
        return [...prevArray, element];
      }
    });
  };

  return (
    <MyArrayContext.Provider
      value={{
        myArray,
        addElementToMyArray,
        removeElementFromMyArray,
        toggleElementInMyArray,
      }}
    >
      {children}
    </MyArrayContext.Provider>
  );
};

export const useMyArrayContext = () => {
  return useContext(MyArrayContext);
};
