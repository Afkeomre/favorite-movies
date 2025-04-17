<script setup>
  import * as yup from 'yup';
  import { useForm, useField } from 'vee-validate';
	import { ref, computed } from 'vue';
	import { useRouter } from 'vue-router';
	import { useAuthStore } from '@/stores/authStore';
	import useToggleVisibility from '@/composables/useToggleVisibility';
	import AuthMainStructure from './AuthMainStructure.vue';
	import AuthInput from './AuthInput.vue';
	import AuthEyeIcon from './AuthEyeIcon.vue';

	const router = useRouter();
	const authStore = useAuthStore();

	const signupEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_FB_KEY}`;

	const {
    passwordIcon,
		confirmationIcon,
    passwordType,
    confirmationType,
    toggleVisibility,
  } = useToggleVisibility();

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Please enter your name'),
    
    email: yup
      .string()
      .trim()
      .required('Please enter your email')
      .email('Enter a valid email'),
    
    password: yup
      .string()
      .trim()
      .required('Please enter your password')
      .min(6, 'Password must be 6 characters minimum'),
    
    passwordConfirmation: yup
      .string()
      .trim()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords do not match'), 

		policy: yup
			.boolean()
			.oneOf([true], 'You must agree to the terms and conditions')
  });

  const { handleSubmit, isSubmitting, errors } = useForm({
    validationSchema,
  });

  const { value: name } = useField('name');
  const { value: email } = useField('email');
  const { value: password } = useField('password');
  const { value: passwordConfirmation } = useField('passwordConfirmation');
	const { value: policy } = useField('policy');

  const onSubmit = handleSubmit(async values => {
		try {
			await authStore.authenticate(values, signupEndpoint);
			router.push('/');
		} catch (e) {}
  });

	const inputs = ref([
		{
			type: 'text',
			id: 'name',
			model: name,
			error: computed(() => errors.value.name),
			placeholder: 'Enter your name'
		},
		{
			type: 'email',
			id: 'email',
			model: email,
			error: computed(() => errors.value.email),
			placeholder: 'Enter your email'
		},
		{
			type: computed(() => passwordType.value),
			id: 'password',
			model: password,
			error: computed(() => errors.value.password),
			placeholder: 'Create password',
			position: 'position-relative',
			hasIcon: true,
			iconState: computed(() => passwordIcon.value)
		},
		{
			type: computed(() => confirmationType.value),
			id: 'passwordConfirmation',
			model: passwordConfirmation,
			error: computed(() => errors.value.passwordConfirmation),
			placeholder: 'Confirm password',
			position: 'position-relative',
			hasIcon: true,
			iconState: computed(() => confirmationIcon.value)
		}
	]);

  const emit = defineEmits(['toggle']);
</script>

<template>
	<AuthMainStructure
		form-type="signup"
		title="Create Account"
		description="To become a part of our community, please sign up using your personal information."
		form-title="Sign up <br>for Favorite Movies"
		button-text="Sign Up"
		question-text="Already have an account?"
		link-text="Sign in"
		:disabled="isSubmitting || Object.keys(errors).length > 0"
		@toggle="$emit('toggle')"
		@on-submit="onSubmit"
	>
		<AuthInput
			v-for="input in inputs" 
			:key="input.id" 
			:type="input.type"
			:id="input.id"
			v-model="input.model"
			:error="input.error"
			:placeholder="input.placeholder"
			:position="input.position"
		>
			<template v-slot:icon v-if="input.hasIcon">
				<AuthEyeIcon @on-click="toggleVisibility(input.id)" :icon-state="input.iconState" />
			</template>
		</AuthInput>

		<div class="text-start">
			<div class="d-flex gap-2">
				<input checked type="checkbox" id="policy" v-model="policy">
				<label for="policy">
					I agree the <a href="#" class="link-underline link-underline-opacity-0 link-underline-opacity-75-hover fm-link" @click.prevent>Terms & Conditions</a>
				</label>
			</div>
				<small v-if="errors.policy" class="text-danger">{{ errors.policy }}</small>
		</div>
	</AuthMainStructure>
</template>
