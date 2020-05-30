import React from 'react';
import { GlobalData } from './containers';
import { Footer } from './components';

const App = () => {
  return (
    <>
      <header></header>
      <main>
        <GlobalData />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
