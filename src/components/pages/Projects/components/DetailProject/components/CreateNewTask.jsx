import { AddCircle } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import TextField from '@/components/ui/Forms/TextField';
import useCreateNewTask from '../hooks/useCreateNewTask';

const CreateNewTask = ({ listId }) => {
  const {
    isLoading,
    isShowFormCreateNewTask,
    control,
    handleSubmit,
    handleOpenFormCreateNewTask,
    handleCloseFormCreateNewTask,
    onSubmit,
  } = useCreateNewTask(listId);
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
