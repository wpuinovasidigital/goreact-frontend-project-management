import TextField from '@/components/ui/Forms/TextField';
import Modal from '@/components/ui/Modal';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePicker from '@/components/ui/Forms/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import services from '@/services';
import datetime from '@/utils/datetime';
import { useSnackbar } from '@/components/ui/Snackbar';

const addNewProjectSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  due_date: Yup.string().required(),
});

const ModalAddNewProject = ({ open, handleClose }) => {
  const [isLoading, setLoading] = useState(false);
  const snackbar = useSnackbar();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      due_date: dayjs(),
    },
    resolver: yupResolver(addNewProjectSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    await services.boards.create({
      ...values,
      due_date: datetime.getIsoString(values.due_date),
    });
    snackbar.toggleSnackbar(true, 'Berhasil membuat proyek baru!');
    handleReset();
  };

  const handleReset = () => {
    setLoading(false);
    reset();
    handleClose();
  };

  const renderForm = () => {
    return (
      <Stack
        sx={{
          p: 2,
        }}
      >
        <TextField label="Nama proyek" name="title" control={control} />
        <TextField
          label="Deskripsi"
          name="description"
          control={control}
          multiline
          rows={4}
        />
        <DatePicker
          control={control}
          label={'Deadline proyek'}
          name="due_date"
          minDate={dayjs()}
        />
        <Stack
          gap={1}
          direction={'row'}
          justifyContent={'flex-end'}
          alignItems={'center'}
        >
          <Button type="submit" variant="contained">
            Buat baru
          </Button>
          <Button type="button" variant="outlined" onClick={handleClose}>
            Batalkan
          </Button>
        </Stack>
      </Stack>
    );
  };

  const renderLoading = () => {
    return (
      <Stack justifyContent={'center'} alignItems={'center'} height={300}>
        <CircularProgress />
      </Stack>
    );
  };

  return (
    <Modal
      open={open}
      handleClose={!isLoading && handleClose}
      title="Buat proyek baru"
      sx={{
        minWidth: 400,
        maxWidth: 500,
      }}
    >
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? renderLoading() : renderForm()}
      </Box>
    </Modal>
  );
};

export default ModalAddNewProject;
