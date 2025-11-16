import { Box, Stack } from '@mui/material';
import ProjectMembers from './ProjectMembers';
import ProjectDuration from './ProjectDuration';

const ProjectInfo = () => {
  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      direction={'row'}
      mb={2}
    >
      <ProjectMembers />
      <ProjectDuration />
    </Stack>
  );
};

export default ProjectInfo;
