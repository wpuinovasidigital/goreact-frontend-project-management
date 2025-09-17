import network from '@/utils/network';

const cards = {
  async create(data) {
    return network.post('/api/v1/cards', data);
  },
};

export default cards;
