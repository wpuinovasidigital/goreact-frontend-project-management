import Modal from '@/components/ui/Modal';
import useDetailProjectContext from '../../DetailProject/hooks/useDetailProjectContext';
import { Box, Button, colors, Stack, Typography } from '@mui/material';
import services from '@/services';
import { use, useCallback, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import TextField from '@/components/ui/Forms/TextField';
import DatePicker from '@/components/ui/Forms/DatePicker';
import dayjs from 'dayjs';
import { CloudUpload } from '@mui/icons-material';
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import Select from '@/components/ui/Forms/Select';

const ModalTaskDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [taskDetailData, setTaskDetailData] = useState({});
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const taskId = searchParams.get('taskId');

  const fetchTaskDetail = async (taskId) => {
    const response = await services.cards.getDetail(taskId);
    setTaskDetailData(response.data.data);
  };

  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);

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
      list_id: taskDetailData.listId,
      title: taskDetailData.title,
      due_date: values.due_date ?? taskDetailData.due_date,
      position: taskDetailData.position,
      description: values.description ?? taskDetailData.description,
    });
    setLoading(false);
    setEditDescription(false);
    setEditDueDate(false);
  };

  const handleClose = useCallback(() => {
    setSearchParams({});
  }, [taskDetailData]);

  useEffect(() => {
    if (taskId && detailProjectContext.isOpenTaskDetail) {
      fetchTaskDetail(taskId);
    }
  }, [taskId, detailProjectContext.isOpenTaskDetail]);

  return (
    <Modal
      open={taskId && detailProjectContext.isOpenTaskDetail}
      handleClose={handleClose}
      title={taskDetailData?.title || 'Detail Tugas'}
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
        <Stack flex={1} width={'50%'} gap={2}>
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
        <Stack flex={1} width={'50%'} gap={2}>
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
    </Modal>
  );
};

export default ModalTaskDetail;
