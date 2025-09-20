import { GroupAdd, Settings } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

import useDetailProjectContext from '../hooks/useDetailProjectContext';

import ProjectDuration from './ProjectDuration';
import ProjectMembers from './ProjectMembers';

import Dropdown from '@/components/ui/Dropdown';
import services from '@/services';
import datetime from '@/utils/datetime';

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
