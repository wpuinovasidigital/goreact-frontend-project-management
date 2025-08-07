import { Settings } from '@mui/icons-material';
import { Box, colors, Paper, Stack, Typography } from '@mui/material';

import Avatar from '../../../ui/Avatar';
import Dropdown from '../../../ui/Dropdown';

import SidebarLayout from '@/components/layouts/SidebarLayout';

const DetailProject = () => {
  return (
    <SidebarLayout pageTitle='Detail Proyek' breadcrumbs={[
      {
        label: 'Daftar Proyek',
        href: '/projects'
      },
      {
        label: 'Agency Software Engineering'
      }
    ]}>
      <Paper sx={{
        padding: 2,
        background: colors.lightBlue[100]
      }}  >
        <Typography >Menampilkan detail proyek di sini</Typography>
      </Paper>
    </SidebarLayout>
  );
};

export default DetailProject;
