<script setup>
	import AppInfoCard from '@/components/ui/AppInfoCard.vue';
	import AppLink from '@/components/ui/AppLink.vue';
</script>

<template>
	<AppInfoCard>
		<template v-slot:message>
			<span>This page was not found :( </span>
		</template>
		<template v-slot:link>
			<span>Return <AppLink path="/" text="to the homepage"/></span>
		</template>
	</AppInfoCard>
</template>
