import { Snackbar } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

const defaultState = {
  open: false,
  message: '',
  toggleSnackbar() {},
};

export const SnackbarContext = createContext(defaultState);

const SnackbarProvider = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
  }); 

  const toggleSnackbar = (toggle, message = '') => {
    setSnackbarData({
      open: toggle,
      message,
    });
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarData({
      open: false,
      message: '',
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarData,
        toggleSnackbar,
      }}
    >
      {children}
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
        message={snackbarData.message}
        open={snackbarData.open}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
