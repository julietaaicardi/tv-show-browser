<template>
  <nav
    class="container-fluid text-light border-bottom border-secondary d-flex  justify-content-between align-items-center text-center p-3"
  >
    <router-link :to="{ name: 'homepage' }" class="navbar-brand d-flex align-items-center">
      <div class="logo-wrapper me-2">
        <Image :src="logo" alt="TV Show Browser Logo" />
      </div>
      TV Show Browser
    </router-link>

    <!-- Desktop Search -->
    <div class="search-wrapper ms-auto w-100 d-none d-md-block">
      <Search
        @select="$emit('select', $event)"
        @search="$emit('search', $event)"
        @clear="$emit('clear')"
        :results="searchResults"
      />
    </div>

    <!-- Mobile Search Button -->
    <button 
      class="btn btn-link text-light border-0 d-md-none"
      @click="$emit('openMobileSearch')"
      aria-label="Open search"
    >
      <font-awesome-icon :icon="['fas', 'search']" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import type { ResultItem } from './types/resultItem'
import Search from './Search.vue'
import Image from './Image.vue'
import logo from '../assets/logo.svg'

const props = defineProps<{
  searchResults: ResultItem[]
}>()

const emit = defineEmits<{
  (e: 'select', show: ResultItem): void
  (e: 'search', query: string): void
  (e: 'clear'): void
  (e: 'openMobileSearch'): void
}>()
</script>

<style scoped>
    .logo-wrapper {
    width: 30px;
    height: 30px;
    }

  .search-wrapper {
    max-width: 300px;
  }
</style>
