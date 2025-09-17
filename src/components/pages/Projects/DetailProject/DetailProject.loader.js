import services from '@/services';
import { useParams } from 'react-router';

export default async function detailProjectLoader({ params }) {
  const boardId = params.id;

  const response = await services.boards.detail(boardId);

  return response.data.data;
}
