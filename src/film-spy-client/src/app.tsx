import React, { useEffect } from 'react';

import { Router } from './components';
import { useCheckAuthentication } from './features/auth';
import { Layout } from './features/ui';

const App = (): React.ReactElement => {
  const checkAuthentication = useCheckAuthentication();

  useEffect(() => {
    void checkAuthentication();
  }, []);

  return (
    <Layout>
      <Router />
    </Layout>
  );
};

export default App;
