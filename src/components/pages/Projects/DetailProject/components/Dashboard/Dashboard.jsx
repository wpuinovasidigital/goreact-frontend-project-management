import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import {
  AccessTimeFilled,
  Assignment,
  WarningAmber,
} from '@mui/icons-material';
import useDashboardData from '../../hooks/useDashboardData';

import DashboardTaskPercentage from './Charts/DashboardTaskPercentage';
import DashboardWorkload from './Charts/DashboardWorkload';
import DashboardKPICard from './KPI/DashboardKPICard';

const Dashboard = () => {
  const {
    isLoadingBoardLists,
    totalTaskSummary,
    workloadSummary,
    overdueTasksSummary,
    dueSoonTasksSummary,
    taskPercentageSummary,
    mergeListAndTasksData,
  } = useDashboardData();

  if (isLoadingBoardLists) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (mergeListAndTasksData?.length === 0) {
    return (
      <Typography>
        Belum ada data project. Klik menu "Project" untuk memulai
      </Typography>
    );
  }

  return (
    <Stack width={'100%'} gap={3}>
      <Stack
        direction={'row'}
        gap={1}
        justifyContent={'stretch'}
        alignItems={'stretch'}
      >
        <DashboardKPICard
          title="Total Tugas Proyek"
          value={totalTaskSummary.length}
          icon={Assignment}
          color="#1976d2"
        />
        <DashboardKPICard
          title="Total Tugas Melebihi Batas Waktu"
          value={overdueTasksSummary.length}
          icon={AccessTimeFilled}
          color="#d32f2f"
        />
        <DashboardKPICard
          title="Total Tugas Mendekati Batas Waktu"
          value={dueSoonTasksSummary.length}
          icon={WarningAmber}
          color="#ffa000"
        />
      </Stack>
      <Stack direction={'row'} gap={1} height={500}>
        <Stack gap={3} flex={1}>
          <Typography variant="h5">Sebaran tugas</Typography>
          <DashboardTaskPercentage data={taskPercentageSummary} />
        </Stack>

        <Stack gap={3} flex={1}>
          <Typography variant="h5">Pembagian Kerja</Typography>
          <DashboardWorkload data={workloadSummary} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
