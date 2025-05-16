<template>
  <router-link
    :to="{ name: 'show-detail', params: { id: show.id } }"
    class="show-card position-relative rounded-4 d-block text-decoration-none overflow-hidden"
  >
    <div class="card-image h-100">
      <ImageWithFallback
        :src="show.image?.medium"
        :alt="show.name"
        :fallback-text="show.name"
      />
    </div>
    <div class="card-overlay position-absolute bottom-0 left-0 right-0 p-lg-3 p-2 d-flex flex-column align-items-center justify-content-end w-100 text-light">
      <div class="show-rating" v-if="show.rating?.average">
        <font-awesome-icon :icon="['fas', 'star']" class="text-warning fs-6 me-2" />
        <span class="rating-value fs-6 fw-bold text-warning">{{ show.rating.average }}</span>
      </div>
      <h5 class="show-title text-center fs-5 fw-bold mb-0">{{ show.name }}</h5>
      <span v-if="show.premiered">({{ show.premiered.split('-')[0] }})</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Show } from '../types/show'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ImageWithFallback from './ImageWithFallback.vue'

library.add(faStar)

defineProps<{
  show: Show
}>()
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

.show-card {
  height: 450px;
  transition: transform 0.2s ease;
  cursor: pointer;
}

@media (hover: hover) {
  .show-card:hover {
    .card-image {
      transform: scale(1.05);
    }
    .card-overlay {
      opacity: 1;
    }
  }
}

.card-image {
  transition: transform 0.2s ease;
}

.card-overlay {
  height: 200px;
  background: linear-gradient(to top, rgba(3, 7, 20, 1) 60%, transparent);
  opacity: 0;
  transition: opacity 0.2s ease;
}

@media (max-width: 768px) {
  .show-card {
    height: 300px;
  }

  .card-overlay {
    opacity: 1;
    height: 120px;
  }

  .show-title {
    font-size: 0.9rem;
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
