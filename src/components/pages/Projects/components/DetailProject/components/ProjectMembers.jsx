import { useLoaderData } from 'react-router';
import useDetailProjectContext from '../hooks/useDetailProjectContext';
import services from '@/services';
import { AvatarGroup, Button, Stack } from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Avatar from '@/components/ui/Avatar';

const ProjectMembers = () => {
  
  const {members, setIsOpenModalAddNewMember} = useDetailProjectContext();


  const handleAddNewMember = () => {
    setIsOpenModalAddNewMember(true);
  };

  const renderAvatarMembers = () => {
    return (
      <AvatarGroup max={4}>
        {members.map((member) => (
          <Avatar 
            key={member.id}
            text={member.name}
          />
        ))}
      </AvatarGroup>
    );
  };

  return (
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
  );
};

export default ProjectMembers;
