import { GroupAdd } from '@mui/icons-material';
import { AvatarGroup, Button, Stack } from '@mui/material';

import useDetailProjectContext from '../hooks/useDetailProjectContext';

import Avatar from '@/components/ui/Avatar';
import ModalAddNewMember from '../../Modals/ModalAddNewMember';

const ProjectMembers = () => {
  const { members, setIsOpenModalAddNewMember } = useDetailProjectContext();

  const handleAddNewMember = () => {
    setIsOpenModalAddNewMember(true);
  };

  const renderAvatarMembers = () => {
    return (
      <AvatarGroup max={4}>
        {members.map((member) => (
          <Avatar key={member.id} text={member.name} />
        ))}
      </AvatarGroup>
    );
  };

  return (
    <>
    <Stack direction={'row'} alignItems={'center'} gap={2}>
      {renderAvatarMembers()}
      <Button
        variant="text"
        type="button"
        startIcon={<GroupAdd />}
        onClick={handleAddNewMember}
      >
        Tambah Member
      </Button>
    </Stack>
    <ModalAddNewMember />
    </>
  );
};

export default ProjectMembers;