import React from 'react';

import Header from './header';
import type { ChildrenProps } from 'props';

const Layout = ({ children }: ChildrenProps): React.ReactElement => (
  <Header>
    {children}
  </Header>
);

export default Layout;
