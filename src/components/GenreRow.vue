<template>
  <ScrollableRow :title="genre">
    <div v-for="showId in showIds" :key="showId" class="show-card-wrapper overflow-hidden rounded-4 flex-shrink-0">
      <ShowCard :show="showsById[showId]" />
    </div>
  </ScrollableRow>
</template>

<script setup lang="ts">
import ShowCard from './ShowCard.vue'
import ScrollableRow from './ScrollableRow.vue'
import type { Show } from '../types/show'

defineProps<{
  genre: string
  showIds: number[]
  showsById: Record<number, Show>
}>()
</script>

<style scoped>
.show-card-wrapper {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 300px;
  max-width: 80vw;
}

@media (max-width: 768px) {
  .show-card-wrapper {
    width: 200px;
  }
}
</style> 