<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { useMovieStore } from '@/stores/movieStore';
	import { useMessageStore } from '@/stores/messageStore';
	import { useModalStore } from '@/stores/modalStore';
	import { useLoadingStore } from '@/stores/loadingStore';
	import MovieStarIcon from '@/components/movie/MovieStarIcon.vue';
	import AppModal from '@/components/ui/AppModal.vue';
	import AppMessage from '@/components/ui/AppMessage.vue';
	import AppInfoCard from '@/components/ui/AppInfoCard.vue';
	import AppLink from '@/components/ui/AppLink.vue';
	import AppLoader from '@/components/ui/AppLoader.vue';
	import MovieReviewModal from '@/components/movie/MovieReviewModal.vue';
	import MovieDeletingModal from '@/components/movie/MovieDeletingModal.vue';
	import { getBackdrop, getCountry, getYear} from '@/utils/movieData';
	import backgroundGradient from '@/utils/gradient';

	const router = useRouter();
	const movieStore = useMovieStore();
	const messageStore = useMessageStore();
	const modalStore = useModalStore();
	const loadingStore = useLoadingStore();

	// Movie data
	const props = defineProps(['id']); 
	const chosenMovie = ref(null); 

	const backdropPath = computed(() => getBackdrop(chosenMovie.value));
	const mainCountry = computed(() => getCountry(chosenMovie.value));
	const year = computed(() => getYear(chosenMovie.value));

	// Movie loading
	onMounted(async () => {
		try {
			loadingStore.showLoader();
			chosenMovie.value = await movieStore.loadMovieById(props.id);
			hoveredRating.value = chosenMovie.value.rating;
		} catch (e) {
		} finally {
			loadingStore.hideLoader();
		}
	});

	// Rating
	const hoveredRating = ref(0);  

	const setRating = async (value) => {
		chosenMovie.value.rating = hoveredRating.value = value;
		await movieStore.updateMovie(chosenMovie.value, {rating: value});
	};

	// Review modal
	const tempReview = ref('');
	const hasReview = computed(() => chosenMovie.value.review.length !== 0);

	const openReviewModal = () => {
		tempReview.value = chosenMovie.value.review;
		modalStore.open('review');
	};

	const saveReview = async () => {
		chosenMovie.value.review = tempReview.value;
		await movieStore.updateMovie(chosenMovie.value, {review: chosenMovie.value.review});
		modalStore.close();
	};

	// Deleting modal
	const deleteMovie = async () => {
		try {
			modalStore.close();
			await movieStore.removeMovie(chosenMovie.value);
			router.replace('/');
		} catch(e) {
		}
	};
</script>

<template>
	<Teleport to="body">
		<MovieReviewModal 
			v-if="modalStore.activeModal === 'review'"
			@save="saveReview"
			v-model="tempReview"
		/>
	</Teleport>

	<Teleport to="body">
		<MovieDeletingModal 
			v-if="modalStore.activeModal === 'deleting'" 
			@delete="deleteMovie"
		/>
	</Teleport>

	<Teleport to="body">
		<AppModal 
			v-if="messageStore.message" 
			@close="messageStore.clearMessage"
		>
				<AppMessage />
		</AppModal>
	</Teleport>

	<AppLoader v-if="loadingStore.loading" />

	<div v-else-if="chosenMovie && !loadingStore.loading" class="row">
		<div class="col-12">
			<div class="d-flex flex-column justify-content-end p-3 p-md-5 mt-5 text-white min-vh-100 fm-movie__content" :style="{backgroundImage: `${backgroundGradient}, url(${backdropPath})`}">
				<h1>{{ chosenMovie.title }}</h1>
				<p class="fst-italic">{{ mainCountry }}, {{ year }}</p>
				<div class="d-flex gap-2 mb-3" @mouseleave="hoveredRating = chosenMovie.rating">
					<MovieStarIcon 
						v-for="n in 5"
						:key="n"
						:active="n <= hoveredRating"
						@enter="hoveredRating = n"
						@set-rating="setRating(n)"
					/>
				</div>
				<p>{{ chosenMovie.overview }}</p>
				<p v-if="hasReview"><b>My review:</b> {{ chosenMovie.review }}</p>
				<div class="d-flex gap-2">
					<button class="btn py-2 rounded-1 text-white fm-btn" @click="openReviewModal">{{ hasReview ? 'Edit' : 'Add' }} a review</button>
					<button class="btn btn-danger py-2 rounded-1 text-white" @click="modalStore.open('deleting')">Delete movie</button>
				</div>
			</div>
		</div>
	</div>

	<AppInfoCard v-else-if="!chosenMovie && !loadingStore.loading">
		<template v-slot:message>
			<span>The movie with id = {{ id }} was not found :(</span>
		</template>
		<template v-slot:link>
			<span>Return <AppLink path="/" text="to the homepage" /></span>
		</template>
	</AppInfoCard>
</template>
