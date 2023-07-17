import React from 'react';

import { DrawerWithAppBar } from 'features/ui';
import type { ChildrenProps } from 'props';

const Layout = ({ children }: ChildrenProps): JSX.Element => (
  <DrawerWithAppBar>
    {children}
  </DrawerWithAppBar>
);

export default Layout;
