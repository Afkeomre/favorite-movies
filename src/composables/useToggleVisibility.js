import { ref, computed } from 'vue';

const useToggleVisibility = () => {
  const showPassword = ref(true);
  const showConfirmation = ref(true);

  const passwordType = computed(() => (showPassword.value ? 'password' : 'text'));
  const confirmationType = computed(() => (showConfirmation.value ? 'password' : 'text'));

  const passwordIcon = computed(() => (showPassword.value ? 'bi-eye-slash' : 'bi-eye'));
  const confirmationIcon = computed(() => (showConfirmation.value ? 'bi-eye-slash' : 'bi-eye'));

  const toggleVisibility = (field) => {
    if (field === 'password') {
      showPassword.value = !showPassword.value;
    } else if (field === 'passwordConfirmation') {
      showConfirmation.value = !showConfirmation.value;
    }
  };

  return {
    passwordIcon,
    confirmationIcon,
    passwordType,
    confirmationType,
    toggleVisibility,
  };
};

export default useToggleVisibility;
