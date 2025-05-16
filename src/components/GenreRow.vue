<template>
  <div class="genre-section mb-4">
    <h2 class="h4 mb-3 text-light">{{ genre }}</h2>
    <div class="shows-row">
      <div v-for="showId in showIds" :key="showId" class="show-card-wrapper">
        <ShowCard :show="showsById[showId]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShowCard from './ShowCard.vue'
import type { Show } from '../types/show'

defineProps<{
  genre: string
  showIds: number[]
  showsById: Record<number, Show>
}>()
</script>

<style scoped>
.shows-row {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.shows-row::-webkit-scrollbar {
  height: 8px;
}

.shows-row::-webkit-scrollbar-track {
  background: #343a40;
  border-radius: 4px;
}

.shows-row::-webkit-scrollbar-thumb {
  background: #6c757d;
  border-radius: 4px;
}

.shows-row::-webkit-scrollbar-thumb:hover {
  background: #495057;
}

.show-card-wrapper {
  flex: 0 0 auto;
  width: 200px;
}

@media (max-width: 768px) {
  .show-card-wrapper {
    width: 160px;
  }
}
</style> 