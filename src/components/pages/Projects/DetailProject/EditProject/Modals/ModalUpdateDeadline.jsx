import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { IconButton, Stack } from '@mui/material';
import Modal from '@/components/ui/Modal';
import { Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import DatePicker from '@/components/ui/Forms/DatePicker';

const ModalUpdateDeadline = ({ open, handleClose }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    // Handle the form submission logic here
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      title={'Perbarui Deadline Proyek'}
      sx={{
        minWidth: 400,
        maxWidth: 500,
      }}
    >
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            p: 2,
          }}
        >
          <DatePicker
            label="Pilih Tanggal Deadline"
            name="dueDate"
            control={control}
            sx={{
              width: '100%',
            }}
          />
        </Box>
        <Stack
          direction="row"
          spacing={1}
          p={2}
          justifyContent="flex-end"
          mt={3}
        >
          <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
            Simpan
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ mt: 2, ml: 1 }}
            color="primary"
          >
            Batal
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalUpdateDeadline;
