import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import TextField from '@/components/ui/Forms/TextField';
import Modal from '@/components/ui/Modal';

import { Warning } from '@mui/icons-material';
import useModalAddNewMember from './hooks/useModalAddNewMember';

const ModalAddNewMember = () => {
  const {
    control,
    handleAddMember,
    handleClose,
    isLoading,
    isLoadingAddMember,
    detailProjectContext,
    usersData,
    debounceEmail,
    setUsersData
  } = useModalAddNewMember();

  const renderUsersResult = () => {
    if (!usersData && !isLoading) return <></>;

    if (usersData && usersData.length === 0 && debounceEmail && !isLoading) {
      return (
        <Stack
          direction={'row'}
          gap={1}
          justifyContent={'flex-start'}
          alignItems={'center'}
          mt={2}
        >
          <Warning />

          <Typography variant="body2">
            Pengguna{' '}
            <Typography component={'span'} fontWeight={600}>
              {debounceEmail}
            </Typography>{' '}
            tidak ditemukan
          </Typography>
        </Stack>
      );
    }

    return (
      <>
        {usersData?.map((item) => (
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
      <Box sx={{ width: 600, p: 2 }}>
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