<template>
  <nav
    class="container-fluid text-light border-bottom border-secondary d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center text-center p-3"
  >
    <router-link :to="{ name: 'homepage' }" class="navbar-brand d-flex align-items-center mb-3  mb-md-0">
      <div class="logo-wrapper me-2">
        <Image :src="logo" alt="TV Show Browser Logo" />
      </div>
      TV Show Browser
    </router-link>

    <div class="search-wrapper ms-auto w-100">
      <Search
        @select="$emit('select', $event)"
        @search="$emit('search', $event)"
        @clear="$emit('clear')"
        :results="searchResults"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ResultItem } from './types/resultItem'
import Search from './Search.vue'
import Image from './Image.vue'
import logo from '../assets/logo.svg'

const props = defineProps<{
  searchResults: ResultItem[]
}>()

const emit = defineEmits<{
  (e: 'select', show: Show): void
  (e: 'search', query: string): void
  (e: 'clear'): void
}>()
</script>

<style scoped>
.logo-wrapper {
  width: 30px;
  height: 30px;
}

@media (min-width: 768px) {
  .search-wrapper {
    max-width: 300px;
  }
}

</style>
