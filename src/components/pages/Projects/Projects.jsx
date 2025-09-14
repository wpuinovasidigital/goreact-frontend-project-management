import { Box, Button, colors, Link, Paper, Stack, Typography } from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import { useEffect, useState } from 'react';
import services from '@/services';
import Table from '@/components/ui/Table';
import datetime from '@/utils/datetime';
import { useForm } from 'react-hook-form';
import TextField from '@/components/ui/Forms/TextField';

const Projects = () => {

  const [isLoading, setLoading] = useState(false);
  const [boardsData, setBoardsData] = useState([]);
  const [boardsMeta, setBoardsMeta] = useState({
    limit: 10,
    page: 1,
    total: 0,
    total_pages: 0
  });

  const {control} = useForm({
    defaultValues: {
      search: ''
    }
  });

  useEffect(() => {

    const fetchBoardsData = async () => {
      setLoading(true);
      const response = await services.boards.myBoards();
      setBoardsData(response.data.data);
      setLoading(false);
    }

    fetchBoardsData();

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
      <Stack direction={'row'}>
        <TextField 
          control={control}
          id="search"
          label="Cari nama proyek"
          name="search"
          size="small"
        />
      </Stack>
      <Table 
        isLoading={isLoading}
        data={boardsData}
        columns={[
          {
            id: 'title',
            label: 'Nama proyek'
          },
          {
            id: 'description',
            label: 'Deskripsi'
          },
          {
            id: 'title',
            label: 'Tanggal dibuat',
            render(data) {
              return (
                <Box>{datetime.format(data.created_at, "DD/MM/YYYY")}</Box>
              )
            },
          },
          {
            id: 'title',
            label: 'Aksi',
            render(data) {
              return (
                <Link to={`/projects/${data.public_id}`}>
                  <Button type="button" variant='outlined'>
                    Detail proyek
                  </Button>
                </Link>
              )
            }
          }
        ]}
      />
    </SidebarLayout>
  );
};

export default Projects;
