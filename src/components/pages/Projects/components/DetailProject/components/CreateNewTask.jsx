import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from '@/components/ui/Forms/TextField';
import { useMemo, useState } from 'react';
import services from '@/services';
import { AddCircle } from '@mui/icons-material';
import useDetailProjectContext from '../hooks/useDetailProjectContext';

const createNewTaskSchema = Yup.object({
  title: Yup.string().required(),
});

const CreateNewTask = ({ listId }) => {
  const detailProjectContext = useDetailProjectContext();
  const taskItemsData = detailProjectContext.getTaskItemsByListId(listId);
  const taskItemDataIds = useMemo(() => {
    return taskItemsData.map((item) => item.public_id);
  }, [taskItemsData]);
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
      position: taskItemDataIds.length === 0 ? 1 : taskItemDataIds.length + 1,
    });
    setLoading(false);
    reset();
    handleCloseFormCreateNewTask();
    await detailProjectContext.fetchBoardLists();
  };

  const handleOpenFormCreateNewTask = () => setShowFormCreateNewTask(true);
  const handleCloseFormCreateNewTask = () => setShowFormCreateNewTask(false);

  return (
    <>
      {isShowFormCreateNewTask ? (
        <Box p={1} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            control={control}
            name={'title'}
            label={'Nama tugas'}
            rows={1}
            fullWidth
            autoFocus
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
        <Box p={1}>
          <Button
            type="button"
            variant="text"
            fullWidth
            onClick={handleOpenFormCreateNewTask}
            startIcon={<AddCircle />}
          >
            Buat tugas baru
          </Button>
        </Box>
      )}
    </>
  );
};

export default CreateNewTask;
