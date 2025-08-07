import { Settings } from '@mui/icons-material';
import { Stack } from '@mui/material';

import Avatar from '../../../ui/Avatar';
import Dropdown from '../../../ui/Dropdown';

import SidebarLayout from '@/components/layouts/SidebarLayout';

const DetailProject = () => {
  return (
    <SidebarLayout>
      <Stack
        sx={{
          height: '100vh',
          width: '100%',
        }}
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={2}
      >
        <Avatar
          text={'Muhammad Agung Rizkyana'}
          onClick={() => {
            console.log('handle click avatar');
          }}
        />
        <Dropdown
          icon={<Settings />}
          options={[
            {
              label: 'Tutup proyek ini',
              onClick() {
                console.log('handle close project');
              },
            },
            {
              label: 'Ubah deadline',
              onClick() {
                console.log('handle update deadline project');
              },
            },
          ]}
        />
      </Stack>
    </SidebarLayout>
  );
};

export default DetailProject;
