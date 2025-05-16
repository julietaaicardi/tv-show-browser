<template>
  <div
    class="image-container w-100 h-100 position-relative overflow-hidden"
    :class="{ 'has-error': showFallback }"
  >
    <img
      v-if="!showFallback"
      :src="src"
      :alt="alt"
      @error="handleImageError"
      class="image w-100 h-100"
    />
    <div
      v-else
      class="fallback-container w-100 h-100 d-flex align-items-center justify-content-center text-light"
    >
      <div class="d-flex flex-column align-items-center">
        <font-awesome-icon :icon="['fas', 'image']" class="fallback-icon fs-1 mb-2" />
        <span class="fallback-text fs-6">{{ fallbackText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faImage)

const props = withDefaults(
  defineProps<{
    src?: string
    alt: string
    fallbackText?: string
  }>(),
  {
    fallbackText: 'No Image',
    src: '',
  }
)

const showFallback = ref(!props.src)

const handleImageError = () => {
  showFallback.value = true
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

.image-container {
  img {
    object-fit: cover;
  }
}

.fallback-container {
  background: $gray-900;
}

.fallback-icon {
  opacity: 0.7;
}

.fallback-text {
  opacity: 0.8;
}
</style>
