<template>
  <div class="card position-relative rounded-4 d-block text-decoration-none overflow-hidden">
    <div class="card-image h-100">
      <Image :src="image" :alt="name" :fallback-text="name" />
    </div>
    <div
      class="card-overlay position-absolute bottom-0 left-0 right-0 p-lg-3 p-2 d-flex flex-column align-items-center justify-content-end w-100 text-light"
    >
      <Rating v-if="rating" :rating="rating" />
      <h5 class="title text-center fs-5 fw-bold mb-0">{{ name }}</h5>
      <span v-if="year">({{ year }})</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from './Image.vue'
import Rating from './Rating.vue'

defineProps<{
  id: number
  name: string
  image: string
  rating?: number
  year: string
}>()
</script>

<style scoped lang="scss">
.card {
  height: 450px;
  transition: transform 0.2s ease;
  cursor: pointer;

  &-image {
    transition: transform 0.2s ease;
  }

  &-overlay {
    height: 200px;
    background: linear-gradient(to top, rgba(3, 7, 20, 1) 60%, transparent);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  @media (hover: hover) {
    &:hover {
      .card-image {
        transform: scale(1.05);
      }
      .card-overlay {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    height: 300px;

    &-overlay {
      opacity: 1;
      height: 120px;
    }
  }

  @media (hover: none) {
    &:active {
      transform: scale(0.98);
    }
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 0.9rem;
  }

  .rating {
    font-size: 0.8rem;
  }
}
</style>
