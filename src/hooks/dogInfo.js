import React, { createContext, useState, useContext } from 'react';

const DogContext = createContext({});

const DogInfoProvider = ({ children }) => {
  const [dogName, setDogName] = useState(() => localStorage.getItem('@doggo:dogName'));
  const [dogBreed, setDogBreed] = useState(() => localStorage.getItem('@doggo:dogBreed') || '');
  const [dogImage, setDogImage] = useState(() => localStorage.getItem('@doggo:dogImage'));
  const [textColor, setTextColor] = useState(() => localStorage.getItem('@doggo:textColor') || '#edf2f4');
  const [font, setFont] = useState(() => localStorage.getItem('@doggo:font'));

  return(
    <DogContext.Provider value={
      { dogName, dogBreed, dogImage, textColor, font, setDogName, setDogBreed, setDogImage, setTextColor, setFont }
    }>
      {children}
    </DogContext.Provider>
  )
}

function useDogInfo() {
  const context = useContext(DogContext);

  if (!context) {
    throw new Error('useDogInfo must be within a DogInfoProvider');
  }

  return context;
}

export { DogInfoProvider, useDogInfo };
