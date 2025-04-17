import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';

const movieAxios = axios.create({
  baseURL: import.meta.env.VITE_FB_URL,
});

movieAxios.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    const authStore = useAuthStore();
    authStore.signout();
    router.replace('/auth?type=signin&message=auth');
  }

  return Promise.reject(error);
});

export default movieAxios;
