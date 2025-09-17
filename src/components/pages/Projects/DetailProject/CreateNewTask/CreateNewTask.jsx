import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from '@/components/ui/Forms/TextField';
import { useState } from 'react';
import services from '@/services';

const createNewTaskSchema = Yup.object({
  title: Yup.string().required(),
});

const CreateNewTask = ({ listId, onSuccess }) => {
  const [isLoading, setLoading] = useState(false);
  const [isShowFormCreateNewTask, setShowFormCreateNewTask] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(createNewTaskSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    await services.cards.create({
      ...values,
      list_id: listId,
    });
    setLoading(false);
    reset();
    handleCloseFormCreateNewTask();
    onSuccess();
  };

  const handleOpenFormCreateNewTask = () => setShowFormCreateNewTask(true);
  const handleCloseFormCreateNewTask = () => setShowFormCreateNewTask(false);

  return (
    <>
      {isShowFormCreateNewTask ? (
        <Box p={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            control={control}
            name={'title'}
            label={'Nama tugas'}
            rows={1}
            fullWidth
          />
          <Stack direction={'row'} gap={1} justifyContent={'flex-end'}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={isLoading}
              loading={isLoading}
            >
              Simpan
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={handleCloseFormCreateNewTask}
              disabled={isLoading}
            >
              Batal
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box p={2}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleOpenFormCreateNewTask}
          >
            Buat tugas baru
          </Button>
        </Box>
      )}
    </>
  );
};

export default CreateNewTask;
