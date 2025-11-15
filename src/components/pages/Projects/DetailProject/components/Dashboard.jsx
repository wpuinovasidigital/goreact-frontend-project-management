import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
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
  Legend,
} from 'recharts';
import useDetailProjectContainer from '../hooks/useDetailProjectContainer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useDetailProjectContext from '../hooks/useDetailProjectContext';
import services from '@/services';
import {
  AccessTimeFilled,
  Assignment,
  WarningAmber,
} from '@mui/icons-material';
import datetime from '@/utils/datetime';
import dayjs from 'dayjs';

/**
 * Fungsi untuk menghasilkan warna heksadesimal acak (misalnya: #A34FBC).
 * Sumber: https://stackoverflow.com/a/40026214
 * @returns {string} Warna heksadesimal acak
 */
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PieChartWithCustomizedLabel = ({ data }) => {
  const RADIAN = Math.PI / 180;

  const COLORS = useMemo(() => data.map(() => getRandomColor()), [data]);

  const renderCustomizedLabel = (config) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = config;

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
            key={`cell-${entry.title}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  );
};

const DashboardKPICard = ({ title, value, icon: IconComponent, color }) => {
  return (
    <Card sx={{ minWidth: 275, width: '100%', bgcolor: color, color: 'white' }}>
      <CardContent>
        {/* Judul Metrik */}
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

function transformTasksToWorkloadData(allTasks, listId) {
  // ID untuk list 'Done' harus diketahui (asumsi 148 dari contoh sebelumnya

  // 1. FILTER tugas yang belum selesai
  const activeTasks = allTasks.filter(
    (task) => task.list_internal_id !== listId,
  );

  // 2. REDUCE untuk menghitung frekuensi beban kerja
  const assigneeCounts = activeTasks.reduce((accumulator, task) => {
    const assignees = task.assignees;

    if (!assignees || assignees.length === 0) {
      // Tugas tanpa assignee
      accumulator['Unassigned'] = (accumulator['Unassigned'] || 0) + 1;
    } else {
      // Tugas dengan satu atau lebih assignees
      assignees.forEach((assignee) => {
        const name = assignee.user.name;
        accumulator[name] = (accumulator[name] || 0) + 1;
      });
    }
    return accumulator;
  }, {});

  // 3. MAP untuk menghasilkan struktur data final untuk Recharts
  const workloadData = Object.keys(assigneeCounts).map((name) => ({
    assignee: name,
    taskCount: assigneeCounts[name],
  }));

  // Opsional: Urutkan untuk tampilan bar chart yang lebih baik (misalnya dari beban tertinggi)
  workloadData.sort((a, b) => b.taskCount - a.taskCount);

  return workloadData;
}

// Gunakan fungsi ini dengan data JSON Anda:
// const finalWorkloadData = transformTasksToWorkloadData(JSON_DATA_ARRAY);

const Dashboard = () => {
  const [totalTaskSummary, setTotalTaskSummary] = useState([]);
  const [workloadSummary, setWorkloadSummary] = useState([]);
  const [overdueTasksSummary, setOverdueTasksSummary] = useState([]);
  const [dueSoonTasksSummary, setDueSoonTasksSummary] = useState([]);

  const { isLoadingBoardLists, boardListData, getTaskItemsByListId } =
    useDetailProjectContext();

  const mergeListAndTasksData = useMemo(() => {
    const taskItems = boardListData.map((item) => {
      const { title } = item;
      const tasks = getTaskItemsByListId(item.public_id);
      return {
        ...item,
        title,
        tasks,
        count: tasks.length,
      };
    });
    return taskItems;
  }, [boardListData]);

  const pieChartData = useMemo(() => {
    const taskItems = boardListData.map((item) => {
      const { title } = item;
      const tasks = getTaskItemsByListId(item.public_id);
      return {
        title,
        tasks,
        count: tasks.length,
      };
    });

    const taskItemsTotal = taskItems.reduce((a, b) => {
      return a + b.count;
    }, 0);

    return [...taskItems].map((item) => ({
      name: item.title,
      value: Math.floor((item.count / taskItemsTotal) * 100), // percentage
    }));
  }, [boardListData]);

  const fetchDetailTaskItems = useCallback(async () => {
    if (mergeListAndTasksData.length > 0 && !isLoadingBoardLists) {
      let workload = [];
      const tasks = [];
      const tasksOnly = [];
      const overdueTasks = [];
      const dueSoonTasks = [];

      for (const lineChartDataIdx in mergeListAndTasksData) {
        const lineChartDataItem = mergeListAndTasksData[lineChartDataIdx];
        const fetchTasks = await Promise.all(
          [...lineChartDataItem.tasks].map((item) =>
            services.cards.getDetail(item.public_id),
          ),
        );
        const taskData = fetchTasks.map((item) => item?.data?.data);

        taskData.forEach((item) => tasksOnly.push(item));

        tasks.push({ title: lineChartDataItem.title, tasks: taskData });
      }

      for (const idx in tasksOnly) {
        const taskItem = tasksOnly[idx];
        workload = transformTasksToWorkloadData(
          tasksOnly,
          taskItem.internal_id,
        );

        const now = datetime.getNow();
        const isOverdue = datetime.isSameOrAfter(
          now.toISOString(),
          taskItem.due_date,
        );
        const diff = datetime.getDiff(taskItem.due_date, now.toISOString());

        if (isOverdue) {
          overdueTasks.push(taskItem);
        } else if (diff <= 3 && diff >= 1) {
          dueSoonTasks.push(taskItem);
        }
      }

      setWorkloadSummary(workload);
      setOverdueTasksSummary(overdueTasks);
      setDueSoonTasksSummary(dueSoonTasks);
      setTotalTaskSummary(tasksOnly);
    }
  }, [mergeListAndTasksData]);

  useEffect(() => {
    fetchDetailTaskItems();
  }, [mergeListAndTasksData, isLoadingBoardLists]);


  if (isLoadingBoardLists) {
    return <>Loading....</>;
  }

  if (mergeListAndTasksData?.length === 0) {
    return (
      <Typography>Belum ada data project. Klik menu "Project" untuk memulai</Typography>
    )
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
          <PieChartWithCustomizedLabel data={pieChartData} />
        </Stack>

        <Stack gap={3} flex={1}>
          <Typography variant="h5">Pembagian Kerja</Typography>

          <AreaChart
            style={{
              width: '100%',
              maxWidth: '700px',
              maxHeight: '70vh',
              aspectRatio: 1.618,
            }}
            responsive
            data={workloadSummary}
          >
            <defs>
              <linearGradient id="colorTaskCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="assignee" />
            <YAxis width="auto" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="taskCount"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorTaskCount)"
              isAnimationActive={true}
            />
          </AreaChart>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
