import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Authenticated } from 'components/guards';
import { Error, Home, Login, Register, Rooms } from 'pages';
import { NotFoundError } from 'pages/errors';

const Router = (): React.ReactElement => (
  <Routes>
    <Route path="errors" element={<Error />}>
      <Route path="not-found" element={<NotFoundError />} />
    </Route>
    <Route path="home" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
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
