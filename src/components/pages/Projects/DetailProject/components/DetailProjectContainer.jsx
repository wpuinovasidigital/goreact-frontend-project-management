import { Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import SidebarLayout from '@/components/layouts/SidebarLayout';
import useDetailProjectContainer from '../hooks/useDetailProjectContainer';
import ModalTaskDetail from '../../Modals/ModalTaskDetail';
import { useState } from 'react';
import DashboardPanel from './DashboardPanel';
import ProjectBoardPanel from './ProjectBoardPanel';
import ModalEditProject from '../../Modals/ModalEditProject';

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
          <DashboardPanel value={1} />
          <ProjectBoardPanel value={2} />
        </TabContext>
      </SidebarLayout>
      <ModalTaskDetail />
      <ModalEditProject />
    </>
  );
};

export default DetailProjectContainer;
