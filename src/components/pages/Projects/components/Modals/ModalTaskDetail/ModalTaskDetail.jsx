import { CloudUpload, Delete } from '@mui/icons-material';
import { Box, Button, colors, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { use, useCallback, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';

import useDetailProjectContext from '../../DetailProject/hooks/useDetailProjectContext';

import DatePicker from '@/components/ui/Forms/DatePicker';
import Select from '@/components/ui/Forms/Select';
import TextField from '@/components/ui/Forms/TextField';
import Modal from '@/components/ui/Modal';
import services from '@/services';
import datetime from '@/utils/datetime';

const ModalTaskDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [taskDetailData, setTaskDetailData] = useState({});
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const taskId = searchParams.get('taskId');
  const listId = searchParams.get('listId');

  const fetchTaskDetail = async (taskId) => {
    const response = await services.cards.getDetail(taskId);
    setTaskDetailData(response.data.data);
  };

  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      description: taskDetailData.description || '',
      due_date: dayjs(taskDetailData.due_date) || dayjs().add(1, 'day'),
    },
  });

  const { control: controlFormAssignee, handleSubmit: handleSubmitAssignee } =
    useForm({
      defaultValues: {
        assignees: [],
      },
    });

  const onSubmitAssignee = async (values) => {
    setLoading(true);
    await services.cards.addAssignees(taskId, values.assignees);
    setLoading(false);
    setEditAssignee(false);
    fetchTaskDetail(taskId);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    await services.cards.update(taskDetailData.public_id, {
      list_id: listId,
      title: values.title ?? taskDetailData.title,
      due_date: values.due_date ?? taskDetailData.due_date,
      position: taskDetailData.position,
      description: values.description ?? taskDetailData.description,
    });
    setLoading(false);
    setEditDescription(false);
    setEditDueDate(false);
    setEditTitle(false);
    await fetchTaskDetail(taskId);
  };

  const handleDeleteTask = async () => {
    setLoading(true);
    await services.cards.remove(taskDetailData.public_id);
    setLoading(false);
    handleClose();
    await detailProjectContext.fetchBoardLists();
    setShowConfirmDelete(false);
  };

  const handleClose = useCallback(async () => {
    setSearchParams({});
    await detailProjectContext.fetchBoardLists();
  }, [taskDetailData]);

  useEffect(() => {
    if (taskId && listId) {
      fetchTaskDetail(taskId);
    }
  }, [taskId, listId]);

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
                <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    control={control}
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
                  <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                    <DatePicker
                      control={control}
                      name={'due_date'}
                      fullWidth
                      disabled={isLoading}
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
                    onSubmit={handleSubmitAssignee(onSubmitAssignee)}
                  >
                    <Select
                      control={controlFormAssignee}
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
