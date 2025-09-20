import { useDroppable } from '@dnd-kit/core';
import useDetailProjectContext from '../hooks/useDetailProjectContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Box,
  colors,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import TaskItems, { TaskSortableItem } from './TaskItems';
import CreateNewTask from './CreateNewTask';
import { DRAG_CARD, DRAG_LIST } from '@/utils/constants';
import services from '@/services';

const ListSortableItem = ({ id, item }) => {
  const detailProjectContext = useDetailProjectContext();

  const taskItems = detailProjectContext.getTaskItemsByListId(item.public_id);

  const {
    setNodeRef: setNodeRefDroppable,
    isOver,
    active,
    over,
  } = useDroppable({
    id,
    data: {
      ...item,
      type: DRAG_LIST,
    },
  });
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        ...item,
        type: DRAG_LIST,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleDeleteList = (listId) => async (e) => {
    await services.lists.remove(listId);
    await detailProjectContext.fetchBoardLists();
  };

  return (
    <Box
      sx={{
        ...style,

        flexBasis: 300,
        flexShrink: 0,
        overflowX: 'hidden',
        borderRadius: 1,
        px: 0.5,
        mx: -0.5,
        background: colors.grey[50],
      }}
      ref={setNodeRef}
    >
      <Stack
        ref={setNodeRefDroppable}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={2}
        borderBottom={`1px solid ${colors.grey[300]}`}
        sx={{
          cursor: 'grab',
          borderTopRightRadius: 1,
          borderTopLeftRadius: 1,
        }}
        {...attributes}
        {...listeners}
      >
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Typography variant="body1" fontWeight={'bold'}>
            {item.title}
          </Typography>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              width: 26,
              height: 26,
              borderRadius: 1,
              backgroundColor: colors.orange[100],
            }}
          >
            <Typography variant="caption" fontWeight={'bold'}>
              {taskItems.length}
            </Typography>
          </Stack>
        </Stack>

        <IconButton
          size="small"
          color={'error'}
          onClick={handleDeleteList(item.public_id)}
        >
          <DeleteForever />
        </IconButton>
      </Stack>
      <Box
        sx={{
          height: 850,
          pb: 2,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.grey[400],
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: colors.grey[200],
          },
        }}
      >
        {isOver &&
          active.data.current.type === DRAG_CARD &&
          active.data.current.listId !== item.public_id && (
            <Box p={1}>
              <Paper elevation={3} sx={{ p: 1, bgcolor: colors.grey[200] }}>
                test
              </Paper>
            </Box>
          )}
        <TaskItems listId={item.public_id} />
        <CreateNewTask listId={item.public_id} />
      </Box>
    </Box>
  );
};

export default ListSortableItem;
