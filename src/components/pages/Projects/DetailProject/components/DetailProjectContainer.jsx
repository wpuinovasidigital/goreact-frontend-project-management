import { colors, Paper, Typography } from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';

const DetailProjectContainer = () => {
  return (
    <SidebarLayout
      pageTitle="Detail Proyek"
      breadcrumbs={[
        {
          label: 'Daftar Proyek',
          href: '/projects',
        },
        {
          label: 'Agency Software Engineering',
        },
      ]}
    >
      <Paper
        sx={{
          padding: 2,
          background: colors.lightBlue[100],
        }}
      >
        <Typography>Menampilkan detail proyek di sini</Typography>
      </Paper>
    </SidebarLayout>
  );
};

export default DetailProjectContainer;
