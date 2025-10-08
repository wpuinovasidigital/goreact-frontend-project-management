import { Button, colors, Stack, Typography } from '@mui/material';
import useTaskAssignees from '../hooks/useTaskAssignees';
import Select from '@/components/ui/Forms/Select';
import { Person, PlusOne } from '@mui/icons-material';

const TaskAssignees = () => {
  const {
    isLoading,
    formTaskAssignees,
    onSubmitTaskAssignee,
    membersData,
    taskDetailData,
    showFormAssignees,
    setShowFormAssignees,
  } = useTaskAssignees();
  return (
    <Stack gap={2}>
      <Typography variant="h5" fontWeight={700}>
        Assignee
      </Typography>
      <Stack gap={2}>
        {taskDetailData?.assignees?.map((item) => (
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
              border: `1px solid ${colors.grey[300]}`,
              borderRadius: 1,
              p: 1,
            }}
          >
            <Stack
              direction={'row'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              gap={2}
            >
              <Person />
              <Typography
                variant="body2"
                sx={{
                  color: colors.grey[700],
                }}
              >
                {item.user.name}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      {showFormAssignees ? (
        <Stack
          gap={1}
          component={'form'}
          onSubmit={formTaskAssignees.handleSubmit(onSubmitTaskAssignee)}
        >
          <Select
            control={formTaskAssignees.control}
            name={'members'}
            label={'Pilih member'}
            options={membersData?.map((item) => ({
              label: item.name,
              value: item.public_id,
            }))}
            size="small"
            multiple
          />
          <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              loading={isLoading}
              size="small"
            >
              Simpan
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => setShowFormAssignees(false)}
              disabled={isLoading}
              size="small"
            >
              Batal
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Button
          type="button"
          variant="outlined"
          startIcon={<PlusOne />}
          onClick={() => setShowFormAssignees(true)}
        >
          Tambah assignee
        </Button>
      )}
    </Stack>
  );
};

export default TaskAssignees;
