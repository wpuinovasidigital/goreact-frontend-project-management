import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import { useDebounce } from 'use-debounce';

import useDetailProjectContext from '../DetailProject/hooks/useDetailProjectContext';

import TextField from '@/components/ui/Forms/TextField';
import Modal from '@/components/ui/Modal';
import { useSnackbar } from '@/components/ui/Snackbar';
import services from '@/services';

const ModalAddNewMember = () => {
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const { control, reset } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const watchEmail = useWatch({
    control,
    name: 'email',
  });

  const [isLoading, setLoading] = useState(false);
  const [isLoadingAddMember, setLoadingAddMember] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [debounceEmail] = useDebounce(watchEmail, 1000);

  const snackbar = useSnackbar();

  const fetchUserByEmail = useCallback(
    async (email) => {
      if (!email) return;
      try {
        setLoading(true);
        // fetch user by email
        const response = await services.users.getUsers({
          filter: email,
          limit: 1,
          page: 1,
        });
        setUsersData(response.data.data);
      } catch (error) {
        console.log(error);
        snackbar.toggleSnackbar(false, 'Gagal mencari pengguna !');
        setUsersData([]);
      } finally {
        setLoading(false);
      }
    },
    [debounceEmail],
  );

  useEffect(() => {
    fetchUserByEmail(debounceEmail);
  }, [debounceEmail]);

  const handleClose = async () => {
    reset();
    setUsersData(null);
    detailProjectContext.setIsOpenModalAddNewMember(false);
    await detailProjectContext.fetchBoardMembers();
  };
  const handleAddMember = async () => {
    try {
      setLoadingAddMember(true);
      const userIds = usersData.map((item) => item.public_id);
      await services.boards.addMember(detailProjectData.public_id, userIds);
      snackbar.toggleSnackbar(true, 'Berhasil menambahkan member baru !');
      handleClose();
    } catch (error) {
      console.log(error);
      snackbar.toggleSnackbar(false, 'Gagal menambahkan member baru !');
    } finally {
      setLoadingAddMember(false);
    }
  };

  const renderUsersResult = () => {
    if (!usersData) return <></>;

    return (
      <>
        {usersData.map((item) => (
          <Stack
            direction={'row'}
            gap={2}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Stack>
              <Typography variant="body1" fontWeight={600}>
                {item.name}
              </Typography>
              <Typography variant="body2">{item.email}</Typography>
            </Stack>
            <Stack direction={'row'} gap={1}>
              <Button
                variant="contained"
                size="small"
                disabled={isLoadingAddMember}
                loading={isLoadingAddMember}
                onClick={handleAddMember}
              >
                Tambahkan
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setUsersData(null)}
                disabled={isLoadingAddMember}
              >
                Batal
              </Button>
            </Stack>
          </Stack>
        ))}
      </>
    );
  };

  return (
    <Modal
      open={detailProjectContext.isOpenModalAddNewMember}
      handleClose={handleClose}
      title="Tambah member"
    >
      <Box sx={{ minWidth: 600, p: 2 }}>
        <TextField
          control={control}
          name="email"
          label={'Cari pengguna'}
          placeholder="Masukkan email pengguna"
          fullWidth
          disabled={isLoadingAddMember}
        />
        {isLoading && <LinearProgress />}
        {renderUsersResult()}
      </Box>
    </Modal>
  );
};

export default ModalAddNewMember;
