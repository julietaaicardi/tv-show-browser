<template>
  <ScrollableRow :title="title">
    <router-link
      v-for="itemId in itemIds.filter(id => itemsById[id])"
      :key="itemId"
      :to="{ name: 'show-detail', params: { id: itemsById[itemId]!.id } }"
      class="card-wrapper overflow-hidden rounded-4 flex-shrink-0"
    >
      <Card
        :id="itemId"
        :name="itemsById[itemId]!.name"
        :image="itemsById[itemId]!.image.medium"
        :rating="itemsById[itemId]!.rating?.average"
        :year="itemsById[itemId]!.premiered?.split('-')[0] ?? ''"
      />
    </router-link>
  </ScrollableRow>
</template>

<script setup lang="ts">
import type { Show } from '../types'
import Card from './Card.vue'
import ScrollableRow from './ScrollableRow.vue'

defineProps<{
  title: string
  itemIds: number[]
  itemsById: Record<number, Show>
}>()
</script>

<style scoped lang="scss">
.card-wrapper {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 300px;
  max-width: 80vw;

  @media (max-width: 768px) {
    width: 200px;
  }
}
</style>
