import services from '@/services';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useModalTaskDetailContext from './useModalTaskDetailContext';
import { useState } from 'react';

const useTaskAssignees = () => {
  const detailProjectData = useLoaderData();
  const { fetchTaskDetail, taskId, membersData, taskDetailData } =
    useModalTaskDetailContext();
  const formTaskAssignees = useForm({
    defaultValues: {
      members: [],
    },
  });

  const [isLoading, setLoading] = useState(false);
  const [showFormAssignees, setShowFormAssignees] = useState(false);

  const onSubmitTaskAssignee = async (values) => {
    setLoading(true);

    await services.boards.addMember(
      detailProjectData.public_id,
      values.members,
    );
    await fetchTaskDetail(taskId);
    setLoading(false);
  };

  return {
    isLoading,
    membersData,
    formTaskAssignees,
    onSubmitTaskAssignee,
    taskDetailData,
    showFormAssignees,
    setShowFormAssignees,
  };
};

export default useTaskAssignees;
