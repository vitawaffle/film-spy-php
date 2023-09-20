import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './components';
import { useCheckAuthentication } from './features/auth';
import { Layout } from './features/ui';

const App = (): React.ReactElement => {
  const checkAuthentication = useCheckAuthentication();

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
