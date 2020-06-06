import React from 'react';
import { GlobalData } from './containers';
import { Footer, Navbar } from './components';

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
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
