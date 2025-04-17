<script setup>
	import { computed } from 'vue';
	import { getPoster, getCountry, getYear } from '@/utils/movieData';

	const props = defineProps({
		movie: Object,
		isClickable: {
			type: Boolean,
			required: false,
			default: true
		}
	});

	const posterPath = computed (() => getPoster(props.movie));
	const mainCountry = computed(() => getCountry(props.movie));
	const year = computed(() => getYear(props.movie));
</script>

<template>
	<div class="card mx-4 mx-sm-0 rounded-0 mb-4 w-100 fm-app-movie-card" :class="{'clickable': isClickable}">
		<div class="card-img-top overflow-hidden position-relative rounded-0 fm-app-movie-card__img-wrapper">
			<img :src="posterPath" class="w-100 h-100 object-fit-cover fm-app-movie-card__img" :alt="movie.title">
		</div>
		<div class="card-body d-flex flex-column">
			<h5 class="card-title fw-bolder mb-3">{{ movie.title }} <small class=" fs-6 fw-medium">({{ mainCountry }}, {{ year }})</small> </h5>
			<slot name="rating"></slot>
			<p class="card-text fm-app-movie-card__description">{{ movie.overview }}</p>
			<div class="d-flex justify-content-center mt-auto">
				<slot name="button"></slot>
			</div>
		</div>
	</div>
</template>
