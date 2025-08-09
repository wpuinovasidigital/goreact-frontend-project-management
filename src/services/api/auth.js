import network from '@/utils/network';

const auth = {
  login(payload) {
    return network.post('/auth/login', payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
};

export default auth;
