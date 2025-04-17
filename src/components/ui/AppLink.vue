<script setup>
	const props = defineProps({
		text: String,
		path: String
	})
</script>

<template>
	<router-link :to="path" class="link-underline link-underline-opacity-0 link-underline-opacity-75-hover fm-link">{{ text }}</router-link>
</template>