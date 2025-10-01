import { useSortable } from '@dnd-kit/sortable';
import useDetailProjectContext from './useDetailProjectContext';
import { DRAG_CARD } from '@/utils/constants';
import { useSearchParams } from 'react-router';

const useTaskSortableItem = ({ id, item, listId }) => {
  const detailProjectContext = useDetailProjectContext();

  const [,setSearchParams] = useSearchParams();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      ...item,
      type: DRAG_CARD,
    },
  });

  const handleClickTaskItem = (e) => {
    e.stopPropagation();
    detailProjectContext.setIsOpenTaskDetail(true);
    setSearchParams({taskId: item.public_id, listId});
  }

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

export default useTaskSortableItem;
