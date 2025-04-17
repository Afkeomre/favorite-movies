import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loadingStore', () => {
  const loading = ref(false);

  const showLoader = () => {
    loading.value = true;
  };

  const hideLoader = () => {
    loading.value = false;
  };

  return {
    loading,
    showLoader,
    hideLoader,
  };
});
