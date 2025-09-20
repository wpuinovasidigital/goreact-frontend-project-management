import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router';

import ModalAddNewMember from '../../Modals/ModalAddNewMember';
import ModalEditProject from '../../Modals/ModalEditProject';
import ModalTaskDetail from '../../Modals/ModalTaskDetail';
import useDetailProjectContext from '../hooks/useDetailProjectContext';

import CreateNewList from './CreateNewList';
import ListSortableItem from './ListSortableItem';
import ProjectInfo from './ProjectInfo';
import { TaskSortableItem } from './TaskItems';

import SidebarLayout from '@/components/layouts/SidebarLayout';
import { DRAG_CARD, DRAG_LIST } from '@/utils/constants';
import useDetailProjectContainer from '../hooks/useDetailProjectContainer';

const DetailProjectContainer = () => {
  const {
    detailProjectData,
    detailProjectContext,
    boardListData,
    boardListDataMapPublicId,
    activeDragItem,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useDetailProjectContainer();

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
            sensors={sensors}
            // collisionDetection={closestCorners}
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
      <ModalEditProject />
    </>
  );
};

export default DetailProjectContainer;
