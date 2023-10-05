import React, { useEffect } from 'react';

import { Router } from './components';
import { selectIsAuthenticated, selectIsEmailVerified, useCheckAuthentication } from './features/auth';
import { RoomsChannelListener, useLoadRooms } from './features/rooms';
import { Layout } from './features/ui';
import { useSelector } from './store';

const App = (): React.ReactElement => {
  const checkAuthentication = useCheckAuthentication();

  useEffect(() => {
    void checkAuthentication();
  }, []);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isEmailVerified = useSelector(selectIsEmailVerified);
  const loadRooms = useLoadRooms();

  useEffect(() => {
    if (isAuthenticated && isEmailVerified)
      void loadRooms();
  }, [isAuthenticated, isEmailVerified]);

  return (
    <>
      {isAuthenticated && isEmailVerified && <RoomsChannelListener />}
      <Layout>
        <Router />
      </Layout>
    </>
  );
};

export default App;
