import { Stack } from '@mui/material';
import ProjectMembers from './ProjectMembers';
import EditProject from './EditProject';

const ProjectInfo = () => {
  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      direction={'row'}
      mb={2}
    >
      <ProjectMembers />
      <EditProject />
    </Stack>
  );
};

export default ProjectInfo;
