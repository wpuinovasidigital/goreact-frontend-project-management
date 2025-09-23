import { Paper, Stack, Typography } from '@mui/material';
import useTaskSortableItem from '../hooks/useTaskSortableItem';
import { CSS } from '@dnd-kit/utilities';

const TaskSortableItem = ({ id, item, listId }) => {
  const {
    detailProjectContext,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useTaskSortableItem({ id, item, listId });
  return (
    <Paper
      ref={setNodeRef}
      sx={{
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'pointer',
        opacity: isDragging ? 0 : 1,
      }}
      elevation={2}
      {...attributes}
      {...listeners}
    >
      <Stack
        sx={{
          minHeight: 80,
          p: 1,
        }}
        gap={2}
        justifyContent={'space-between'}
      >
        <Typography variant="body2" fontWeight={600}>
          {item.title}
        </Typography>
        <Typography variant="caption">
          {detailProjectContext.getProjectInitials}-{item.internal_id}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default TaskSortableItem;
