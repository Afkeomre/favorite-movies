<script setup>
	const props = defineProps({
		margin: {
			type: String,
			required: false,
			default: 'mt-4'
		}
	});
</script>

<template>
	<div class="row">
		<div class="col-12">
			<div :class="['card', margin]">
				<div class="card-body text-center">
					<slot name="message"></slot>
					<br>
					<slot name="link"></slot>
				</div>
			</div>
		</div>
	</div>
</template>
