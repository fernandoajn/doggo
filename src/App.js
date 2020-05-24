import React from 'react';

import AppProvider from './hooks';

import Header from './components/Header.js';
import Container from './components/Container.js';
import Credits from './components/Credits.js';

function App() {
  return (
    <div className="App">
      <Header />
        <AppProvider>
          <Container />
        </AppProvider>
      <Credits />
    </div>
  );
}

export default App;
