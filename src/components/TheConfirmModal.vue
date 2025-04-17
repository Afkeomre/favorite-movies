<script setup>
	import { useRouter } from 'vue-router';
	import AppModal from './ui/AppModal.vue';
	import { useModalStore } from '@/stores/modalStore';
	import { useAuthStore } from '@/stores/authStore';

	const router = useRouter();
	const authStore = useAuthStore();
	const modalStore = useModalStore();

	const signout = () => {
		modalStore.close();
		authStore.signout();
		router.push('/auth');
	}
</script>

<template>
	<AppModal @close="modalStore.close">
		<div class="modal-body">
			<p class="text-center fs-5 pt-3">Do you really want to sign out?</p>
		</div>
		<div class="modal-footer justify-content-center">
			<button type="button" class="btn py-2 rounded-1 text-white fm-btn" @click="modalStore.close">No</button>
			<button type="button" class="btn btn-danger py-2 rounded-1 text-white" @click="signout">Yes</button>
		</div>
	</AppModal>
</template>
