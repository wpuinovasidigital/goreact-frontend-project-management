import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useLoaderData,
  useSearchParams,
} from 'react-router';

import useDetailProjectContext from '@/components/pages/Projects/DetailProject/hooks/useDetailProjectContext';
import services from '@/services';


const useModalTaskDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [taskDetailData, setTaskDetailData] = useState({});
  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const taskId = searchParams.get('taskId');
  const listId = searchParams.get('listId');

  const fetchTaskDetail = async (taskId) => {
    const response = await services.cards.getDetail(taskId);
    setTaskDetailData(response.data.data);
  };

  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);

  const formTask = useForm({
    defaultValues: {
      description: taskDetailData.description || '',
      due_date: dayjs(taskDetailData.due_date) || dayjs().add(1, 'day'),
    },
  });

  const formTaskAssignees =
    useForm({
      defaultValues: {
        assignees: [],
      },
    });

  const onSubmitAssignees = async (values) => {
    setLoading(true);
    await services.cards.addAssignees(taskId, values.assignees);
    setLoading(false);
    setEditAssignee(false);
    fetchTaskDetail(taskId);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    await services.cards.update(taskDetailData.public_id, {
      list_id: listId,
      title: values.title ?? taskDetailData.title,
      due_date: values.due_date ?? taskDetailData.due_date,
      position: taskDetailData.position,
      description: values.description ?? taskDetailData.description,
    });
    await fetchTaskDetail(taskId);
    setLoading(false);
    setEditDescription(false);
    setEditDueDate(false);
    setEditTitle(false);
  };

  const handleDeleteTask = async () => {
    setLoading(true);
    await services.cards.remove(taskDetailData.public_id);
    setLoading(false);
    handleClose();
    await detailProjectContext.fetchBoardLists();
    setShowConfirmDelete(false);
  };

  const handleClose = useCallback(async () => {
    setSearchParams({});
    await detailProjectContext.fetchBoardLists();
  }, [taskDetailData]);

  useEffect(() => {
    if (taskId && listId) {
      fetchTaskDetail(taskId);
    }
  }, [taskId, listId]);

  return {
    taskDetailData,
    detailProjectData,
    isLoading,
    editDescription,
    editTitle,
    editDueDate,
    editAssignee,
    isShowConfirmDelete,

    setLoading,
    setEditDescription,
    setEditTitle,
    setEditDueDate,
    setEditAssignee,
    setShowConfirmDelete,

    formTask,
    formTaskAssignees,

    onSubmit,
    onSubmitAssignees,
    handleDeleteTask,
    handleClose,

    detailProjectContext,
    taskId,
    listId,
  }
};

export default useModalTaskDetail;
