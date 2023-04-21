import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'router';
import { Layout } from 'features/ui';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Router />
    </Layout>
  </BrowserRouter>
);

export default App;
