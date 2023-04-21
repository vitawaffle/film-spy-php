import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Error } from 'pages';

const Router = () => (
  <Routes>
    <Route path="error" element={<Error />}>
      <Route path="not-found" element={<div />} />
    </Route>
    <Route path="home" element={<Home />} />
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="*" element={<Navigate to="/error/not-found" />} />
  </Routes>
);

export default Router;
