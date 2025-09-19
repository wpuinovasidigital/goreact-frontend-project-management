import {
  Box,
  colors,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import { useLoaderData } from 'react-router';
import { useMemo, useState } from 'react';
import services from '@/services';
import {
  DeleteForever,
  
} from '@mui/icons-material';
import TaskItems, { TaskSortableItem } from './components/TaskItems/TaskItems';
import CreateNewList from './components/CreateNewList/CreateNewList';
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DRAG_LIST, DRAG_CARD } from '@/utils/constants';
import useDetailProjectContext from './hooks/useDetailProjectContext';
import DetailProjectProvider from './DetailProjectContext';
import CreateNewTask from './components/CreateNewTask/CreateNewTask';

const ListSortableItem = ({ id, item }) => {
  const detailProjectContext = useDetailProjectContext();
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
        height: 850,
        flexBasis: 300,
        flexShrink: 0,
        overflowX: 'hidden',
        p: 1,
        borderRadius: 1,
      }}
      ref={setNodeRefDroppable}
    >
      <Paper
        ref={setNodeRef}
        sx={{
          width: '100%',
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          p={2}
          borderBottom={`1px solid ${colors.grey[300]}`}
          sx={{
            background: colors.grey[50],
            cursor: 'grab',
          }}
          {...attributes}
          {...listeners}
        >
          <Typography variant="body1" fontWeight={'bold'}>
            {item.title}
          </Typography>

          <IconButton
            size="small"
            color={'error'}
            onClick={handleDeleteList(item.public_id)}
          >
            <DeleteForever />
          </IconButton>
        </Stack>
        <CreateNewTask listId={item.public_id} />
        {isOver && active.data.current.type === DRAG_CARD && (
          <Box>
            <Typography
              variant="body2"
              textAlign={'center'}
              p={1}
              color={colors.grey[500]}
            >
              Tarik dan lepas untuk memindahkan tugas ke daftar ini
            </Typography>
          </Box>
        )}
        <TaskItems listId={item.public_id} />
      </Paper>
    </Box>
  );
};

const DetailProjectComponent = () => {
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const boardListData = detailProjectContext.boardListData;
  const isLoadingBoardLists = detailProjectContext.isLoadingBoardLists;

  const [activeDragItem, setActiveDragItem] = useState(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  const sensors = useSensors(mouseSensor, pointerSensor, keyboardSensor);

  const handleDragStart = (event) =>
    setActiveDragItem(event.active.data.current);
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    // handle moving between lists
    const isDragListType =
      active.data.current.type === DRAG_LIST &&
      over.data.current.type === DRAG_LIST;

    detailProjectContext.setUpdateTaskItemPosition({
      active: active.data.current,
      over: over.data.current,
      isDragListType,
      isSameList:
        active.data.current.list_internal_id ===
        (over.data.current.list_internal_id || over.data.current.internal_id),
    });
    setActiveDragItem(null);
  };
  const handleDragCancel = (event) => setActiveDragItem(null);
  const handleDragOver = (event) => {
    console.log('drag over', event);
    detailProjectContext.setIsOver(true);
  };

  const boardListDataMapPublicId = useMemo(() => {
    return boardListData.map((item) => item.public_id);
  }, [boardListData]);

  const renderDragOverlay = () => {
    if (activeDragItem && activeDragItem?.type === DRAG_LIST) {
      return (
        <ListSortableItem id={activeDragItem.public_id} item={activeDragItem} />
      );
    }

    if (activeDragItem && activeDragItem?.type === DRAG_CARD) {
      return (
        <TaskSortableItem
          id={activeDragItem.public_id}
          item={activeDragItem}
          listId={activeDragItem.listId}
        />
      );
    }

    return <></>;
  };

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
    >
      {isLoadingBoardLists && (
        <Box p={1}>
          <LinearProgress />
        </Box>
      )}

      <Stack
        direction={'row'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        sx={{
          pb: 5,
          overflowX: 'auto',
        }}
      >
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          onDragOver={handleDragOver}
          sensors={sensors}
          // collisionDetection={closestCenter}
        >
          {/* Sortable List */}
          <SortableContext
            items={boardListDataMapPublicId}
            strategy={horizontalListSortingStrategy}
          >
            {boardListData?.map((item) => (
              <ListSortableItem
                key={item.public_id}
                id={item.public_id}
                item={item}
              />
            ))}
          </SortableContext>
          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: '0.4',
                  },
                },
              }),
            }}
          >
            {renderDragOverlay()}
          </DragOverlay>
        </DndContext>
        <CreateNewList />
      </Stack>
    </SidebarLayout>
  );
};

const DetailProject = () => {
  return (
    <DetailProjectProvider>
      <DetailProjectComponent />
    </DetailProjectProvider>
  );
};

export default DetailProject;
