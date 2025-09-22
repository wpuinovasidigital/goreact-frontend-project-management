import { colors, Paper, Typography } from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import { useLoaderData } from 'react-router';
import useDetailProjectContext from '../hooks/useDetailProjectContext';

const DetailProjectContainer = () => {
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  return (
    <SidebarLayout
      pageTitle={`${detailProjectData.title} (${detailProjectContext.getProjectInitials})`}
      breadcrumbs={[
        {
          label: 'Daftar Proyek',
          href: '/projects',
        },
        {
          label: detailProjectData.title,
        },
      ]}
    ></SidebarLayout>
  );
};

export default DetailProjectContainer;
