import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getTransactions = async () => {
  const response = await api.get('/transaction');
  return response.data;
};

export const addTransaction = async (transaction) => {
  const response = await api.post('/transaction', transaction);
  return response.data;
};
