<template>
  <div class="container-fluid py-4">
    <h1 class="mb-4 px-3 text-light">TV Shows</h1>
    
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
        <GenreRow 
          :genre="genre"
          :show-ids="showIds"
          :shows-by-id="showsById"
        />
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
}

.genres-container {
  margin: 0 -1rem;
}

.genre-row {
  padding: 0 1rem;
}
</style> 