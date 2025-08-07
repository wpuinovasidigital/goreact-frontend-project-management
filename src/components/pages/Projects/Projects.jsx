import { colors, Paper, Typography } from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';

const DetailProject = () => {
  return (
    <SidebarLayout
      pageTitle="Daftar Proyek"
      breadcrumbs={[
        {
          label: 'Daftar Proyek',
        },
      ]}
    >
      <Paper
        sx={{
          padding: 2,
          background: colors.lightBlue[100],
        }}
      >
        <Typography>Menampilkan daftar proyek di sini</Typography>
      </Paper>
    </SidebarLayout>
  );
};

export default DetailProject;
