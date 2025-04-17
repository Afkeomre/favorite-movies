<script setup>
	import { storeToRefs } from 'pinia';
	import { useMessageStore } from '@/stores/messageStore';

	const messageStore = useMessageStore();
	const { message } = storeToRefs(messageStore);

	const TITLE_MAP = {
		success: 'Successfully!',
		danger: 'Error!',
		warning: 'Attention!'
	}
</script>

<template>
	<div class="alert mb-0 rounded-0" :class="`alert-${message.type}`">
		<h4 class="alert-heading">{{ TITLE_MAP[message.type] }}</h4>
		<p>{{ message.value }}</p>
	</div>
</template>

