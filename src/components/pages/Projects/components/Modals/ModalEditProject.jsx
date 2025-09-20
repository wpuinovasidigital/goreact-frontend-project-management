
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useRevalidator } from 'react-router';
import * as Yup from 'yup';

import useDetailProjectContext from '../DetailProject/hooks/useDetailProjectContext';

import DatePicker from '@/components/ui/Forms/DatePicker';
import TextField from '@/components/ui/Forms/TextField';
import Modal from '@/components/ui/Modal';
import { useSnackbar } from '@/components/ui/Snackbar';
import services from '@/services';
import datetime from '@/utils/datetime';

const addNewProjectSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  due_date: Yup.string().required(),
});

const ModalEditProject = () => {
  const { revalidate } = useRevalidator();
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const [isLoading, setLoading] = useState(false);

  const snackbar = useSnackbar();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: detailProjectData.title || '',
      description: detailProjectData.description || '',
      due_date: dayjs(detailProjectData.due_date) || dayjs(),
    },
    resolver: yupResolver(addNewProjectSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    await services.boards.update(detailProjectData.public_id, {
      ...values,
      due_date: datetime.getIsoString(values.due_date),
    });

    snackbar.toggleSnackbar(true, 'Berhasil mengubah proyek !');

    setLoading(false);
    reset();
    handleClose();
  };

  const renderLoading = () => {
    return (
      <Stack justifyContent={'center'} alignItems={'center'} height={300}>
        <CircularProgress />
      </Stack>
    );
  };
  const renderForm = () => {
    return (
      <Stack
        sx={{
          padding: 2,
        }}
      >
        <TextField control={control} label={'Nama proyek'} name="title" />
        <TextField
          control={control}
          label={'Deskripsi'}
          name="description"
          multiline
          rows={5}
        />
        <DatePicker
          control={control}
          label={'Deadline proyek'}
          name="due_date"
          minDate={dayjs()}
        />
        <Stack
          direction={'row'}
          gap={1}
          justifyContent={'flex-end'}
          alignItems={'center'}
        >
          <Button type="submit" variant="contained">
            Simpan
          </Button>
          <Button type="button" variant="outlined" onClick={handleClose}>
            Batalkan
          </Button>
        </Stack>
      </Stack>
    );
  };

  const handleClose = async () => {
    detailProjectContext.setIsOpenModalEditProject(false);
    await revalidate();
  };

  return (
    <Modal
      open={detailProjectContext.isOpenModalEditProject}
      handleClose={handleClose}
      title={'Edit proyek'}
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

export default ModalEditProject;
