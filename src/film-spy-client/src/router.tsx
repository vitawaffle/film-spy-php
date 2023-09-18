import React from 'react';
import type { ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import {
  AuthenticatedGuard,
  HasGameGuard,
  HasRoomGuard,
  UnauthenticatedGuard,
} from 'components/routing';
import {
  Error,
  Game,
  Home,
  Login,
  Room,
  Rooms,
  Signup,
} from 'pages';
import {
  NotFoundError,
  UnauthorizedError,
} from 'pages/errors';

const Router = (): ReactElement => (
  <Routes>
    <Route path="error" element={<Error />}>
      <Route path="not-found" element={<NotFoundError />} />
      <Route path="unauthorized" element={<UnauthorizedError />} />
    </Route>
    <Route path="rooms" element={(
      <AuthenticatedGuard>
        <Rooms />
      </AuthenticatedGuard>
    )} />
    <Route path="room" element={(
      <AuthenticatedGuard>
        <HasRoomGuard>
          <Room />
        </HasRoomGuard>
      </AuthenticatedGuard>
    )} />
    <Route path="game" element={(
      <AuthenticatedGuard>
        <HasGameGuard>
          <Game />
        </HasGameGuard>
      </AuthenticatedGuard>
    )} />
    <Route path="signup" element={(
      <UnauthenticatedGuard>
        <Signup />
      </UnauthenticatedGuard>
    )} />
    <Route path="login" element={(
      <UnauthenticatedGuard>
        <Login />
      </UnauthenticatedGuard>
    )} />
    <Route path="home" element={<Home />} />
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="*" element={<Navigate to="/error/not-found" />} />
  </Routes>
);

export default Router;
