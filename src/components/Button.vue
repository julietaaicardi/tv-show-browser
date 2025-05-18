<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="type"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :class="[
      'btn',
      `btn-${variant}`,
      size ? `btn-${size}` : '',
      block ? 'w-100' : '',
      disabled ? 'disabled' : '',
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <!-- Front icon -->
    <font-awesome-icon v-if="iconFront" :icon="['fas', iconFront]" class="me-2" />

    <slot></slot>

    <!-- Back icon -->
    <font-awesome-icon v-if="iconBack" :icon="['fas', iconBack]" class="ms-2" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  // Link props
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'

  // Button styling
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-light'
    | 'outline-dark'
  size?: 'sm' | 'lg'
  block?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'

  // Icon props
  iconFront?: string // FontAwesome class, e.g., 'fas fa-user'
  iconBack?: string // FontAwesome class, e.g., 'fas fa-arrow-right'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  block: false,
  disabled: false,
  type: 'button',
  iconFront: '',
  iconBack: '',
  target: '_self',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const onClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
