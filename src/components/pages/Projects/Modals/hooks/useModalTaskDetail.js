import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';
import useDetailProjectContext from '../../DetailProject/hooks/useDetailProjectContext';
import services from '@/services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';

const taskAttachmentSchema = Yup.object({
  attachments: Yup.array(Yup.mixed()).min(1).required(),
});

const useModalTaskDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [taskDetailData, setTaskDetailData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editAssignee, setEditAssignee] = useState(false);
  const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);
  const [
    isShowConfirmDeleteTaskAttachment,
    setShowConfirmDeleteTaskAttachment,
  ] = useState({
    show: false,
    item: null,
  });

  const [membersData, setMembersData] = useState([]);

  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();

  const taskId = searchParams.get('taskId');
  const listId = searchParams.get('listId');

  const formTask = useForm();
  const formTaskAssignee = useForm({
    defaultValues: {
      members: [],
    },
  });
  const formTaskAttachment = useForm({
    defaultValues: {
      attachments: [],
    },
    resolver: yupResolver(taskAttachmentSchema),
  });

  const fetchTaskDetail = async (taskId) => {
    const response = await services.cards.getDetail(taskId);
    setTaskDetailData(response.data.data);

    // fetch project members
    await fetchProjectMembers();
  };

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
    await fetchTaskDetail(taskId);
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

  const onSubmitTaskAttachment = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', values.attachments[0]);
    await services.cards.uploadAttachment(taskDetailData.public_id, formData);
    await fetchTaskDetail(taskId);
    setLoading(false);
    setEditDescription(false);
    setEditTitle(false);
    setEditDueDate(false);
  };

  const onDeleteTaskAttachment = async (attachmentId) => {
    setLoading(true);
    await services.cards.deleteAttachment(
      taskDetailData.public_id,
      attachmentId,
    );
    await fetchTaskDetail(taskId);
    setLoading(false);
    setEditDescription(false);
    setEditTitle(false);
    setEditDueDate(false);
    setShowConfirmDeleteTaskAttachment(false);
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

  useEffect(() => {
    if (taskId && listId) {
      fetchTaskDetail(taskId);
    }
  }, [taskId, listId]);

  return {
    searchParams,
    taskDetailData,
    isLoading,
    editDescription,
    editTitle,
    editDueDate,
    editAssignee,
    isShowConfirmDelete,
    membersData,
    isShowConfirmDeleteTaskAttachment,

    setSearchParams,
    setTaskDetailData,
    setLoading,
    setEditDescription,
    setEditTitle,
    setEditDueDate,
    setEditAssignee,
    setShowConfirmDelete,
    setMembersData,
    setShowConfirmDeleteTaskAttachment,

    detailProjectData,
    detailProjectContext,

    taskId,
    listId,

    formTask,
    formTaskAssignee,
    formTaskAttachment,

    onSubmit,
    onSubmitTaskAssignee,
    onSubmitTaskAttachment,
    onDeleteTaskAttachment,

    handleDeleteTask,
    handleClose,
  };
};

export default useModalTaskDetail;
