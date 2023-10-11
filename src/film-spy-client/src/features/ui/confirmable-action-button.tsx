import React, { useState } from 'react';
import { Button, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import Dialog from './dialog';
import type { ChildrenProps } from 'props';

export type ConfirmableActionButtonProps = ChildrenProps & {
  id: string,
  title: string,
  component?: 'button' | 'list-item',
  variant?: 'text' | 'outlined' | 'contained',
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  icon?: React.ReactNode,
  action: () => Promise<void>,
};

const ConfirmableActionButton = ({
  children,
  id,
  title,
  component,
  variant,
  color,
  icon,
  action,
}: ConfirmableActionButtonProps): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (): void => {
    setIsDialogOpen(true);
  };

  const handleOk = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await action();
      setIsDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog =(): void => {
    setIsDialogOpen(false);
  };

  const buttonColor = color ?? 'primary';
  const _component = component ?? 'button';

  return (
    <>
      <Dialog
        isOpen={isDialogOpen}
        id={id}
        title={`${title}?`}
        onOk={handleOk}
        onCancel={closeDialog}
        onClose={closeDialog}
        isLoading={isLoading}
        okButtonColor={buttonColor}
      />
      {_component === 'button' && (
        <Button onClick={handleClick} variant={variant ?? 'contained'} color={buttonColor}>
          {children}
        </Button>
      )}
      {component === 'list-item' && (
        <ListItemButton onClick={handleClick} sx={{ pl: 4 }}>
          {icon && (
            <ListItemIcon>
              {icon}
            </ListItemIcon>
          )}
          <ListItemText primary={children} />
        </ListItemButton>
      )}
    </>
  );
};

export default ConfirmableActionButton;
