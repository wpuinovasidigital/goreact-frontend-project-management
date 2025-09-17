import services from '@/services';
import { Box, colors, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateNewTask from '../CreateNewTask/CreateNewTask';

const TaskItems = ({ listId }) => {
  const [isLoading, setLoading] = useState(false);
  const [taskItemsData, setTaskItemsData] = useState([]);

  const fetchTaskItems = async () => {
    setLoading(true);
    const response = await services.lists.getCards(listId);
    console.log('fetchTaskItems: ', response.data.data);
    setTaskItemsData(response.data.data);
    setLoading(false);
  };

  const handleSuccessCreateNewTask = async () => {
    await fetchTaskItems();
  };

  useEffect(() => {
    fetchTaskItems();
  }, [listId]);

  const renderTaskItems = () => {
    if (taskItemsData.length === 0) {
      return <></>;
    }

    return (
      <>
        {taskItemsData?.map((item) => (
          <Box p={2}>
            <Paper
              sx={{
                p: 1,
                background: colors.grey[100],
                minHeight: 80,
              }}
            >
              <Typography variant="body2">{item.title}</Typography>
            </Paper>
          </Box>
        ))}
      </>
    );
  };

  return (
    <>
      {renderTaskItems()}
      <CreateNewTask listId={listId} onSuccess={handleSuccessCreateNewTask} />
    </>
  );
};

export default TaskItems;
