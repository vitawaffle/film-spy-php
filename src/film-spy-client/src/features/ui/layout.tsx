import React from 'react';
import type { ReactElement } from 'react';

import { DrawerWithAppBar } from 'features/ui';
import type { ChildrenProps } from 'props';

const Layout = ({ children }: ChildrenProps): ReactElement => (
  <DrawerWithAppBar>
    {children}
  </DrawerWithAppBar>
);

export default Layout;
