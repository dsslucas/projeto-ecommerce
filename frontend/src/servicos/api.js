import axios from 'axios';

// Conexão via IP para conexão com dispositivos na mesma rede
// const api = axios.create({
//   baseURL: 'http://192.168.0.113:3003',
// });

const api = axios.create({
  baseURL: 'http://localhost:3003',
});

export default api;