import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/users/login/', { username, password });
  return response.data.token;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/users/', { username, email, password });
  return response.data;
};

export const logout = async (token: string) => {
    const response = await api.post('/users/logout/', { token });
    return response.data;
  };


export const getStudents = async (page = 1) => {
    const response = await api.get('/students/', {
      params: { page },
    });
    return response.data;
  };

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/file-uploads/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
