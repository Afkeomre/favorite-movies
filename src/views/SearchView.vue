<script setup>
	import { ref, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { useSearchStore } from '@/stores/searchStore';
	import { useMovieStore } from '@/stores/movieStore';
	import { useMessageStore } from '@/stores/messageStore';
	import { useLoadingStore } from '@/stores/loadingStore';
	import AppMovieCard from '@/components/ui/AppMovieCard.vue';
	import AppInfoCard from '@/components/ui/AppInfoCard.vue';
	import AppLoader from '@/components/ui/AppLoader.vue';
	import AppModal from '@/components/ui/AppModal.vue';
	import AppMessage from '@/components/ui/AppMessage.vue';

	const router = useRouter();
	const searchStore = useSearchStore();
	const movieStore = useMovieStore();
	const messageStore = useMessageStore();
	const loadingStore = useLoadingStore();

	const query = ref('');
	const hasSearched = ref(false); 

	const wasAdded = (movie) => {
		return movieStore.movies.find(m => m.id === movie.id);
	};

	const search = async () => {
		try {
			loadingStore.showLoader();
			hasSearched.value = false;
			await searchStore.getMovies(query.value);
			hasSearched.value = true;
		} catch(e) {
		} finally {
			loadingStore.hideLoader();
		}
	};

	const add = async (movie) => {
		try {
			await movieStore.postMovie(movie); 
			router.push('/');
		} catch (e) {
		}
	};

	onMounted(() => {
		searchStore.clearFindingMovies();
	});
</script>

<template>
	<Teleport to="body">
		<AppModal 
			v-if="messageStore.message" 
			@close="messageStore.clearMessage"
		>
			<AppMessage />
		</AppModal>
	</Teleport>

	<div class="row mt-4 mb-5">
		<div class="col-12">
			<h1 class="text-white text-uppercase text-center text-sm-start">Build your movie shelf </h1>
		</div>
	</div>

	<div class="row mb-5">
		<div class="col-12">
			<form @submit.prevent="search">
				<div class="input-group mb-3">
					<input type="text" class="form-control fm-no-shadow" placeholder="Enter movie title" v-model="query">
					<button class="btn fm-btn" type="submit" id="button-addon2">
						<i class="bi bi-search text-white fs-5"></i>
					</button>
				</div>
			</form>
		</div>
	</div>

	<AppLoader v-if="loadingStore.loading" />

	<div class="row" v-else-if="searchStore.hasFindingMovies && !loadingStore.loading">
		<div class="col-lg-3 col-sm-6 d-flex" v-for="movie in searchStore.findingMovies" :key="movie.id">
			<AppMovieCard 
				:is-clickable="false"
				:movie="movie"
			>
				<template v-slot:button>
					<button class="btn py-2 rounded-1 text-white fm-btn" :disabled="wasAdded(movie)" @click="add(movie)">
						Add to favorites
					</button>
				</template>
			</AppMovieCard>
		</div>
	</div>

	<AppInfoCard v-else-if="hasSearched" margin="">
		<template v-slot:message>
			<span>No movies found with this title. Try searching with another term</span>
		</template>
	</AppInfoCard>
</template>
