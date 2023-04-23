import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Error, Login, Signin } from 'pages';
import { NotFoundError } from 'pages/errors';

const Router = () => (
  <Routes>
    <Route path="error" element={<Error />}>
      <Route path="not-found" element={<NotFoundError />} />
    </Route>
    <Route path="signin" element={<Signin />} />
    <Route path="login" element={<Login />} />
    <Route path="home" element={<Home />} />
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="*" element={<Navigate to="/error/not-found" />} />
  </Routes>
);

export default Router;
