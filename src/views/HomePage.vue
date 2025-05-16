<template>
  <div class="container-fluid py-4 py-lg-5">
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

    <div v-else class="genres-container">
      <div v-for="(showIds, genre) in genres" :key="genre" class="genre-row">
        <GenreRow :genre="genre" :show-ids="showIds" :shows-by-id="showsById" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '../stores/shows'
import { storeToRefs } from 'pinia'
import GenreRow from '../components/GenreRow.vue'

const store = useShowsStore()
const { showsById, genres, loading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchShows()
})
</script>

<style scoped>
.container-fluid {
  max-width: 1800px;
  padding-left: 0;
  padding-right: 0;
}

.genres-container {
  margin: 0;
}

.genre-row {
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .genres-container {
    margin: 0 -1rem;
  }
}
</style>
