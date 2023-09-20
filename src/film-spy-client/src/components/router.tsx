import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from 'pages';

const Router = (): React.ReactElement => (
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="*" element={<Navigate to="/errors/not-found" />} />
  </Routes>
);

export default Router;
