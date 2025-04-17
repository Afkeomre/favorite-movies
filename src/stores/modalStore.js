import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useModalStore = defineStore('modalStore', () => {
  const activeModal = ref(null);

  const open = (value) => {
    activeModal.value = value;
  };

  const close = () => {
    activeModal.value = null;
  };

  watch(activeModal, (val) => {
    if (val !== null) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    }
  });

  return {
    activeModal,
    open,
    close,
  };
});
