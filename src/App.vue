<script setup>
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';
	import MainLayout from './layouts/MainLayout.vue';
	import AuthLayout from './layouts/AuthLayout.vue';

	const route = useRoute();
	const layout = computed(() => route.meta.layout === 'main' ? MainLayout : AuthLayout);
</script>

<template>
	<div v-cloak>
		<div class="background"></div>
		<div class="background-filter"></div>
		<component :is="layout" v-if="layout"></component>
	</div>
</template>
