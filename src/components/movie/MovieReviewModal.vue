<script setup>
	import AppModal from '../ui/AppModal.vue';
	import useReviewValidation from '@/composables/useReviewValidation';
	import { useModalStore } from '@/stores/modalStore';

	const modalStore = useModalStore();
	const tempReview = defineModel();
	const { errorMessage, currentNumber } = useReviewValidation(tempReview);

	const closeReviewModal = () => {
		tempReview.value = '';
		modalStore.close();
	};

	const emit = defineEmits(['save']);
</script>

<template>
		<AppModal @close="closeReviewModal">
		<div class="modal-header">
			<h5 class="modal-title">My review</h5>
		</div>
		<div class="modal-body">
			<textarea id="review" class="form-control fm-textarea" :class="{'border-danger': errorMessage}" v-model="tempReview" placeholder="Share your thoughts on the movie"></textarea>
			<div class="d-flex pt-1" :class="errorMessage ? 'justify-content-between' : 'justify-content-end'">
				<small v-if="errorMessage" class="text-danger">{{ errorMessage }}</small>
				<small class="text-right opacity-75">{{ currentNumber }}/500</small>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-danger py-2 rounded-1 text-white" @click="closeReviewModal">Close</button>
			<button type="button" class="btn py-2 rounded-1 text-white fm-btn" @click="$emit('save')" :disabled="!!errorMessage">Save changes</button>
		</div>
	</AppModal>
</template>
