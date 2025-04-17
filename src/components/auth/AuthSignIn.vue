<script setup>
	import * as yup from 'yup';
	import { useField, useForm } from 'vee-validate';
	import { ref, computed } from 'vue';
	import { useRouter } from 'vue-router';
	import { useAuthStore } from '@/stores/authStore';
	import useToggleVisibility from '@/composables/useToggleVisibility';
	import AuthMainStructure from './AuthMainStructure.vue';
	import AuthInput from './AuthInput.vue';
	import AuthEyeIcon from './AuthEyeIcon.vue';

	const router = useRouter();
	const authStore = useAuthStore();

	const signinEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FB_KEY}`;

	const {
		passwordIcon,
    passwordType,
    toggleVisibility,
  } = useToggleVisibility();

	const validationSchema = yup.object({
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
	});

	const { handleSubmit, isSubmitting, errors } = useForm({
		validationSchema
	});

	const { value: email } = useField('email');
	const { value: password } = useField('password');

	const onSubmit = handleSubmit(async values => {
		try {
			await authStore.authenticate(values, signinEndpoint);
			router.push('/');
		} catch (e) {}
	});

	const inputs = ref([
		{
			type: 'email',
			id: 'email',
			model: email,
			error: computed(() => errors.value.email),
			placeholder: 'Email'
		},
		{
			type: computed(() => passwordType.value),
			id: 'password',
			model: password,
			error: computed(() => errors.value.password),
			placeholder: 'Password',
			position: 'position-relative',
			hasIcon: true,
			iconState: computed(() => passwordIcon.value)
		}
	]);

	const emit = defineEmits(['toggle']);
</script>

<template>
	<AuthMainStructure
		form-type="signin"
		title="Welcome Back"
		description="Please sign in using your personal information  to access the features of&nbsp;the site."
		form-title="Sign in <br>to Favorite Movies"
		button-text="Sign In"
		question-text="Don't have an account?"
		link-text="Sign up"
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
	</AuthMainStructure>
</template>
