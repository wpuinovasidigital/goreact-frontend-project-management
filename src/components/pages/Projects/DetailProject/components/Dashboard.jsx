import { Box, Stack } from '@mui/material';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import useDetailProjectContainer from '../hooks/useDetailProjectContainer';

const PieChartWithCustomizedLabel = () => {
  const RADIAN = Math.PI / 180;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (
      cx == null ||
      cy == null ||
      innerRadius == null ||
      outerRadius == null
    ) {
      return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > ncx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <PieChart
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={true}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

const Dashboard = () => {
    const {
        boardListData
    } = useDetailProjectContainer();
    console.log("boardListData in Dashboard:", boardListData);
  const data = [
    {
      name: 'Todo',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'In Progress',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'QA',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Done',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];
  return (
    <Stack direction={'row'} width={'100%'} height={400} gap={1}>
      <Box flex={1}>
        <PieChartWithCustomizedLabel />
      </Box>
      <Box flex={1}>
        <AreaChart
          style={{
            width: '100%',
            maxWidth: '700px',
            maxHeight: '70vh',
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
            isAnimationActive={true}
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
            isAnimationActive={true}
          />
        </AreaChart>
      </Box>
    </Stack>
  );
};

export default Dashboard;
