<template>
  <div class="image-container w-100 h-100 position-relative overflow-hidden">
    <img
      v-if="!showFallback"
      :src="src"
      :alt="alt"
      @error="handleImageError"
      class="image w-100 h-100"
    />
    <div
      v-else
      class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-light bg-gray-900"
    >
      <font-awesome-icon :icon="['fas', 'image']" class="fallback-icon fs-1 mb-2" />
      <span v-if="fallbackText" class="fallback-text fs-6">{{ fallbackText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  src?: string
  alt: string
  fallbackText?: string
}>()

const showFallback = ref(false)

watch(
  () => props.src,
  newSrc => {
    showFallback.value = !newSrc || newSrc.trim() === ''
  },
  { immediate: true }
)

const handleImageError = () => {
  showFallback.value = true
}
</script>

<style scoped lang="scss">
.image-container {
  img {
    object-fit: cover;
  }
}

.fallback {
  &-icon {
    opacity: 0.7;
  }

  &-text {
    opacity: 0.8;
  }
}
</style>
