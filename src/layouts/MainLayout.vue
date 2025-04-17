<script setup>
	import { useModalStore } from '@/stores/modalStore';
	import TheNavbar from '@/components/TheNavbar.vue';
	import TheConfirmModal from '@/components/TheConfirmModal.vue';

	const modalStore = useModalStore();
</script>

<template>
	<Teleport to="body">
		<TheConfirmModal v-if="modalStore.activeModal === 'confirm'" />
	</Teleport>

	<TheNavbar />

	<div class="container pb-5">
		<RouterView />
	</div>
</template>
