import network from '@/utils/network';
import session from '@/utils/session';

const boards = {
  async my(params = {}) {
    const sessionData = session.getSession();
    const role = sessionData.user.role;
    return role === 'admin'
      ? network.get(`/api/v1/boards`, { params })
      : network.get('/api/v1/boards/my', { params });
  },
  async detail(boardId) {
    return network.get(`/api/v1/boards/${boardId}`);
  },
  async lists(boardId) {
    return network.get(`/api/v1/boards/${boardId}/lists`);
  },
  async remove(boardId) {
    return network.delete(`/api/v1/boards/${boardId}`);
  },
  async create(payload) {
    return network.post('/api/v1/boards', payload);
  },
};

export default boards;
