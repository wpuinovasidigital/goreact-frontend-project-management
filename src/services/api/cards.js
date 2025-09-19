import network from '@/utils/network';

const cards = {
  async create(data) {
    return network.post('/api/v1/cards', data);
  },
  async update(cardId, data) {
    return network.put(`/api/v1/cards/${cardId}`, data);
  },
};

export default cards;
