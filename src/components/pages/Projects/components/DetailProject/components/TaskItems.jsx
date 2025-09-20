import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, colors, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import ModalTaskDetail from '../../Modals/ModalTaskDetail/ModalTaskDetail';
import useDetailProjectContext from '../hooks/useDetailProjectContext';

import { DRAG_CARD } from '@/utils/constants';

export const TaskSortableItem = ({ id, item, listId }) => {
  const [, setSearchParams] = useSearchParams();
  const detailProjectContext = useDetailProjectContext();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      ...item,
      listId,
      type: DRAG_CARD,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClickTaskItem = (e) => {
    e.stopPropagation();
    detailProjectContext.setIsOpenTaskDetail(true);
    setSearchParams({ taskId: item.public_id });
  };

  return (
    <Box ref={setNodeRef} key={item.public_id}>
      <Paper
        elevation={2}
        sx={{
          ...style,
          cursor: 'pointer',
          ':hover': {
            background: colors.blue[50],
          },
        }}
        onClick={handleClickTaskItem}
        {...attributes}
        {...listeners}
      >
        <Stack
          sx={{
            minHeight: 80,
            justifyContent: 'space-between',
            p: 1,
          }}
          gap={2}
        >
          <Typography variant="body2" fontWeight={'bold'} flex={1}>
            {item.title}
          </Typography>
          <Stack direction="row" justifyContent={'space-between'}>
            <Typography variant="caption">{`${detailProjectContext.getProjectInitials}-${item.internal_id}`}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

const TaskItems = ({ activeOverItem, listId }) => {
  const { active, over, isOver } = activeOverItem || {};

  const detailProjectContext = useDetailProjectContext();
  const taskItemsData = detailProjectContext.getTaskItemsByListId(listId);
  const taskItemDataIds = useMemo(() => {
    return taskItemsData.map((item) => item.public_id);
  }, [taskItemsData]);

  useEffect(() => {
    const { active, over, isOver } = activeOverItem;
    console.log({ active, over, isOver });
  }, [activeOverItem, taskItemsData]);

  const renderTaskItems = () => {
    if (taskItemsData.length === 0) {
      return <></>;
    }

    return (
      <Stack
        gap={1}
        p={1}
        sx={{
          overflowY: 'auto',
          pb: 1,
        }}
      >
        <SortableContext
          items={taskItemDataIds}
          strategy={verticalListSortingStrategy}
        >
          {taskItemsData?.map((item) => (
            <TaskSortableItem
              key={item.public_id}
              id={item.public_id}
              item={item}
              listId={listId}
            />
          ))}
        </SortableContext>
      </Stack>
    );
  };

  return renderTaskItems();
};

export default TaskItems;
