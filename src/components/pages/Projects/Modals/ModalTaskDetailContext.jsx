import services from '@/services';
import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const defaultState = {
  taskDetailData: {},
  setTaskDetailData() {},
  taskId: '',
  listId: '',
  async fetchTaskDetail(taskId) {}
};

export const ModalTaskDetailContext = createContext(defaultState);

const ModalTaskDetailProvider = ({ children }) => {
  const [searchParams,] = useSearchParams();
  const [taskDetailData, setTaskDetailData] = useState({});

  const taskId = searchParams.get('taskId');
  const listId = searchParams.get('listId');

  const fetchTaskDetail = async (taskId) => {
    const response = await services.cards.getDetail(taskId);
    setTaskDetailData(response.data.data);
  };

  useEffect(() => {
    if (taskId && listId) {
      fetchTaskDetail(taskId);
    }
  }, [taskId, listId]);

  return (
    <ModalTaskDetailContext
      value={{
        taskId,
        listId,
        taskDetailData,
        fetchTaskDetail,
      }}
    >
      {children}
    </ModalTaskDetailContext>
  );
};

export default ModalTaskDetailProvider;
