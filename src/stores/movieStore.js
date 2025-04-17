import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import movieAxios from '@/axios/movie';
import { useAuthStore } from './authStore';
import { useMessageStore } from './messageStore';

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref([]);
  const hasMovies = computed(() => movies.value.length !== 0);

  const authStore = useAuthStore();
  const messageStore = useMessageStore();

  const postMovie = async (movie) => {
    try {
      const token = authStore.token;
      const uid = authStore.uid;

      await movieAxios.post(`/collection/${uid}.json?auth=${token}`, movie);

      messageStore.setMessage({
        value: 'The movie was added to your collection',
        type: 'success',
      });
    } catch (e) {
      if (e.response.status !== 401) {
        messageStore.setMessage({
          value: e.response.data.error,
          type: 'danger',
        });
      }

      throw e;
    }
  };

  const loadMovies = async () => {
    try {
      const token = authStore.token;
      const uid = authStore.uid;

      const { data } = await movieAxios.get(`/collection/${uid}.json?auth=${token}`);

      const collection = data ? Object.keys(data).map((id) => ({ ...data[id], serverId: id })) : [];

      movies.value = collection;
    } catch (e) {
      messageStore.setMessage({
        value: e.response.data.error,
        type: 'danger',
      });
    }
  };

  const loadMovieById = async (id) => {
    try {
      const token = authStore.token;
      const uid = authStore.uid;

      const { data } = await movieAxios.get(`/collection/${uid}/${id}.json?auth=${token}`);

      if (data) {
        return { ...data, serverId: id };
      } else {
        return null;
      }
    } catch (e) {
      messageStore.setMessage({
        value: e.response.data.error,
        type: 'danger',
      });

      throw e;
    }
  };

  const updateMovie = async (movie, payload) => {
    try {
      const token = authStore.token;
      const uid = authStore.uid;

      await movieAxios.patch(`/collection/${uid}/${movie.serverId}.json?auth=${token}`, payload);

      messageStore.setMessage({
        type: 'success',
        value: 'Changes were saved',
      });
    } catch (e) {
      messageStore.setMessage({
        value: e.response.data.error,
        type: 'danger',
      });
    }
  };

  const removeMovie = async (movie) => {
    try {
      const token = authStore.token;
      const uid = authStore.uid;

      await movieAxios.delete(`/collection/${uid}/${movie.serverId}.json?auth=${token}`);

      messageStore.setMessage({
        value: 'The movie was successfully deleted',
        type: 'success',
      });
    } catch (e) {
      messageStore.setMessage({
        value: e.response.data.error,
        type: 'danger',
      });

      throw e;
    }
  };

  return {
    movies,
    hasMovies,
    postMovie,
    loadMovies,
    loadMovieById,
    updateMovie,
    removeMovie,
  };
});
