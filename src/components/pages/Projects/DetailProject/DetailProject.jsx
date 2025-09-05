import { colors, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import boards from '@/services/api/boards';

const DetailProject = () => {
  const { id } = useParams();

  const [boardData, setBoardData] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);
      const response = await boards.detail(id);
      setBoardData(response.data.data);
      setLoading(false);
    };
    fetchBoard();
  }, [id]);

  return (
    <SidebarLayout
      pageTitle="Detail Proyek"
      breadcrumbs={[
        {
          label: 'Daftar Proyek',
          href: '/projects',
        },
        {
          label: boardData?.title,
        },
      ]}
    >
      <Paper
        sx={{
          padding: 2,
          // background: colors.lightBlue[100],
        }}
      >
        {isLoading && <LinearProgress />}
        <Typography>Menampilkan detail proyek di sini</Typography>
      </Paper>
    </SidebarLayout>
  );
};

export default DetailProject;
