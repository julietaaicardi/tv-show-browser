<template>
  <router-link
    :to="{ name: 'show-detail', params: { id: show.id }}"
    class="show-card"
  >
    <div class="card-image">
      <img
        v-if="show.image?.medium"
        :src="show.image.medium"
        :alt="show.name"
      />
      <div v-else class="placeholder-image">
        No Image
      </div>
    </div>
    <div class="card-overlay">
      <h5 class="show-title">{{ show.name }}</h5>
      <div class="show-rating" v-if="show.rating?.average">
        <span class="rating-value">{{ show.rating.average }}</span>
        <span class="rating-max">/10</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Show } from '../types/show'

defineProps<{
  show: Show
}>()
</script>

<style scoped>
.show-card {
  position: relative;
  height: 300px;
  transition: transform 0.3s ease;
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: white;
}

.show-card:hover {
  transform: scale(1.05);
  z-index: 1;
}

.card-image {
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background: #343a40;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8f9fa;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(33, 37, 41, 0.9) 40%);
  color: #f8f9fa;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.show-card:hover .card-overlay {
  opacity: 1;
}

.show-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.show-rating {
  font-size: 0.9rem;
}

.rating-value {
  font-weight: bold;
  color: #ffd700;
}

.rating-max {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .show-card {
    height: 240px;
  }
  
  .card-overlay {
    opacity: 1;
    background: linear-gradient(transparent, rgba(33, 37, 41, 0.95) 50%);
  }
}
</style> 