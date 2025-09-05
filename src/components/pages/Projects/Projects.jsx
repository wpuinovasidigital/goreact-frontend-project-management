import { Box, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';
import { useDebounce } from 'use-debounce';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import TextField from '@/components/ui/Forms/TextField';
import Pagination from '@/components/ui/Pagination';
import Table from '@/components/ui/Table';
import boards from '@/services/api/boards';
import datetime from '@/utils/datetime';

const Project = () => {
  const [loading, setLoading] = useState(false);
  const [boardsData, setBoardsData] = useState([]);
  const [boardsMeta, setBoardsMeta] = useState({
    limit: 10,
    page: 1,
    total: 0,
    total_pages: 0,
  });

  const [page, setPage] = useState(1);
  const [debouncePage] = useDebounce(page, 100);

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
    const fetchBoards = async () => {
      setLoading(true);
      const response = await boards.my({
        page: debouncePage,
        limit: 10,
        filter: debounceSearch,
      });
      setBoardsData(response.data.data);
      setBoardsMeta(response.data.meta);
      setLoading(false);
    };
    fetchBoards();
  }, [debouncePage, debounceSearch]);

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
        <Box>
          <TextField
            control={control}
            id="search"
            label="Search"
            name="search"
            placeholder="Search"
          />
        </Box>
      </Stack>
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
      <Pagination
        count={boardsMeta.total_pages}
        onChange={(_, page) => {
          setPage(page);
        }}
      />
    </SidebarLayout>
  );
};

export default Project;
