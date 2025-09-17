import network from '@/utils/network';

const lists = {
  async create(data) {
    return network.post('/api/v1/lists', data);
  },
  async remove(listId) {
    return network.delete(`/api/v1/lists/${listId}`);
  },
  async getCards(listId) {
    return network.get(`/api/v1/lists/${listId}/cards`);
  },
};

export default lists;
