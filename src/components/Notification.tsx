import React from 'react';

import { Alert, AlertTitle, Snackbar } from '@mui/material';

type NotificationProps = {
  open: boolean;
  onClose: () => void;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
};

const Notification: React.FC<NotificationProps> = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} data-testid="notification">
      <Alert severity={severity} onClose={onClose}>
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export default Notification;
