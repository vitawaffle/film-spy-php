import React from 'react';
import { ChildrenProps } from 'props';
import { DrawerWithAppBar } from 'features/ui';

const Layout = ({ children }: ChildrenProps) => (
  <DrawerWithAppBar>
    {children}
  </DrawerWithAppBar>
);

export default Layout;
