import network from '@/utils/network';

const auth = {
  login(payload) {
    return network.post('/auth/login', payload);
  },
  signUp(payload) {
    return network.post('/auth/register', payload);
  }

};

export default auth;
