<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft, faChevronRight)

const props = defineProps<{
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
  const card = scrollContainer.value?.querySelector('.show-card') as HTMLElement
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

<template>
  <div class="scrollable-section w-100">
    <h2 class="h4 text-light text-start fw-bold mb-3">{{ title }}</h2>
    <div class="scrollable-container-wrapper">
      <!-- Left Arrow -->
      <button
        v-if="isNonTouchDevice"
        class="scroll-arrow left fs-2 px-4 d-flex align-items-center justify-content-start"
        :class="{ visible: showLeftArrow }"
        @click="scrollLeft"
        aria-label="Scroll left"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="arrow-icon" />
      </button>

      <!-- Scrollable Content -->
      <div
        ref="scrollContainer"
        class="scrollable-content"
      >
        <slot></slot>
      </div>

      <!-- Right Arrow -->
      <button
        v-if="isNonTouchDevice"
        class="scroll-arrow right fs-2 px-4 d-flex align-items-center justify-content-end"
        :class="{ visible: showRightArrow }"
        @click="scrollRight"
        aria-label="Scroll right"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="arrow-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollable-container-wrapper {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.scrollable-content {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;

/* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollable-content::-webkit-scrollbar {
  display: none;
}

.scroll-arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
  border: none;
  background: none;
  color: white;
}

.scroll-arrow:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.scroll-arrow.visible {
  opacity: 1;
}

.scroll-arrow.left {
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
}

.scroll-arrow.right {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.7), transparent);
}

/* Touch device styles (no arrows, full width content) */
@media (hover: none) and (pointer: coarse) {
  .scrollable-content {
    scroll-snap-type: x proximity;
    scroll-padding: 0.5rem;
  }
}
</style> 