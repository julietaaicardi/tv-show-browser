<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
</script>

<template>
  <div class="dark-theme bg-dark text-light min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div class="container">
        <router-link class="navbar-brand" to="/">TV Show Browser</router-link>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
body {
  background-color: #212529;
  color: #f8f9fa;
}

.dark-theme {
  --bs-body-color: #f8f9fa;
  --bs-body-bg: #212529;
}
</style>
