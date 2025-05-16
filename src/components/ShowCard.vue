<template>
  <router-link :to="{ name: 'show-detail', params: { id: show.id } }" class="show-card rounded-4">
    <div class="card-image">
      <img v-if="show.image?.medium" :src="show.image.medium" :alt="show.name" />
      <div v-else class="placeholder-image">No Image</div>
    </div>
    <div class="card-overlay d-flex flex-column align-items-center justify-content-end">
      <div class="show-rating" v-if="show.rating?.average">
        <font-awesome-icon :icon="['fas', 'star']" class="text-warning fs-6 me-2" />
        <span class="rating-value fs-6">{{ show.rating.average }}</span>
      </div>
      <h5 class="show-title fs-5 fw-bold mb-0">{{ show.name }}</h5>
      <span v-if="show.premiered">({{ show.premiered.split('-')[0] }})</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Show } from '../types/show'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar)

defineProps<{
  show: Show
}>()
</script>

<style scoped>
.show-card {
  position: relative;
  height: 450px;
  transition: transform 0.2s ease;
  cursor: pointer;
  display: block;
  text-decoration: none;
  color: white;
  overflow: hidden;
}

@media (hover: hover) {
  .show-card:hover {
    z-index: 1;
    .card-image {
      transform: scale(1.05);
      z-index: 1;
    }
  }

  .show-card:hover .card-overlay {
    opacity: 1;
  }
}

.card-image {
  height: 100%;
  overflow: hidden;
  transition: transform 0.2s ease;
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
  height: 200px;
  background: linear-gradient(to top, rgba(3, 7, 20, 1) 60%, transparent);
  color: #f8f9fa;
  opacity: 0;
  transition: opacity 0.2s ease;
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
    padding: 0.75rem;
    height: 120px;
  }

  .show-title {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .show-rating {
    font-size: 0.8rem;
  }
}

@media (hover: none) {
  .show-card:active {
    transform: scale(0.98);
  }
}
</style>
