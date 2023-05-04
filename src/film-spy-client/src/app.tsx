import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'router';
import { Layout } from 'features/ui';
import { useCheckAuthentication } from 'hooks';

const App = () => {
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
