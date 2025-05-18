<template>
  <Transition name="modal-fade">
    <div v-if="modelValue" class="modal d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-fullscreen m-0" @click.stop>
        <div class="modal-content text-light">
          <div class="modal-header border-secondary d-flex justify-content-between">
            <slot name="header">
              <h5 class="modal-title">{{ title }}</h5>
            </slot>
            <Button
              variant="link"
              class="text-light border-0"
              @click="$emit('update:modelValue', false)"
              aria-label="Close"
              icon-back="xmark"
            />
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Button from './Button.vue'
defineProps<{
  modelValue: boolean
  title?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style scoped>
.modal-backdrop {
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
