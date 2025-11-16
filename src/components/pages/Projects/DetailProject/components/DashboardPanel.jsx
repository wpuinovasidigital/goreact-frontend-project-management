import { TabPanel } from "@mui/lab";
import Dashboard from "./Dashboard";

const DashboardPanel = ({value}) => {
    return (
        <TabPanel value={value} sx={{paddingY:3,  paddingX: 0}}>
            <Dashboard />
        </TabPanel>
    )
}

export default DashboardPanel;