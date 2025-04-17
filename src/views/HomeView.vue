<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { useMovieStore } from '@/stores/movieStore';
	import { useMessageStore } from '@/stores/messageStore';
	import { useLoadingStore } from '@/stores/loadingStore';
	import { getRating } from '@/utils/movieData';
	import CollectionFilter from '@/components/collection/CollectionFilter.vue';
	import AppMovieCard from '@/components/ui/AppMovieCard.vue';
	import AppModal from '@/components/ui/AppModal.vue';
	import AppMessage from '@/components/ui/AppMessage.vue';
	import AppInfoCard from '@/components/ui/AppInfoCard.vue';
	import AppLink from '@/components/ui/AppLink.vue';
	import AppLoader from '@/components/ui/AppLoader.vue';

	const router = useRouter();
	const movieStore = useMovieStore();
	const messageStore = useMessageStore();
	const loadingStore = useLoadingStore();

	const search = ref('');
	const sort = ref('');

	const filteredMovies = computed(() => {
		return movieStore.movies
			.filter(m => m.title.toLowerCase().includes(search.value.toLowerCase()))
			.sort((a, b) => {
				switch (sort.value) {
					case 'title':
						return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
					case 'year': 
						return (a.release_date ? 0 : 1) - (b.release_date ? 0 : 1) || a.release_date?.localeCompare(b.release_date);
					case 'rating':
						return b.rating - a.rating;
				}
			});
	});

	const goToMovie = (id) => {
		router.push(`movie/${id}`);
	};

	onMounted(async () => {
		loadingStore.showLoader();
		await movieStore.loadMovies();
		loadingStore.hideLoader();
	});
</script>

<template>
	<Teleport to="body">
		<AppModal v-if="messageStore.message" @close="messageStore.clearMessage">
			<AppMessage />
		</AppModal>
	</Teleport>

	<div class="row justify-content-between align-items-center mt-4 mb-5 gap-4">
		<div class="col-lg-5" :class="{'col-12': !movieStore.hasMovies}">
			<h1 class="text-white text-uppercase text-center text-sm-start mb-0">Cinema Favorites</h1>
		</div>

		<div class="col-lg-6 d-flex gap-3 flex-column flex-sm-row" v-if="movieStore.hasMovies">
			<CollectionFilter 
				v-model:search="search" 
				v-model:sort="sort"
			/>
		</div>
	</div>

	<AppLoader v-if="loadingStore.loading" />

	<div class="row" v-else-if="movieStore.hasMovies && !loadingStore.loading">
		<div class="col-lg-3 col-sm-6 d-flex" v-for="movie in filteredMovies" :key="movie.id">
			<AppMovieCard 
				:movie="movie" 
				@click="goToMovie(movie.serverId)"
			>
			<template v-slot:rating>
				<p class="fst-italic"><b>My rating:</b> {{ getRating(movie) }}</p>
			</template>
			<template v-slot:button>
				<router-link :to="`/movie/${movie.serverId}`" class="btn py-2 rounded-1 text-white fm-btn " @click.stop>On movie's page</router-link>
			</template>
			</AppMovieCard>
		</div>
	</div>

	<AppInfoCard v-else-if="!movieStore.hasMovies && !loadingStore.loading" margin="">
		<template v-slot:message>
			<span>There are no movies in your collection.</span>
		</template>
		<template v-slot:link>
			<span>Start <AppLink path="/search" text="searching"/> and add your favorites!</span>
		</template>
	</AppInfoCard>

	<AppInfoCard v-if="filteredMovies.length === 0 && !loadingStore.loading && movieStore.hasMovies" margin="">
		<template v-slot:message>
			<span>There are no matches in the collection.</span>
		</template>
	</AppInfoCard>
</template>
