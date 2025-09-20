import network from '@/utils/network';
import session from '@/utils/session';

const boards = {
  async myBoards(params) {
    return network.get(
      session.isAdmin() ? '/api/v1/boards' : '/api/v1/boards/my',
      {
        params,
      },
    );
  },

  async create(data) {
    return network.post('/api/v1/boards', data);
  },

  async update(boardId, data) {
    return network.put(`/api/v1/boards/${boardId}`, data);
  },

  async detail(boardId) {
    return network.get(`/api/v1/boards/${boardId}`);
  },

  async lists(boardId) {
    return network.get(`/api/v1/boards/${boardId}/lists`);
  },

  async updateListsPosition(boardId, data) {
    return network.put(`/api/v1/boards/${boardId}/positions`, data);
  },

  async addMember(boardId, userIds) {
    return network.post(`/api/v1/boards/${boardId}/members`, userIds);
  },

  async getMembers(boardId) {
    return network.get(`/api/v1/boards/${boardId}/members`);
  },
};

export default boards;
