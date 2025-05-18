<template>
    <div class="d-flex align-items-center">
      <font-awesome-icon :icon="['fas', 'star']" class="text-warning fs-6 me-1" />
      <span class="fs-6 fw-bold">
        {{ rating }}
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    rating: number | string
  }>()
  </script>