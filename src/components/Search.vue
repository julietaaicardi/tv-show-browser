<template>
  <div class="position-relative">
    <div class="input-group">
      <input
        type="search"
        class="form-control bg-dark text-light border-secondary"
        placeholder="Search TV shows..."
        v-model="searchQuery"
        @input="handleInput"
        @keydown="handleKeydown"
        @blur="handleBlur"
        aria-label="Search TV shows"
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
      @select="selectShow"
      @update:activeIndex="activeIndex = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue'
import { useShowsStore } from '../stores/shows'
import Dropdown from './Dropdown.vue'

const props = defineProps<{
  initialQuery?: string
}>()

const emit = defineEmits<{
  (e: 'select', show: Show): void
}>()

const store = useShowsStore()
const searchQuery = ref(props.initialQuery || '')
const results = ref<Show[]>([])
const isLoading = ref(false)
const error = ref('')
const showResults = ref(false)
const activeIndex = ref(-1)

const activeResultId = computed(() => {
  if (activeIndex.value >= 0 && results.value[activeIndex.value]) {
    return `search-result-${results.value[activeIndex.value].id}`
  }
  return ''
})

// Debounced search function
let debounceTimeout: number | undefined
const handleInput = () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = window.setTimeout(performSearch, 400)
}

const performSearch = async () => {
  const query = searchQuery.value.trim()
  if (!query) {
    results.value = []
    error.value = ''
    return
  }

  isLoading.value = true
  error.value = ''
  showResults.value = true

  try {
    results.value = await store.searchShowsByQuery(query)
    activeIndex.value = -1
  } catch (err) {
    error.value = 'Failed to fetch results. Please try again.'
    results.value = []
  } finally {
    isLoading.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!showResults.value || !results.value.length) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % results.value.length
      break
    case 'ArrowUp':
      event.preventDefault()
      activeIndex.value = activeIndex.value <= 0 
        ? results.value.length - 1 
        : activeIndex.value - 1
      break
    case 'Enter':
      event.preventDefault()
      if (activeIndex.value >= 0) {
        selectShow(results.value[activeIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      showResults.value = false
      break
  }
}

const selectShow = (show: Show) => {
  emit('select', show)
  store.setCurrentShow(show) // Optional: Update store
  searchQuery.value = ''
  showResults.value = false
  results.value = []
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
</style> 