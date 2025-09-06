import { Settings } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import ModalUpdateDeadline from './Modals/ModalUpdateDeadline';
import ModalCloseProject from './Modals/ModalCloseProject';
import Dropdown from '@/components/ui/Dropdown';
import boards from '@/services/api/boards';
import { useNavigate, useParams } from 'react-router';

const EditProjectButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [openUpdateDeadline, setOpenUpdateDeadline] = useState(false);
  const [openCloseProject, setOpenCloseProject] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenUpdateDeadline = () => {
    setOpenUpdateDeadline(true);
    handleCloseMenu();
  };

  const handleOpenCloseProject = () => {
    setOpenCloseProject(true);
    handleCloseMenu();
  };

  const handleCloseUpdateDeadline = () => {
    setOpenUpdateDeadline(false);
  };

  const handleCloseProject = async () => {
    await boards.remove(id);
    setOpenCloseProject(false);
    navigate('/projects');
  };

  return (
    <>
      <Dropdown
        icon={<Settings />}
        options={[
          {
            label: 'Tutup proyek ini',
            onClick: handleOpenCloseProject,
          },
          {
            label: 'Ubah deadline',
            onClick: handleOpenUpdateDeadline,
          },
        ]}
      />

      <ModalUpdateDeadline
        open={openUpdateDeadline}
        handleClose={handleCloseUpdateDeadline}
      />
      <ModalCloseProject
        open={openCloseProject}
        handleClose={handleCloseProject}
      />
    </>
  );
};

export default EditProjectButton;
