import { ref, computed, watch } from 'vue';

const useReviewValidation = (temp) => {
  const touched = ref(false);
  const currentNumber = computed(() => temp.value.length);
  const errorMessage = computed(() => {
    if (temp.value.trim().length === 0 && touched.value) {
      return 'Review cannot be empty';
    } else if (temp.value.length > 500) {
      return 'Review must be 500 characters or less';
    } else {
      return '';
    }
  });

  watch(temp, (val) => {
    if (val.length > 0) {
      touched.value = true;
    }
  });

  return {
    errorMessage,
    currentNumber,
  };
};

export default useReviewValidation;
