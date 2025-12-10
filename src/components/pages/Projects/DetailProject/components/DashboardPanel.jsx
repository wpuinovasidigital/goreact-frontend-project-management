import { TabPanel } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import useDashboardData from '../hooks/useDashboardData';

const DashboardPanel = ({ value }) => {
  const {
    totalTaskSummary,
    dueSoonTasksSummary,
    overdueTasksSummary,
    workloadSummary,
  } = useDashboardData();
  return (
    <TabPanel
      value={value}
      sx={{
        paddingY: 3,
        paddingX: 0,
      }}
    >
      <Typography>Dashboard</Typography>
      <Box>
        {JSON.stringify({
          totalTaskSummary,
          dueSoonTasksSummary,
          overdueTasksSummary,
          workloadSummary,
        })}
      </Box>
    </TabPanel>
  );
};

export default DashboardPanel;
