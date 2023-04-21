import React from 'react';
import { ErrorLayout } from 'features/ui';

const NotFoundError = () => (
  <ErrorLayout code={404} name="Not Found" description="">
  </ErrorLayout>
);

export default NotFoundError;
