<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useRouter, useRoute } from 'vue-router';
	import { useMessageStore } from '@/stores/messageStore';
	import AppModal from '@/components/ui/AppModal.vue';
	import AppMessage from '@/components/ui/AppMessage.vue';
	import AuthSignIn from '@/components/auth/AuthSignIn.vue';
	import AuthSignUp from '@/components/auth/AuthSignUp.vue';
	import error from '@/utils/error';

	const router = useRouter();
	const route = useRoute();
	const messageStore = useMessageStore();

	const hasAccount = ref(true);

	const form = computed(() => hasAccount.value ? AuthSignIn : AuthSignUp);
	const query = computed(() => form.value === AuthSignIn ? 'signin' : 'signup');

	const toggleForm = () => {
		hasAccount.value = !hasAccount.value;
		router.push({ query: { type: query.value } });
	};

	onMounted(() => {
		if (!route.query.type) {
			router.replace({ query: { type: 'signin' } });
		} else if (route.query.type === 'signup') {
			hasAccount.value = false;
		}

		if (route.query.message) {
			messageStore.setMessage({
				value: error(route.query.message),
				type: 'warning'
			});
		}
	});
</script>

<template>
	<Teleport to="body">
		<AppModal v-if="messageStore.message" @close="messageStore.clearMessage">
			<AppMessage />
		</AppModal>
	</Teleport>
	
	<component :is="form" @toggle="toggleForm"></component>
</template>
