import services from '@/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useDetailProjectContext from './useDetailProjectContext';
import { transformTasksToWorkloadData } from '@/utils/dataTransforms';
import datetime from '@/utils/datetime';

const useDashboardData = () => {
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

  const taskPercentageSummary = useMemo(() => {
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
      count: item.count,
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

  return {
    totalTaskSummary,
    workloadSummary,
    overdueTasksSummary,
    dueSoonTasksSummary,
    taskPercentageSummary,
    mergeListAndTasksData,
    isLoadingBoardLists,
  };
};

export default useDashboardData;
