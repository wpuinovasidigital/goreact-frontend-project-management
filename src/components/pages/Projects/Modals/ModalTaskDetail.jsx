import { CloudUpload, Delete } from '@mui/icons-material';
import { Box, Button, colors, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import DatePicker from '@/components/ui/Forms/DatePicker';
import Select from '@/components/ui/Forms/Select';
import TextField from '@/components/ui/Forms/TextField';
import Modal from '@/components/ui/Modal';
import datetime from '@/utils/datetime';
import useModalTaskDetail from './hooks/useModalTaskDetail';

const ModalTaskDetail = () => {
  const {
    detailProjectData,
    editAssignee,
    editDescription,
    editDueDate,
    editTitle,
    formTask,
    formTaskAssignees,
    handleClose,
    handleDeleteTask,
    isLoading,
    isShowConfirmDelete,
    onSubmit,
    onSubmitAssignees,
    setEditAssignee,
    setEditDescription,
    setEditDueDate,
    setEditTitle,
    setShowConfirmDelete,
    taskDetailData,
    detailProjectContext,
    taskId
  } = useModalTaskDetail();

  const renderDeleteTask = () => {
    if (isShowConfirmDelete) {
      return (
        <Stack direction={'row'} gap={1} alignItems={'center'}>
          <Typography variant="body2">
            Apakah Anda yakin ingin menghapus tugas ini?
          </Typography>
          <Button
            variant="text"
            color="error"
            onClick={handleDeleteTask}
            disabled={isLoading}
          >
            Ya
          </Button>
          <Button
            variant="text"
            onClick={() => setShowConfirmDelete(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
        </Stack>
      );
    }
    return (
      <Button
        startIcon={<Delete />}
        variant="outlined"
        color="error"
        onClick={() => setShowConfirmDelete(true)}
        disabled={isLoading}
      >
        Hapus
      </Button>
    );
  };

  return (
    <Modal
      open={taskId}
      handleClose={handleClose}
      title={taskDetailData?.title || 'Detail Tugas'}
    >
      <Box>
        <Stack
          width={1000}
          height={600}
          overflowY={'auto'}
          direction={'row'}
          gap={2}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          p={2}
        >
          <Stack width={'65%'} gap={2}>
            <Stack gap={2}>
              <Typography variant="h5" fontWeight={'bold'}>
                Judul
              </Typography>
              {editTitle ? (
                <Box component={'form'} onSubmit={formTask.handleSubmit(onSubmit)}>
                  <TextField
                    control={formTask.control}
                    name={'title'}
                    multiline
                    fullWidth
                    disabled={isLoading}
                  />
                  <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      loading={isLoading}
                    >
                      Simpan
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => setEditTitle(false)}
                      disabled={isLoading}
                    >
                      Batal
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Typography
                  component={'a'}
                  variant="body2"
                  sx={{
                    display: 'block',
                    ':hover': {
                      background: colors.grey[100],
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 1,
                    },
                  }}
                  onClick={() => setEditTitle(true)}
                >
                  {taskDetailData.title ||
                    'Belum ada keterangan, klik untuk tambah'}
                </Typography>
              )}
            </Stack>
            <Stack gap={2}>
              <Typography variant="h5" fontWeight={'bold'}>
                Deskripsi tugas
              </Typography>
              {editDescription ? (
                <Box component={'form'} onSubmit={formTask.handleSubmit(onSubmit)}>
                  <TextField
                    control={formTask.control}
                    name={'description'}
                    multiline
                    rows={10}
                    fullWidth
                    disabled={isLoading}
                  />
                  <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      loading={isLoading}
                    >
                      Simpan
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => setEditDescription(false)}
                      disabled={isLoading}
                    >
                      Batal
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Typography
                  component={'a'}
                  variant="body2"
                  sx={{
                    display: 'block',
                    ':hover': {
                      background: colors.grey[100],
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 1,
                    },
                  }}
                  onClick={() => setEditDescription(true)}
                >
                  {taskDetailData.description ||
                    'Belum ada keterangan, klik untuk tambah'}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Stack width={'35%'} gap={2}>
            <Stack gap={2}>
              <Typography variant="h5" fontWeight={'bold'}>
                Deadline
              </Typography>
              <Stack>
                {editDueDate ? (
                  <Box component={'form'} onSubmit={formTask.handleSubmit(onSubmit)}>
                    <DatePicker
                      control={formTask.control}
                      name={'due_date'}
                      fullWidth
                      disabled={isLoading}
                      minDate={dayjs()}
                      maxDate={dayjs(detailProjectData.due_date)}
                    />
                    <Stack
                      direction={'row'}
                      justifyContent={'flex-end'}
                      gap={1}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        loading={isLoading}
                      >
                        Simpan
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => setEditDueDate(false)}
                        disabled={isLoading}
                      >
                        Batal
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'block',
                      ':hover': {
                        background: colors.grey[100],
                        cursor: 'pointer',
                        p: 1,
                        borderRadius: 1,
                      },
                    }}
                    onClick={() => setEditDueDate(true)}
                  >
                    {taskDetailData.due_date &&
                    taskDetailData.due_date === '0001-01-01T00:00:00Z'
                      ? 'Belum ada deadline, klik untuk tambah'
                      : datetime.format(
                          taskDetailData.due_date,
                          'DD MMMM YYYY',
                        )}
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Typography variant="h5" fontWeight={'bold'}>
                Assignee
              </Typography>
              <Stack>
                {editAssignee ? (
                  <Box
                    component={'form'}
                    onSubmit={formTaskAssignees.handleSubmit(onSubmitAssignees)}
                  >
                    <Select
                      control={formTaskAssignees.control}
                      label={'Pilih member'}
                      name={'assignees'}
                      options={detailProjectContext.members.map((member) => ({
                        label: member.email,
                        value: member.public_id,
                      }))}
                      multiple
                    />
                    <Stack
                      mt={1}
                      direction={'row'}
                      justifyContent={'flex-end'}
                      gap={1}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        loading={isLoading}
                      >
                        Simpan
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => setEditAssignee(false)}
                        disabled={isLoading}
                      >
                        Batal
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'block',
                      ':hover': {
                        background: colors.grey[100],
                        cursor: 'pointer',
                        p: 1,
                        borderRadius: 1,
                      },
                    }}
                    onClick={() => setEditAssignee(true)}
                  >
                    Belum ada assignee, klik untuk tambah
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Typography variant="h5" fontWeight={'bold'}>
                Lampiran (Attachments)
              </Typography>
              <Stack gap={2}>
                <Typography variant="body2">Belum ada lampiran</Typography>
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                  size="large"
                >
                  Upload files
                  <input hidden multiple type="file" />
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            position: 'sticky',
            bottom: 0,
            background: 'white',
            py: 1,
            px: 2,
            borderTop: `1px solid ${colors.grey[300]}`,
          }}
          direction={'row'}
          justifyContent={'flex-end'}
          gap={1}
        >
          {renderDeleteTask()}
          <Button variant="outlined" onClick={handleClose} disabled={isLoading}>
            Tutup
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalTaskDetail;
