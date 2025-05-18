<template>
  <span class="badge" :class="[`bg-${variant}`, { 'rounded-pill': pill }]">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
  pill?: boolean
}

withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  pill: false,
})
</script>
