<template>
  <div
    v-if="visible"
    class="position-absolute top-100 start-0 end-0 mt-1 bg-dark border border-secondary rounded shadow-lg z-3"
    role="listbox"
  >
    <div v-if="error" class="p-3 text-danger">
      {{ error }}
    </div>
    <div v-else-if="!items.length && !isLoading && query" class="p-3 text-light">
      No results found
    </div>
    <template v-else>
      <button
        v-for="(item, index) in items"
        :key="item.id"
        class="d-flex align-items-center w-100 p-2 border-0 text-start text-light bg-transparent"
        :class="{ 'bg-primary': index === activeIndex }"
        @mouseenter="activeIndex = index"
        @mousedown.prevent="selectItem(item)"
        :id="`search-result-${item.id}`"
        role="option"
        :aria-selected="index === activeIndex"
      >
        <div class="image-container flex-shrink-0 me-2">
          <Image
            :src="item.image"
            :alt="item.name"
            class="rounded"
          />
        </div>
        <div class="flex-grow-1 min-w-0">
          <div class="text-truncate">{{ item.name }}</div>
          <small class="text-secondary" v-if="item.year">
            {{ item.year }}
          </small>
        </div>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Image from './Image.vue'
import type { ResultItem } from '../types'

const props = defineProps<{
  visible: boolean
  items: ResultItem[]
  isLoading: boolean
  error: string
  query: string
}>()

const emit = defineEmits<{
  (e: 'select', item: Show): void
  (e: 'update:activeIndex', index: number): void
}>()

const activeIndex = ref(-1)

const selectItem = (item: Show) => {
  emit('select', item)
}

// Watch for active index changes and emit them
watch(activeIndex, (newIndex) => {
  emit('update:activeIndex', newIndex)
})
</script>

<style scoped>
.image-container {
  width: 45px;
  height: 63px;
}
button:hover {
  background-color: var(--bs-primary) !important;
}
</style> 