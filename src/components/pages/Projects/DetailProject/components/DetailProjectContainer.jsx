import { Box, Stack, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import CreateNewList from './CreateNewList';
import ListSortableItem from './ListSortableItem';
import useDetailProjectContainer from '../hooks/useDetailProjectContainer';
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { DRAG_CARD, DRAG_LIST } from '@/utils/constants';
import TaskSortableItem from './TaskSortableItem';
import ProjectInfo from './ProjectInfo';
import ModalTaskDetail from '../../Modals/ModalTaskDetail';
import { useState } from 'react';
import Dashboard from './Dashboard';

const PanelDashboard = ({ value }) => {
  return (
    <TabPanel
      sx={{
        paddingY: 3,
        paddingX: 0,
      }}
      value={value}
    >
      <Dashboard />
    </TabPanel>
  );
};
const PanelProject = ({ value }) => {
  const {
    boardListData,
    activeDragItem,
    boardListDataMapPublicIds,
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    sensors,
  } = useDetailProjectContainer();

  const renderDragOverlay = () => {
    if (activeDragItem && activeDragItem.type === DRAG_LIST) {
      return (
        <ListSortableItem id={activeDragItem.public_id} item={activeDragItem} />
      );
    }
    if (activeDragItem && activeDragItem.type === DRAG_CARD) {
      return (
        <TaskSortableItem
          listId={activeDragItem.list_public_id}
          id={activeDragItem.public_id}
          item={activeDragItem}
        />
      );
    }
    return <></>;
  };
  return (
    <TabPanel
      sx={{
        paddingY: 3,
        paddingX: 0,
      }}
      value={value}
    >
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        sensors={sensors}
      >
        <ProjectInfo />
        <SortableContext
          items={boardListDataMapPublicIds}
          strategy={horizontalListSortingStrategy}
        >
          <Stack
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            gap={2}
            pb={5}
            sx={{
              overflowX: 'auto',
            }}
          >
            {boardListData?.map((item) => (
              <ListSortableItem
                key={item.public_id}
                id={item.public_id}
                item={item}
              />
            ))}
            <CreateNewList />
          </Stack>
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
    </TabPanel>
  );
};

const DetailProjectContainer = () => {
  const [activeTab, setActiveTab] = useState(2);

  const { detailProjectData, detailProjectContext } =
    useDetailProjectContainer();

  const handleChangeTab = (_, newValue) => {
    setActiveTab(newValue);
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
        <TabContext value={activeTab}>
          <TabList onChange={handleChangeTab}>
            <Tab label="Dashboard" value={1} />
            <Tab label="Project" value={2} />
          </TabList>
          <PanelDashboard value={1} />
          <PanelProject value={2} />
        </TabContext>
      </SidebarLayout>
      <ModalTaskDetail />
    </>
  );
};

export default DetailProjectContainer;
