import {
  Box,
  Button,
  colors,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import { useLoaderData, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import TextField from '@/components/ui/Forms/TextField';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import services from '@/services';
import {
  DeleteForever,
  RemoveCircle,
  RemoveCircleOutline,
} from '@mui/icons-material';
import TaskItems from './TaskItems/TaskItems';
import CreateNewList from './CreateNewList/CreateNewList';

const DetailProject = () => {
  const detailProjectData = useLoaderData();

  const [isLoadingBoardLists, setLoadingBoardLists] = useState(false);

  const [boardListData, setBoardListData] = useState([]);

  const fetchBoardLists = async () => {
    setLoadingBoardLists(true);
    const response = await services.boards.lists(detailProjectData.public_id);
    setBoardListData(response.data.data.Lists);
    setLoadingBoardLists(false);
  };

  const handleRemoveList = async (listId) => {
    await services.lists.remove(listId);
    await fetchBoardLists();
  };

  const handleSuccessCreateNewList = async () => {
    await fetchBoardLists();
  };

  useEffect(() => {
    fetchBoardLists();
  }, []);

  return (
    <SidebarLayout
      pageTitle={detailProjectData.title}
      breadcrumbs={[
        {
          label: 'Daftar Proyek',
          href: '/projects',
        },
        {
          label: detailProjectData.title,
        },
      ]}
    >
      {isLoadingBoardLists && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Stack
        direction={'row'}
        gap={1}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        sx={{
          p: 1,
        }}
      >
        {boardListData?.map((item) => (
          <Paper
            sx={{
              maxHeight: 850,
              flexBasis: 300,
              flexShrink: 0,
              overflowY: 'auto',
            }}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={2}
              borderBottom={`1px solid ${colors.grey[100]}`}
            >
              <Typography variant="body1" fontWeight={'bold'}>
                {item.title}
              </Typography>
              <IconButton
                size="small"
                color={'error'}
                onClick={() => handleRemoveList(item.public_id)}
              >
                <DeleteForever />
              </IconButton>
            </Stack>
            <TaskItems listId={item.public_id} />
          </Paper>
        ))}
        <CreateNewList
          boardId={detailProjectData.public_id}
          onSuccess={handleSuccessCreateNewList}
        />
      </Stack>
    </SidebarLayout>
  );
};

export default DetailProject;
