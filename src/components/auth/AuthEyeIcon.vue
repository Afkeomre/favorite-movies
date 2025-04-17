<script setup>
	const props = defineProps({
		iconState: {
			type: String,
			required: true,
			validator: (value) => {
				return ['bi-eye', 'bi-eye-slash'].includes(value);
			}
		}
	});

	const emit = defineEmits(['onClick']);
</script>

<template>
	<i @click="$emit('onClick')" class="bi position-absolute px-3 end-0 opacity-75 fm-auth-eye-icon" :class="iconState"></i>
</template>
