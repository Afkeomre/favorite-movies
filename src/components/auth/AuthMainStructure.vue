<script setup>
	const props = defineProps({
		formType: {
			type: String,
			required: true,
			validator: (value) => {
				return ['signin', 'signup'].includes(value);
			}
		},
		title: String,
		description: String,
		formTitle: String,
		buttonText: String,
		questionText: String,
		linkText: String,
		disabled: Boolean,
	});

	const emit = defineEmits(['toggle', 'onSubmit'])
</script>

<template>
	<div class="row justify-content-center align-items-center mx-auto vh-100 fm-auth-main-structure-main-structure__row" :class="formType">
		<div class="col-md-5 col-lg-4 col-xl-3 d-none d-md-flex bg-white overflow-auto text-center text-white flex-column align-items-center justify-content-center px-4 border fm-auth-main-structure__col fm-auth-main-structure__col_details" :class="formType">
			<h4 class="bs-white fw-bold mb-4">{{ title }}</h4>
			<p>{{ description }}</p>
		</div>

		<div class="col-md-6 col-lg-5 col-xl-4 d-flex flex-column justify-content-evenly gap-2 bg-white overflow-auto px-3 py-5 p-md-5 text-center fm-auth-main-structure__col fm-auth-main-structure__col_content" :class="formType">
			<h4 class="fw-bold text-uppercase" v-html="formTitle"></h4>
			<form action="#" class="d-flex flex-column gap-3" @submit.prevent="$emit('onSubmit')"> 
				<slot></slot>
				<button type="submit" class="btn py-2 rounded-1 text-white fm-btn" :disabled="disabled">{{ buttonText }}</button> 
			</form>
			<div>
				{{ questionText }}
				<a href="#" class="link-underline link-underline-opacity-0 link-underline-opacity-75-hover fm-link" @click.prevent="$emit('toggle')">{{ linkText }}</a>
			</div>
		</div>
	</div>
</template>
