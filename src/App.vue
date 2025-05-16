<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
</script>

<template>
  <div class="dark-theme text-light min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark dark-theme border-bottom border-secondary">
      <div class="container">
        <router-link class="navbar-brand" to="/">TV Show Browser</router-link>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
body,
.dark-theme {
  background-color: #030714;
  color: #f8f9fa;
}

.dark-theme {
  --bs-body-color: #f8f9fa;
  --bs-body-bg: #030714;
}
</style>
