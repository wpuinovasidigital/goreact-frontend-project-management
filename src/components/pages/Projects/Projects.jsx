import {
  Box,
  Button,
  colors,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import { useEffect, useState } from 'react';
import services from '@/services';
import Table from '@/components/ui/Table';
import datetime from '@/utils/datetime';
import TextField from '@/components/ui/Forms/TextField';
import { useForm, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import Pagination from '@/components/ui/Pagination';

const Projects = () => {
  const [isLoading, setLoading] = useState(false);
  const [boardsData, setBoardsData] = useState([]);
  const [boardsMeta, setBoardsMeta] = useState({});
  const [page, setPage] = useState(1);

  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const watchSearch = useWatch({
    control,
    name: 'search',
  });

  const [debounceSearch] = useDebounce(watchSearch, 1000);

  useEffect(() => {
    const fetchBoardsData = async () => {
      setLoading(true);
      const response = await services.boards.myBoards({
        filter: debounceSearch,
        limit: 1,
        page,
      });
      setBoardsData(response.data.data);
      setBoardsMeta(response.data.meta);
      setLoading(false);
    };

    fetchBoardsData();
  }, [debounceSearch, page]);

  return (
    <SidebarLayout
      pageTitle="Daftar Proyek"
      breadcrumbs={[
        {
          label: 'Daftar Proyek',
        },
      ]}
    >
      <Stack>
        <Box>
          <TextField
            control={control}
            label={'Cari nama proyek'}
            id="search"
            name="search"
            size="small"
          />
        </Box>
      </Stack>

      <Table
        isLoading={isLoading}
        data={boardsData}
        columns={[
          {
            id: 'title',
            label: 'Nama proyek',
          },
          {
            id: 'description',
            label: 'Deskripsi',
          },
          {
            id: 'title',
            label: 'Tanggal dibuat',
            render(data) {
              return (
                <Box>{datetime.format(data.created_at, 'DD/MM/YYYY')}</Box>
              );
            },
          },
          {
            id: 'title',
            label: 'Aksi',
            render(data) {
              return (
                <Link to={`/projects/${data.public_id}`}>
                  <Button type="button" variant="outlined">
                    Detail proyek
                  </Button>
                </Link>
              );
            },
          },
        ]}
      />
      <Pagination
        count={boardsMeta.total_pages}
        onChange={(e, page) => {
          setPage(page);
        }}
      />
    </SidebarLayout>
  );
};

export default Projects;
