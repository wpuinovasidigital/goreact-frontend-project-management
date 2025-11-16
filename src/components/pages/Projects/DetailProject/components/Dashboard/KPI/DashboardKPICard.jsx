import { Box, Card, CardContent, Typography } from '@mui/material';

const DashboardKPICard = ({ title, value, icon: IconComponent, color }) => {
  return (
    <Card sx={{ minWidth: 275, width: '100%', bgcolor: color, color: 'white' }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom sx={{ opacity: 0.8 }}>
          {title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Nilai Angka Besar */}
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>

          {/* Ikon Pendukung (opsional) */}
          {IconComponent && (
            <IconComponent sx={{ fontSize: 40, opacity: 0.7 }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardKPICard;
