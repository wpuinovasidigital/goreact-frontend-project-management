import { useSearchParams } from 'react-router';
import useDetailProjectContext from './useDetailProjectContext';
import { useSortable } from '@dnd-kit/sortable';
import { DRAG_CARD } from '@/utils/constants';

const useTaskItems = ({ id, item, listId }) => {
  const [, setSearchParams] = useSearchParams();
  const detailProjectContext = useDetailProjectContext();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      ...item,
      listId,
      type: DRAG_CARD,
    },
  });

  const handleClickTaskItem = (e) => {
    e.stopPropagation();
    detailProjectContext.setIsOpenTaskDetail(true);
    setSearchParams({ taskId: item.public_id });
  };

  return {
    detailProjectContext,
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    handleClickTaskItem,
  };
};
export default useTaskItems;
