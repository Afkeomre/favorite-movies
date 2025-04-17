<script setup>
	const props = defineProps({
		active: Boolean,
	});

	const emit = defineEmits(['setRating', 'enter']);
</script>

<template>
	<i 
		@click="$emit('setRating')" 
		@mouseenter="$emit('enter')"
		class="bi fm-movie-star-icon" 
		:class="active ? ['bi-star-fill', 'selected'] : 'bi-star'"
	>
	</i>
</template>
