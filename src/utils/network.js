import axios from 'axios';

import session from './session';

export const BASE_URL = 'http://103.49.239.40:3030';

const network = axios.create({
  baseURL: BASE_URL,
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
    if (error.response && error.response.status === 401) {
      session.clearSession();
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default network;
