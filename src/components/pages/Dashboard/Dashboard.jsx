import { Box, Button } from '@mui/material';
import { useState } from 'react';

import Modal from '../../ui/Modal';

const Dashboard = () => {
  const [openModal, setOpenModal] = useState();

  const handleClose = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <Box>
      <Button type="button" variant="contained" onClick={handleOpenModal}>
        Open Modal
      </Button>
      <Modal open={openModal} handleClose={handleClose} title={'Judul Modal'}>
        <Box
          sx={{
            padding: 2,
            width: 500
          }}
        >
          Isi Modal
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
