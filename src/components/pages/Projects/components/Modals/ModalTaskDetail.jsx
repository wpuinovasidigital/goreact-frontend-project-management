import Modal from '@/components/ui/Modal';
import useDetailProjectContext from '../DetailProject/hooks/useDetailProjectContext';
import { Box, Button, colors, Stack, Typography } from '@mui/material';
import services from '@/services';
import { useCallback, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import TextField from '@/components/ui/Forms/TextField';
import DatePicker from '@/components/ui/Forms/DatePicker';
import dayjs from 'dayjs';
import { CloudUpload } from '@mui/icons-material';

const ModalTaskDetail = () => {
  const detailProjectContext = useDetailProjectContext();
  const taskDetail = detailProjectContext.taskDetail;

  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      description: taskDetail.description || '',
      due_date: taskDetail.due_date || dayjs().add(1, 'day'),
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    await services.cards.update(taskDetail.public_id, {
      list_id: taskDetail.listId,
      title: taskDetail.title,
      due_date: values.due_date ?? taskDetail.due_date,
      position: taskDetail.position,
      description: values.description ?? taskDetail.description,
    });
    setLoading(false);
    setEditDescription(false);
    setEditDueDate(false);
    await detailProjectContext.fetchBoardLists();
  };

  return (
    <Modal
      open={detailProjectContext.isOpenTaskDetail}
      //   open={true}
      handleClose={() => detailProjectContext.setIsOpenTaskDetail(false)}
      title={taskDetail.title || 'Detail Tugas'}
    >
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
        <Stack flex={1} gap={2}>
          <Typography variant="h5" fontWeight={'bold'}>
            {/* {taskDetail.title} */}
            Keterangan
          </Typography>
          {editDescription ? (
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                control={control}
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
              {taskDetail.description ||
                'Belum ada keterangan, klik untuk tambah'}
            </Typography>
          )}
        </Stack>
        <Stack flex={1} gap={2}>
          <Stack gap={2}>
            <Typography variant="h5" fontWeight={'bold'}>
              Deadline
            </Typography>
            <Stack>
              {editDueDate ? (
                <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                  <DatePicker
                    control={control}
                    name={'due_date'}
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
                  Belum ada deadline, klik untuk tambah
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
                size='large'
              >
                Upload files
                <input hidden multiple type="file" />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ModalTaskDetail;
