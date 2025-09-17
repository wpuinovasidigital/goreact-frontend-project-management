import TextField from '@/components/ui/Forms/TextField';
import { Box, Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import services from '@/services';

const createListSchema = Yup.object({
  title: Yup.string().required(),
});

const CreateNewList = ({ boardId, onSuccess }) => {
  const [isLoadingCreateList, setLoadingCreateList] = useState(false);
  const [showFormCreateList, setShowFormCreateList] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      board_public_id: boardId,
    },
    resolver: yupResolver(createListSchema),
  });

  const handleOpenFormCreateList = () => setShowFormCreateList(true);
  const handleCloseFormCreateList = () => setShowFormCreateList(false);

  const onSubmitCreateList = async (values) => {
    setLoadingCreateList(true);
    await services.lists.create(values);
    setLoadingCreateList(false);
    reset();
    handleCloseFormCreateList();
    onSuccess();
  };
  return (
    <Paper
      sx={{
        maxHeight: 850,
        flexBasis: 300,
        flexShrink: 0,
        p: 2,
        overflowY: 'auto',
      }}
    >
      {showFormCreateList ? (
        <Box component={'form'} onSubmit={handleSubmit(onSubmitCreateList)}>
          <TextField
            control={control}
            name={'title'}
            label={'Nama daftar tugas'}
            rows={1}
            fullWidth
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
        </Box>
      ) : (
        <Button
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={handleOpenFormCreateList}
        >
          Buat daftar tugas
        </Button>
      )}
    </Paper>
  );
};

export default CreateNewList;
