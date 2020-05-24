import React from 'react';

import { DogInfoProvider } from './dogInfo';

const AppProvider = ({ children }) => (
  <DogInfoProvider>
    {children}
  </DogInfoProvider>
);

export default AppProvider;
