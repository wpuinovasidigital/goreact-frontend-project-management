import Dropdown from '@/components/ui/Dropdown';
import datetime from '@/utils/datetime';
import { Settings } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router';
import useDetailProjectContext from '../hooks/useDetailProjectContext';

const ProjectDuration = () => {
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <Stack direction={'column'} alignItems={'flex-end'}>
        <Typography variant="body1" fontWeight={'bold'}>
          Durasi Proyek{' '}
          {datetime.getDurationDays(
            detailProjectData.created_at,
            detailProjectData.due_date,
          )}{' '}
          hari
        </Typography>
        <Typography variant="body1">
          ({datetime.format(detailProjectData.created_at, 'DD MMM YYYY')} -{' '}
          {datetime.format(detailProjectData.due_date, 'DD MMM YYYY')})
        </Typography>
      </Stack>
      <Box>
        <Dropdown
          icon={<Settings />}
          options={[
            {
              label: 'Ubah detail proyek',
              onClick() {
                detailProjectContext.setIsOpenModalEditProject(true);
              },
            },
            {
              label: 'Selesaikan proyek ini',
              value: 'complete_this_project',
            },
          ]}
        />
      </Box>
    </Stack>
  );
};

export default ProjectDuration;
