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
  async detail(id) {
    return network.get(`/api/v1/boards/${id}`);
  },
};

export default boards;
