<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">TV Show Browser</router-link>
    </div>
  </nav>

  <router-view></router-view>
</template>

<style>
body {
  background-color: #f8f9fa;
}
</style>
