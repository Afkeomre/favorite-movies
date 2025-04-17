<script setup>
	import { ref } from 'vue';
	import { useModalStore } from '@/stores/modalStore';

	const modalStore = useModalStore();

	const isMenuOpen = ref(false);
</script>

<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary fm-navbar" :class="{'fm-navbar_open': isMenuOpen}">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">Favorite Movies</router-link>
			<button class="navbar-toggler fm-no-shadow" type="button" @click="isMenuOpen = !isMenuOpen">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse flex-grow-0" :class="{ show: isMenuOpen }">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link fm-no-shadow fm-navbar__link" to="/">My collection</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link fm-no-shadow fm-navbar__link" to="/search">Search</router-link>
					</li>
					<li class="nav-item">
						<a href="#" class="nav-link fm-no-shadow fm-navbar__link" @click.prevent="modalStore.open('confirm')">Sign out</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
