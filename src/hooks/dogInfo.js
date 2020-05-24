import React, { createContext, useState, useContext } from 'react';

const DogContext = createContext({});

const DogInfoProvider = ({ children }) => {
  const [dogName, setDogName] = useState(() => {
    const storaged = localStorage.getItem('@doggo:dogName');

    if(storaged) {
      return storaged;
    }

    return 'Default';
  });

  const [dogBreed, setDogBreed] = useState(() => {
    const storaged = localStorage.getItem('@doggo:dogBreed');

    if(storaged) {
      return storaged;
    }

    return 'vira-lata';
  });

  const [dogImage, setDogImage] = useState(() => {
    const storaged = localStorage.getItem('@doggo:dogImage');

    if(storaged) {
      return storaged;
    }
  });

  const [textColor, setTextColor] = useState(() => {
    const storaged = localStorage.getItem('@doggo:textColor');

    if(storaged) {
      return storaged;
    }

    return '#fff';
  });

  const [font, setFont] = useState(() => {
    const storaged = localStorage.getItem('@doggo:font');

    if(storaged) {
      return storaged;
    }

    return 'Roboto Slab';
  });

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
