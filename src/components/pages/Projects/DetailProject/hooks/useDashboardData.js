import { useCallback, useEffect, useMemo, useState } from 'react';
import useDetailProjectContext from './useDetailProjectContext';
import services from '@/services';

const useDashboardData = () => {
  const [totalTaskSummary, setTotalTaskSummary] = useState([]);
  const [overdueTaskSummary, setOverdueTaskSummary] = useState([]);
  const [dueSoonTaskSummary, setDueSoonTaskSummary] = useState([]);
  const [workloadSummary, setWorkloadSummary] = useState([]);

  const { isLoadingBoardLists, boardListData, getTaskItemsByListId } =
    useDetailProjectContext();

  const mergeListAndTasksData = useMemo(() => {
    const taskItems = boardListData.map((item) => {
      const tasks = getTaskItemsByListId(item.public_id);
      return {
        ...item,
        tasks,
        count: tasks.length,
      };
    });

    return taskItems;
  }, [boardListData]);

  const fetchDetailTaskItems = useCallback(async () => {
    if (mergeListAndTasksData.length > 0 && !isLoadingBoardLists) {
      let workload = [];
      const tasks = [];
      const overdueTasks = [];
      const dueSoonTasks = [];

      // fetch detail task dari API supaya bisa mendapatkan data assignee
      for (const idx in mergeListAndTasksData) {
        const taskItem = mergeListAndTasksData[idx];
        const fetchTasks = await Promise.all(
          [...taskItem.tasks].map((item) =>
            services.cards.getDetail(item.public_id),
          ),
        );
        const tasksData = fetchTasks.map((item) => item?.data?.data);
        tasksData.forEach((item) => tasks.push(item));
      }

      console.log("tasks:", tasks);
    }
  }, [mergeListAndTasksData, isLoadingBoardLists]);

  useEffect(() => {
    fetchDetailTaskItems();
  }, [mergeListAndTasksData, isLoadingBoardLists]);

  return {};
};

export default useDashboardData;
