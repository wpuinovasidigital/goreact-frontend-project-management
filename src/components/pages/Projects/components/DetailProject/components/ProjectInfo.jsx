import { Box, Button, Stack, Typography } from '@mui/material';
import useDetailProjectContext from '../hooks/useDetailProjectContext';
import datetime from '@/utils/datetime';
import { useLoaderData } from 'react-router';
import Dropdown from '@/components/ui/Dropdown';
import { GroupAdd, Settings } from '@mui/icons-material';
import services from '@/services';
import { useEffect } from 'react';
import ProjectMembers from './ProjectMembers';
import ProjectDuration from './ProjectDuration';

const ProjectInfo = () => {
  const detailProjectData = useLoaderData();

  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      direction={'row'}
      gap={2}
      my={3}
    >
      <ProjectMembers />
      <ProjectDuration />
    </Stack>
  );
};

export default ProjectInfo;
