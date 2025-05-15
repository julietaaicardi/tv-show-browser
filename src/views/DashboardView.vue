<template>
  <div class="container py-4">
    <h1 class="mb-4">TV Shows</h1>
    <div class="row g-4">
      <div v-if="loading" class="col-12">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-else-if="error" class="col-12">
        <div class="alert alert-danger" role="alert">
          {{ error }}
        </div>
      </div>
      <div v-else v-for="show in shows" :key="show.id" class="col-md-4 col-lg-3">
        <div class="card h-100">
          <img
            v-if="show.image?.medium"
            :src="show.image.medium"
            class="card-img-top"
            :alt="show.name"
          />
          <div class="card-body">
            <h5 class="card-title">{{ show.name }}</h5>
            <p class="card-text" v-if="show.rating?.average">
              Rating: {{ show.rating.average }}/10
            </p>
            <router-link
              :to="{ name: 'show-detail', params: { id: show.id }}"
              class="btn btn-primary"
            >
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useShowsStore } from '../stores/shows'
import { storeToRefs } from 'pinia'

const store = useShowsStore()
const { shows, loading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchShows()
})
</script> 