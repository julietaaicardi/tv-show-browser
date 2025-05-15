<template>
  <div class="container py-4">
    <router-link :to="{ name: 'dashboard' }" class="btn btn-outline-primary mb-4">
      &larr; Back to Dashboard
    </router-link>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else-if="currentShow" class="row">
      <div class="col-md-4">
        <img
          v-if="currentShow.image?.original"
          :src="currentShow.image.original"
          :alt="currentShow.name"
          class="img-fluid rounded"
        />
      </div>
      <div class="col-md-8">
        <h1 class="mb-3">{{ currentShow.name }}</h1>
        <div v-if="currentShow.rating?.average" class="mb-3">
          <strong>Rating:</strong> {{ currentShow.rating.average }}/10
        </div>
        <div v-if="currentShow.genres.length" class="mb-3">
          <strong>Genres:</strong>
          <span
            v-for="genre in currentShow.genres"
            :key="genre"
            class="badge bg-secondary me-2"
          >
            {{ genre }}
          </span>
        </div>
        <div v-if="currentShow.status" class="mb-3">
          <strong>Status:</strong> {{ currentShow.status }}
        </div>
        <div v-if="currentShow.premiered" class="mb-3">
          <strong>Premiered:</strong> {{ currentShow.premiered }}
        </div>
        <div v-if="currentShow.network?.name" class="mb-3">
          <strong>Network:</strong> {{ currentShow.network.name }}
        </div>
        <div class="mt-4" v-if="currentShow.summary" v-html="currentShow.summary"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '../stores/shows'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useShowsStore()
const { currentShow, loading, error } = storeToRefs(store)

onMounted(() => {
  const id = Number(route.params.id)
  if (!isNaN(id)) {
    store.fetchShowById(id)
  }
})
</script> 