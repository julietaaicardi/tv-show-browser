<template>
  <h2 class="h4 text-light text-start fw-bold mb-3">{{ title }}</h2>
  <div class="scrollable-container position-relative w-100">
    <!-- Left Arrow -->
    <button
      v-if="isNonTouchDevice"
      class="scroll-arrow left text-light fs-2 px-4 d-flex align-items-center justify-content-start position-absolute top-0 bottom-0"
      :class="{ visible: showLeftArrow }"
      @click="scrollLeft"
      aria-label="Scroll left"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="arrow-icon" />
    </button>

    <!-- Scrollable Content -->
    <div ref="scrollContainer" class="scrollable-content d-flex flex-nowrap gap-3 w-100 max-w-100">
      <slot></slot>
    </div>

    <!-- Right Arrow -->
    <button
      v-if="isNonTouchDevice"
      class="scroll-arrow right text-light fs-2 px-4 d-flex align-items-center justify-content-end position-absolute top-0 bottom-0"
      :class="{ visible: showRightArrow }"
      @click="scrollRight"
      aria-label="Scroll right"
    >
      <font-awesome-icon :icon="['fas', 'chevron-right']" class="arrow-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  title: string
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const isNonTouchDevice = ref(false)
const showLeftArrow = ref(false)
const showRightArrow = ref(false)

const updateArrowVisibility = () => {
  if (!scrollContainer.value || !isNonTouchDevice.value) {
    showLeftArrow.value = false
    showRightArrow.value = false
    return
  }

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  showLeftArrow.value = scrollLeft > 0
  showRightArrow.value = scrollLeft + clientWidth < scrollWidth
}

const getScrollAmount = (): number => {
  const card = scrollContainer.value?.querySelector('.card') as HTMLElement
  if (!card) return 400

  const viewport = window.innerWidth
  const cardsPerScroll = viewport < 768 ? 1 : viewport < 1200 ? 2 : 3
  return card.clientWidth * cardsPerScroll
}

const scrollLeft = () => {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({
    left: -getScrollAmount(),
    behavior: 'smooth',
  })
}

const scrollRight = () => {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({
    left: getScrollAmount(),
    behavior: 'smooth',
  })
}

onMounted(() => {
  // Check if device is non-touch
  isNonTouchDevice.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches

  if (scrollContainer.value) {
    // Initial arrow visibility check
    updateArrowVisibility()

    // Update arrow visibility on scroll
    scrollContainer.value.addEventListener('scroll', updateArrowVisibility)
    // Update arrow visibility on resize
    window.addEventListener('resize', updateArrowVisibility)
  }
})
</script>

<style scoped lang="scss">
.scrollable-container {
  overflow-x: hidden;
}

.scrollable-content {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
}

.scroll-arrow {
  width: 100px;
  pointer-events: auto;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    filter 0.3s ease;
  border: none;
  background: none;

  &.visible {
    opacity: 1;
  }

  &:hover {
    .arrow-icon {
      transition: transform 0.2s ease;
    }
  }

  &.left {
    left: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 1), transparent);

    &:hover {
      .arrow-icon {
        transform: translateX(-5px);
      }
    }
  }

  &.right {
    right: 0;
    background: linear-gradient(to left, rgba(0, 0, 0, 1), transparent);

    &:hover {
      .arrow-icon {
        transform: translateX(5px);
      }
    }
  }
}

/* Touch device styles (no arrows, full width content) */
@media (hover: none) and (pointer: coarse) {
  .scrollable-content {
    scroll-snap-type: x proximity;
    scroll-padding: 0.5rem;
  }
}
</style>
