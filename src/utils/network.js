import axios from 'axios';

import session from './session';

const network = axios.create({
  baseURL: 'http://103.49.239.40:3030',
});

network.interceptors.request.use(
  (config) => {
    const token = session.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

network.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data.response_code === 401) {
      session.clearSession();
    }

    return Promise.reject(error);
  },
);

export default network;
