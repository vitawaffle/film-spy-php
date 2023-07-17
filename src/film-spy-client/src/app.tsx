import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from 'features/ui';
import { useCheckAuthentication } from 'hooks';
import Router from 'router';

const App = (): JSX.Element => {
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
