import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useMessageStore } from './messageStore';

const baseUrl = 'https://api.themoviedb.org/3/search/movie?query=';
const detailUrl = 'https://api.themoviedb.org/3/movie/';

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  },
};

export const useSearchStore = defineStore('searchStore', () => {
  const findingMovies = ref([]);

  const hasFindingMovies = computed(() => findingMovies.value.length !== 0);

  const messageStore = useMessageStore();

  const getMovies = async (query) => {
    try {
      const { data } = await axios.get(`${baseUrl}${query}`, options);

      const detailResponses = await Promise.all(
        data.results.map((m) => axios.get(`${detailUrl}${m.id}`, options)),
      );

      const detailData = detailResponses.map((r) => {
        return {
          ...r.data,
          rating: 0,
          review: '',
        };
      });

      findingMovies.value = detailData;
    } catch (e) {
      messageStore.setMessage({
        value: e.response.data.status_message,
        type: 'danger',
      });

      throw e;
    }
  };

  const clearFindingMovies = () => {
    findingMovies.value = [];
  };

  return {
    findingMovies,
    hasFindingMovies,
    getMovies,
    clearFindingMovies,
  };
});
