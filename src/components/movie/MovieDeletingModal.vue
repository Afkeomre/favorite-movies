<script setup>
	import { useModalStore } from '@/stores/modalStore';
	import AppModal from '../ui/AppModal.vue';

	const modalStore = useModalStore();
	const emit = defineEmits(['delete']);
</script>

<template>
	<AppModal @close="modalStore.close">
		<div class="modal-header">
			<h5 class="modal-title">Movie deletion</h5>
		</div>
		<div class="modal-body">
			<p>Are you sure you want to delete this movie from the&nbsp;collection?</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn py-2 rounded-1 text-white fm-btn" @click="modalStore.close">Cancel</button>
			<button type="button" class="btn btn-danger py-2 rounded-1 text-white" @click="$emit('delete')">Delete</button>
		</div>
	</AppModal>
</template>
