import { useDroppable } from '@dnd-kit/core';
import useDetailProjectContext from './useDetailProjectContext';
import { useSortable } from '@dnd-kit/sortable';
import services from '@/services';
import { DRAG_LIST } from '@/utils/constants';

const useListSortableItem = ({ id, item }) => {
  const detailProjectContext = useDetailProjectContext();
  const taskItems = detailProjectContext.getTaskItemsByListId(item.public_id);

  const {
    setNodeRef: setNodeRefDroppable,
    isOver,
    active,
    over,
  } = useDroppable({
    id,
    data: {
      ...item,
      type: DRAG_LIST,
    },
  });
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        ...item,
        type: DRAG_LIST,
      },
    });

  const handleDeleteList = (listId) => async (e) => {
    await services.lists.remove(listId);
    await detailProjectContext.fetchBoardLists();
  };

  return {
    detailProjectContext,
    taskItems,
    isOver,
    active,
    over,
    setNodeRefDroppable,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    handleDeleteList,
  };
};

export default useListSortableItem;
