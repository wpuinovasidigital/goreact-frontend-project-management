import SidebarLayout from "@/components/layouts/SidebarLayout";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <SidebarLayout
        pageTitle="Selamat datang"
      >
      <Typography variant="h5">Klik menu Daftar Proyek untuk memulai</Typography>
    </SidebarLayout>
  )
};

export default Dashboard;