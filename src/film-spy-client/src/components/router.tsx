import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Authenticated, HasRoom } from 'components/guards';
import { Error, Home, Login, Register, Room, Rooms } from 'pages';
import { Forbidden, NotFound } from 'pages/errors';

const Router = (): React.ReactElement => (
  <Routes>
    <Route path="errors" element={<Error />}>
      <Route path="forbidden" element={<Forbidden />} />
      <Route path="not-found" element={<NotFound />} />
    </Route>
    <Route path="home" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="rooms/:id" element={(
      <Authenticated>
        <HasRoom>
          <Room />
        </HasRoom>
      </Authenticated>
    )} />
    <Route path="rooms" element={(
      <Authenticated>
        <Rooms />
      </Authenticated>
    )} />
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="*" element={<Navigate to="/errors/not-found" />} />
  </Routes>
);

export default Router;
