import React, { Suspense } from 'react';
import { GlobalData } from './containers';
import { Footer, Titlebar, Spinner } from './components';
import { suspenseFetchDailyReports } from './api/suspenseApi';
import { ErrorBoundary } from './components/';
import classes from './App.module.css';

const resource = suspenseFetchDailyReports();

const App = () => {
  return (
    <div className={classes.Container}>
      <header>
        <Titlebar />
      </header>
      <Suspense fallback={<Spinner />}>
        <main>
          <ErrorBoundary>
            <GlobalData resource={resource} />
          </ErrorBoundary>
        </main>
        <footer>
          <Footer />
        </footer>
      </Suspense>
    </div>
  );
};

export default App;
