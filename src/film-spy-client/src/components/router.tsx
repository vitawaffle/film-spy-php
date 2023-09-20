import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Error, Home, Login, Register } from 'pages';
import { NotFoundError } from 'pages/errors';

const Router = (): React.ReactElement => (
  <Routes>
    <Route path="errors" element={<Error />}>
      <Route path="not-found" element={<NotFoundError />} />
    </Route>
    <Route path="home" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="*" element={<Navigate to="/errors/not-found" />} />
  </Routes>
);

export default Router;
