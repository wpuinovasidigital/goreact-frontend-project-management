import { Stack } from '@mui/material';

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
    </Stack>
  );
};

export default ProjectInfo;