import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messageStore', () => {
  const message = ref(null);
  const hasImgMessage = ref(false);
  let timeoutId = null;

  const clearMessage = () => {
    message.value = null;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const setMessage = (objMessage) => {
    message.value = objMessage;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      clearMessage();
    }, 5000);
  };

  return {
    message,
    hasImgMessage,
    setMessage,
    clearMessage,
  };
});
