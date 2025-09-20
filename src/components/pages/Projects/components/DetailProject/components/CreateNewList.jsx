import TextField from '@/components/ui/Forms/TextField';
import { Box, Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import services from '@/services';
import { useLoaderData } from 'react-router';
import useDetailProjectContext from '../hooks/useDetailProjectContext';

const createListSchema = Yup.object({
  title: Yup.string().required(),
});

const CreateNewList = () => {
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const [isLoadingCreateList, setLoadingCreateList] = useState(false);
  const [showFormCreateList, setShowFormCreateList] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      board_public_id: detailProjectData.public_id,
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
    await detailProjectContext.fetchBoardLists();
  };
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
        >
          Buat daftar tugas
        </Button>
      )}
    </Box>
  );
};

export default CreateNewList;
