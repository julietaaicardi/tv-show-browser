<template>
  <div class="container py-4">
    <router-link :to="{ name: 'homepage' }" class="btn btn-outline-light mb-4">
      &larr; Back to Homepage
    </router-link>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div
      v-else-if="error"
      class="alert alert-danger bg-danger text-light border-danger"
      role="alert"
    >
      {{ error }}
    </div>

    <div v-else-if="currentShow" class="row">
      <div class="col-md-4">
        <Image
          v-if="currentShow.image?.original"
          :src="currentShow.image.original"
          :alt="currentShow.name"
          :fallback-text="currentShow.name"
          class="rounded"
        />
      </div>
      <div class="col-md-8">
        <div class="d-flex flex-column align-items-start mb-3 text-light">
          <div class="d-flex align-items-center">
            <font-awesome-icon :icon="['fas', 'star']" class="text-warning fs-6 me-1" />
            <span class="fs-6">{{ currentShow.rating.average }}</span>
          </div>
          <h1 class="me-1">{{ currentShow.name }}</h1>
        </div>
        <div v-if="currentShow.genres.length" class="mb-3">
          <strong class="text-light">Genres:</strong>
          <span
            v-for="genre in currentShow.genres"
            :key="genre"
            class="badge bg-secondary text-light me-2"
          >
            {{ genre }}
          </span>
        </div>
        <div v-if="currentShow.status" class="mb-3 text-light">
          <strong>Status:</strong> {{ currentShow.status }}
        </div>
        <div v-if="currentShow.premiered" class="mb-3 text-light">
          <strong>Premiered:</strong> {{ currentShow.premiered.split('-')[0] }}
        </div>
        <div v-if="currentShow.network?.name" class="mb-3 text-light">
          <strong>Network:</strong> {{ currentShow.network.name }}
        </div>
        <div class="mt-4 text-light" v-if="currentShow.summary" v-html="currentShow.summary"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '../stores/shows'
import { storeToRefs } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Image from '../components/Image.vue'

library.add(faStar)

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
