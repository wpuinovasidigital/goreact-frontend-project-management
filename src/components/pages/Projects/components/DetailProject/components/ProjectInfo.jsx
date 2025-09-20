import { Stack } from '@mui/material';

import ProjectDuration from './ProjectDuration';
import ProjectMembers from './ProjectMembers';

const ProjectInfo = () => {
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
