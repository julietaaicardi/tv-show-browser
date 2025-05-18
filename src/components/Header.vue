<template>
  <nav class="navbar navbar-expand-lg navbar-dark border-bottom border-secondary">
    <div class="container">
      <router-link :to="{ name: 'homepage' }" class="navbar-brand"> TV Show Browser </router-link>

      <div class="ms-auto" style="width: 100%; max-width: 300px">
        <Search @select="$emit('select', $event)" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Search from './Search.vue'
import type { Show } from '../types/show'

const emit = defineEmits<{
  (e: 'select', show: Show): void
}>()
</script>
