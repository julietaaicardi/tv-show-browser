<template>
  <nav class="navbar navbar-expand-lg navbar-dark border-bottom border-secondary">
    <div class="container">
      <router-link class="navbar-brand" to="/">TV Show Browser</router-link>
    </div>
  </nav>

  <router-view></router-view>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
</script>
