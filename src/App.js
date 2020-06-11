import React, { Suspense } from 'react';
import { GlobalData } from './containers';
import { Footer, Navbar } from './components';
import { suspenseFetchDailyReports } from './api/suspenseApi';
import { ErrorBoundary } from './components/';

const resource = suspenseFetchDailyReports();

const App = () => (
  <>
    <header>
      <Navbar />
    </header>
    <main>
      <Suspense fallback={<h2>Loooaaadinggg......</h2>}>
        <ErrorBoundary>
          <GlobalData resource={resource} />
        </ErrorBoundary>
      </Suspense>
    </main>
    <footer>
      <Footer />
    </footer>
  </>
);

export default App;
