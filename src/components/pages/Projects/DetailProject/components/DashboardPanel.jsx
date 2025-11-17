import { TabPanel } from '@mui/lab';
import { Typography } from '@mui/material';
import useDashboardData from '../hooks/useDashboardData';

const DashboardPanel = ({ value }) => {
  const {} = useDashboardData();
  return (
    <TabPanel
      value={value}
      sx={{
        paddingY: 3,
        paddingX: 0,
      }}
    >
      <Typography>Dashboard</Typography>
    </TabPanel>
  );
};

export default DashboardPanel;
