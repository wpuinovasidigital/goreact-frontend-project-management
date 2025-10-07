import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';
import useDetailProjectContext from '../../DetailProject/hooks/useDetailProjectContext';
import services from '@/services';
import { useForm } from 'react-hook-form';
import useModalTaskDetailContext from './useModalTaskDetailContext';

const useModalTaskDetail = () => {
  const [_, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);

  const [membersData, setMembersData] = useState([]);

  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();
  const modalTaskDetailContext = useModalTaskDetailContext();

  const taskId = modalTaskDetailContext.taskId;
  const listId = modalTaskDetailContext.listId;
  const taskDetailData = modalTaskDetailContext.taskDetailData;

  const formTask = useForm();
  const formTaskAssignee = useForm({
    defaultValues: {
      members: [],
    },
  });

  const fetchProjectMembers = async () => {
    const response = await services.boards.getMembers(
      detailProjectData.public_id,
    );
    setMembersData(response.data.data);
  };

  const onSubmit = async (values) => {
    setLoading(true);

    await services.cards.update(taskDetailData.public_id, {
      list_id: listId,
      title: values.title ?? taskDetailData.title,
      due_date: values.due_date ?? taskDetailData.due_date,
      description: values.description ?? taskDetailData.description,
      position: taskDetailData.position,
    });
    await modalTaskDetailContext.fetchTaskDetail(taskId);
    setLoading(false);
    setEditDescription(false);
    setEditTitle(false);
    setEditDueDate(false);
  };

  const onSubmitTaskAssignee = async (values) => {
    setLoading(true);

    await services.boards.addMember(
      detailProjectData.public_id,
      values.members,
    );
    await fetchTaskDetail(taskId);
    setLoading(false);
    setEditDescription(false);
    setEditTitle(false);
    setEditDueDate(false);
  };

  const handleDeleteTask = async () => {
    setLoading(true);
    await services.cards.remove(taskDetailData.public_id);
    handleClose();
  };

  const handleClose = async () => {
    setSearchParams({});
    setLoading(false);
    setShowConfirmDelete(false);
    await detailProjectContext.fetchBoardLists();
  };

  return {
    taskDetailData,
    isLoading,
    editDescription,
    editTitle,
    editDueDate,
    editAssignee,
    isShowConfirmDelete,
    membersData,

    setLoading,
    setEditDescription,
    setEditTitle,
    setEditDueDate,
    setEditAssignee,
    setShowConfirmDelete,
    setMembersData,

    detailProjectData,
    taskId,
    listId,
    
    formTask,
    formTaskAssignee,

    onSubmit,
    onSubmitTaskAssignee,

    handleDeleteTask,
    handleClose,
  };
};

export default useModalTaskDetail;
