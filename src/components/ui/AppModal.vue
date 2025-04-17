<script setup>
	const emit = defineEmits(['close'])
</script>

<template>
	<div class="modal-wrapper">
		<div class="modal-backdrop opacity-50"></div>
		<div class="modal d-block" tabindex="-1" @click.self="$emit('close')">
			<div class="modal-dialog">
				<div class="modal-content rounded-0 position-relative">
					<slot></slot>
					<button type="button" class="btn-close position-absolute top-0 end-0 z-3 p-3 fm-no-shadow" @click="$emit('close')"></button>
				</div>
			</div>
		</div>
	</div>
</template>
