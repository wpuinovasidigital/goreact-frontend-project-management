import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import Table from '@/components/ui/Table';
import boards from '@/services/api/boards';
import datetime from '@/utils/datetime';

const Project = () => {
  const [loading, setLoading] = useState(false);
  const [boardsData, setBoardsData] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      setTimeout(async () => {
        const response = await boards.my();
      setBoardsData(response.data.data);
      setLoading(false);
      }, 500)
    };

    fetchBoards();
  }, []);

  return (
    <SidebarLayout
      pageTitle="Daftar Proyek"
      breadcrumbs={[
        {
          label: 'Daftar Proyek',
        },
      ]}
    >

        <Table
          isLoading={loading}
          columns={[
            {
              id: 'title',
              label: 'Title',
            },
            {
              id: 'description',
              label: 'Description',
            },
            {
              id: 'title',
              label: 'Tanggal dibuat',
              render(data) {
                return <Box>{datetime.format(data.created_at)}</Box>;
              },
            },
            {
              id: 'title',
              label: 'Aksi',
              render: (data) => (
                <Link to={`/projects/${data.public_id}`}>
                  <Button type="button" variant="outlined">
                    Detail Proyek
                  </Button>
                </Link>
              ),
            },
          ]}
          data={boardsData}
        />
      
    </SidebarLayout>
  );
};

export default Project;
