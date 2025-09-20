import { useLoaderData } from 'react-router';
import useDetailProjectContext from '../hooks/useDetailProjectContext';
import { useMemo, useState } from 'react';
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import ListSortableItem from './ListSortableItem';
import { TaskSortableItem } from './TaskItems';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Box, LinearProgress, Stack } from '@mui/material';
import CreateNewList from './CreateNewList';
import ModalTaskDetail from '../../Modals/ModalTaskDetail';
import { DRAG_CARD, DRAG_LIST } from '@/utils/constants';
import ProjectDuration from './ProjectInfo';
import ModalAddNewMember from '../../Modals/ModalAddNewMember';
import ProjectInfo from './ProjectInfo';

const DetailProjectContainer = () => {
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
  const handleDragCancel = () => setActiveDragItem(null);
  const handleDragOver = () => {
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
    <>
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
        <ProjectInfo />
        <Stack
          direction={'row'}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          gap={2}
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
      <ModalTaskDetail />
      <ModalAddNewMember />
    </>
  );
};

export default DetailProjectContainer;
