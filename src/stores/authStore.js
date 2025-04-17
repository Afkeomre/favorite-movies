import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useMessageStore } from './messageStore';
import axios from 'axios';
import error from '@/utils/error';

const TOKEN_KEY = 'jwt-token';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY));
  const uid = ref(localStorage.getItem('uid'));
  const isAuthenticated = computed(() => !!token.value);

  const authenticate = async (payload, url) => {
    try {
      const { data } = await axios.post(url, {
        ...payload,
        returnSecureToken: true,
      });

      uid.value = data.localId;
      token.value = data.idToken;

      localStorage.setItem('uid', uid.value);
      localStorage.setItem(TOKEN_KEY, token.value);
    } catch (e) {
      const messageStore = useMessageStore();

      messageStore.setMessage({
        value: error(e.response.data.error.message),
        type: 'danger',
      });

      throw e;
    }
  };

  const signout = () => {
    token.value = null;
    uid.value = null;
    localStorage.removeItem('uid');
    localStorage.removeItem(TOKEN_KEY);
  };

  return {
    token,
    uid,
    isAuthenticated,
    authenticate,
    signout,
  };
});
