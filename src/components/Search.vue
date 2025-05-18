<template>
  <div class="position-relative">
    <div class="input-group">
      <input
        type="search"
        class="form-control bg-dark text-light border-secondary"
        placeholder="Search..."
        v-model="searchQuery"
        @input="handleInput"
        @keydown="handleKeydown"
        @blur="handleBlur"
        aria-label="Search"
        :aria-expanded="showResults"
        :aria-activedescendant="activeResultId"
        role="combobox"
        autocomplete="off"
      />
      <span v-if="isLoading" class="input-group-text bg-dark text-light border-secondary">
        <div class="spinner-border spinner-border-sm text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </span>
      <span v-else class="input-group-text bg-dark text-light border-secondary">
        <font-awesome-icon :icon="['fas', 'search']" />
      </span>
    </div>
    <Dropdown
      :visible="showResults"
      :items="results"
      :isLoading="isLoading"
      :error="error"
      :query="searchQuery"
      @select="selectItem"
      @update:activeIndex="activeIndex = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue'
import Dropdown from './Dropdown.vue'
import type { ResultItem } from '../types'

const props = defineProps<{
  initialQuery?: string
  results: ResultItem[]
}>()

const emit = defineEmits<{
  (e: 'select', item: ResultItem): void
  (e: 'search', query: string): void
  (e: 'clear'): void
}>()

const searchQuery = ref(props.initialQuery || '')
const isLoading = ref(false)
const error = ref('')
const showResults = ref(false)
const activeIndex = ref(-1)

const activeResultId = computed(() => {
  if (activeIndex.value >= 0 && props.results[activeIndex.value]) {
    return `search-result-${props.results[activeIndex.value].id}`
  }
  return ''
})

// Debounced search function
let debounceTimeout: number | undefined
const handleInput = () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = window.setTimeout(performSearch, 400)
}

const performSearch = () => {
  const query = searchQuery.value.trim()
  if (!query) {
    emit('clear')
    error.value = ''
    showResults.value = false
    return
  }

  emit('search', query)
  showResults.value = true
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!showResults.value || !props.results.length) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % props.results.value.length
      break
    case 'ArrowUp':
      event.preventDefault()
      activeIndex.value = activeIndex.value <= 0 
        ? props.results.value.length - 1 
        : activeIndex.value - 1
      break
    case 'Enter':
      event.preventDefault()
      if (activeIndex.value >= 0) {
        selectItem(props.results.value[activeIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      showResults.value = false
      break
  }
}

const selectItem = (item: ResultItem) => {
  emit('select', item)
  searchQuery.value = ''
  showResults.value = false
  props.results.value = []
}

const handleBlur = () => {
  // Delay hiding results to allow click events to fire
  setTimeout(() => {
    showResults.value = false
  }, 200)
}

// Clean up on unmount
onUnmounted(() => {
  clearTimeout(debounceTimeout)
})
</script>

<style scoped>
.form-control:focus {
  background-color: var(--bs-dark);
  color: var(--bs-light);
}
input::placeholder {
  color: var(--bs-light);
  opacity: 0.6;
}
</style> 