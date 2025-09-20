import { Box, Button, Paper, Stack } from '@mui/material';
import TextField from '@/components/ui/Forms/TextField';
import { PlusOneRounded } from '@mui/icons-material';
import useCreateNewList from '../hooks/useCreateNewList';

const CreateNewList = () => {
  const {
    isLoadingCreateList,
    showFormCreateList,
    control,
    handleSubmit,
    handleOpenFormCreateList,
    handleCloseFormCreateList,
    onSubmitCreateList,
  } = useCreateNewList();
  return (
    <Box
      sx={{
        flexBasis: 300,
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {showFormCreateList ? (
        <Paper
          sx={{ p: 1 }}
          component={'form'}
          onSubmit={handleSubmit(onSubmitCreateList)}
        >
          <TextField
            control={control}
            name={'title'}
            label={'Nama daftar tugas'}
            rows={1}
            fullWidth
            autoFocus
          />
          <Stack direction={'row'} gap={1} justifyContent={'flex-end'}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={isLoadingCreateList}
              loading={isLoadingCreateList}
            >
              Simpan
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={handleCloseFormCreateList}
              disabled={isLoadingCreateList}
            >
              Batal
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Button
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={handleOpenFormCreateList}
          disableElevation
          startIcon={<PlusOneRounded />}
        >
          Buat daftar tugas
        </Button>
      )}
    </Box>
  );
};

export default CreateNewList;
