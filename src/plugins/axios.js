import axios from 'axios';

// Configura a baseURL usando a variável de ambiente
// axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
// console.log('API Base URL:', process.env.VUE_APP_API_BASE_URL);

axios.defaults.baseURL = 'http://0.0.0.0:19003/api/';

// Adiciona um interceptor para incluir o token de autenticação
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('psg_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
