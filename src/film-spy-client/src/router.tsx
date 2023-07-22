import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthenticatedGuard, HasGameGuard, HasRoomGuard } from 'components/routing';
import { Home, Error, Login, Signin, Room, Game } from 'pages';
import { NotFoundError, UnauthorizedError } from 'pages/errors';

const Router = (): JSX.Element => (
  <Routes>
    <Route path="error" element={<Error />}>
      <Route path="not-found" element={<NotFoundError />} />
      <Route path="unauthorized" element={<UnauthorizedError />} />
    </Route>
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
    <Route path="signin" element={<Signin />} />
    <Route path="login" element={<Login />} />
    <Route path="home" element={<Home />} />
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="*" element={<Navigate to="/error/not-found" />} />
  </Routes>
);

export default Router;
