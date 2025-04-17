<script setup>
	const search = defineModel('search');
	const sort = defineModel('sort');
</script>

<template>
	<input type="text" class="form-control fm-no-shadow" placeholder="Search in collection" v-model="search">

	<select class="form-select fm-no-shadow" v-model="sort">
		<option disabled value="">Sort by</option>
		<option value="title">Title</option>
		<option value="year">Year</option>
		<option value="rating">Rating (high to low)</option>
	</select>
</template>

