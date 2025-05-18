<template>
  <div class="container-fluid py-4 py-lg-5 px-3">
    <div class="d-flex flex-column text-light py-5 text-center">
      <div class="d-flex justify-content-center align-items-center mb-3">
        <span class="fs-1 me-2">🎬</span>
        <h1 class="display-5 fw-bold m-0">Top-Rated Series</h1>
      </div>
      <p class="lead text-secondary">
        Discover timeless dramas and sci-fi adventures loved by fans worldwide
      </p>
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="px-3">
      <div class="alert alert-danger bg-danger text-light border-danger" role="alert">
        {{ error }}
      </div>
    </div>

    <div v-else>
      <div v-for="(showIds, genre) in genres" :key="genre" class="genre-wrapper">
        <Section :title="genre" :item-ids="showIds" :items-by-id="showsById" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '../stores/shows'
import { storeToRefs } from 'pinia'
import Section from '../components/Section.vue'

const store = useShowsStore()
const { showsById, genres, loading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchShows()
})
</script>

<style scoped>
.genre-wrapper {
  margin-bottom: 4rem;
}
</style>
