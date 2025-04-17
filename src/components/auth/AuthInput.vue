<script setup>
	const model = defineModel();

	const props = defineProps({
		type: String,
		id: String,
		error: String,
		placeholder: String,
		position: {
			type: String,
			required: false,
		},
	})
</script>

<template>
	<div :class="['text-start', position]">
		<input 
			:type="type" 
			:id="id" 
			v-model="model" 
			class="form-control py-2 rounded-1 fm-input fm-auth-input" 
			:class="{'border-danger': error}" 
			:placeholder="placeholder"
		>
		<slot name="icon"></slot>
		<small v-if="error" class="text-danger">{{ error }}</small>
	</div>
</template>
