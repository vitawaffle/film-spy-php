import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { selectIsAuthenticated } from 'app-slice';
import { RoomsChannelListener } from 'features/room';
import { Layout } from 'features/ui';
import { useCheckAuthentication, useAppSelector } from 'hooks';
import Router from 'router';

const App = (): ReactElement => {
  const checkAuthentication = useCheckAuthentication();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated && <RoomsChannelListener />}
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
