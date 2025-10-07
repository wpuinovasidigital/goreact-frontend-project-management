import services from '@/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import useModalTaskDetailContext from './useModalTaskDetailContext';

const taskAttachmentSchema = Yup.object({
  attachments: Yup.array(Yup.mixed()).min(1).required(),
});

const useTaskAttachments = () => {
  const [isLoading, setLoading] = useState(false);
  const [
    isShowConfirmDeleteTaskAttachment,
    setShowConfirmDeleteTaskAttachment,
  ] = useState({
    show: false,
    item: null,
  });

  const {
    taskDetailData,
    taskId,
    fetchTaskDetail,
  } = useModalTaskDetailContext();

  const formTaskAttachment = useForm({
    defaultValues: {
      attachments: [],
    },
    resolver: yupResolver(taskAttachmentSchema),
  });

  const onSubmitTaskAttachment = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', values.attachments[0]);
    await services.cards.uploadAttachment(taskDetailData.public_id, formData);
    await fetchTaskDetail(taskId);

    setLoading(false);
  };

  const onDeleteTaskAttachment = async (attachmentId) => {
    setLoading(true);
    await services.cards.deleteAttachment(
      taskDetailData.public_id,
      attachmentId,
    );
    await fetchTaskDetail(taskId);
    setLoading(false);
    setShowConfirmDeleteTaskAttachment(false);
  };

  return {
    taskDetailData,
    formTaskAttachment,
    isShowConfirmDeleteTaskAttachment,
    setShowConfirmDeleteTaskAttachment,
    isLoading,
    setLoading,

    onSubmitTaskAttachment,
    onDeleteTaskAttachment,
  };
};

export default useTaskAttachments;
