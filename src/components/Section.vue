<template>
  <ScrollableRow :title="genre">
    <router-link
      v-for="showId in showIds"
      :key="showId"
      :to="{ name: 'show-detail', params: { id: showsById[showId].id } }"
      class="show-card-wrapper overflow-hidden rounded-4 flex-shrink-0"
    >
      <Card
        :show="showsById[showId]"
        :id="showId"
        :name="showsById[showId].name"
        :image="showsById[showId].image.medium"
        :rating="showsById[showId].rating?.average ?? '-'"
        :year="showsById[showId].premiered.split('-')[0]"
      />
    </router-link>
  </ScrollableRow>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import ScrollableRow from './ScrollableRow.vue'
import type { Show } from '../types/show'

defineProps<{
  genre: string
  showIds: number[]
  showsById: Record<number, Show>
}>()
</script>

<style scoped lang="scss">
.show-card-wrapper {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 300px;
  max-width: 80vw;

  @media (max-width: 768px) {
    width: 200px;
  }
}
</style>
