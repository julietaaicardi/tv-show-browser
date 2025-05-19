<template>
  <div class="container py-4 px-3 px-md-0">
    <Button :to="{ name: 'homepage' }" variant="primary" class="mb-4" icon-front="chevron-left">
      Back
    </Button>

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
      <div class="col-md-4 mb-3 mb-md-0">
        <Image
          :src="currentShow.image?.original"
          :alt="currentShow.name"
          :fallback-text="currentShow.name"
          class="rounded"
        />
      </div>
      <div class="col-md-8">
        <div class="d-flex flex-column align-items-start mb-2 text-light">
          <div class="d-flex align-items-center">
            <Rating
              v-if="currentShow.rating.average"
              :rating="currentShow.rating.average"
              class="me-1"
            />
            <span v-if="currentShow.premiered" class="fs-6"
              >({{ currentShow.premiered.split('-')[0] }})</span
            >
          </div>
          <h1 class="me-1 mb-0">{{ currentShow.name }}</h1>
        </div>
        <div v-if="currentShow.genres.length" class="mb-3">
          <Badge v-for="genre in currentShow.genres" :key="genre" variant="secondary" class="me-2">
            {{ genre }}
          </Badge>
        </div>

        <div v-if="currentShow.language" class="text-light">
          <strong>Language:</strong> {{ currentShow.language }}
        </div>

        <div v-if="currentShow.runtime" class="text-light">
          <strong>Runtime:</strong> {{ currentShow.runtime }} minutes
        </div>

        <div v-if="currentShow.schedule.days.length" class="text-light">
          <strong>Schedule:</strong>
          {{ currentShow.schedule.days.map(day => day + 's').join(', ') }} at
          {{ currentShow.schedule.time }}
        </div>
        <div v-if="currentShow.status" class="text-light">
          <strong>Status:</strong> {{ currentShow.status }}
        </div>

        <div v-if="currentShow.network?.name" class="mb-3 text-light">
          <strong>Network: </strong>
          <template v-if="currentShow.network.officialSite">
            <a :href="currentShow.network.officialSite" target="_blank" class="text-light">
              {{ currentShow.network.name }}
            </a>
          </template>
          <template v-else>
            {{ currentShow.network.name }}
          </template>
          <span v-if="currentShow.network.country.code" class="ms-1 fs-5">
            {{ countryCodeToEmoji(currentShow.network.country.code) }}
          </span>
        </div>

        <div class="mt-4 text-light" v-if="currentShow.summary" v-html="currentShow.summary"></div>

        <div class="mt-4">
          <Button
            v-if="currentShow.network.officialSite"
            :href="currentShow.network.officialSite"
            variant="outline-light"
            target="_blank"
            iconBack="arrow-up-right-from-square"
            >Visit official site
          </Button>
        </div>
        <div class="mt-4">
          <div v-if="hasAnyExternal(currentShow.externals)" class="text-light">
            <strong>More: </strong>
            <template v-if="currentShow.externals.imdb">
              <a
                :href="`https://www.imdb.com/title/${currentShow.externals.imdb}`"
                target="_blank"
                class="text-light"
                >IMDb</a
              >
            </template>

            <template
              v-if="
                currentShow.externals.imdb &&
                (currentShow.externals.thetvdb || currentShow.externals.tvrage)
              "
              >,
            </template>

            <template v-if="currentShow.externals.thetvdb">
              <a
                :href="`https://thetvdb.com/?id=${currentShow.externals.thetvdb}&tab=series`"
                target="_blank"
                class="text-light"
                >TheTVDB</a
              >
            </template>

            <template v-if="currentShow.externals.thetvdb && currentShow.externals.tvrage"
              >,
            </template>

            <template v-if="currentShow.externals.tvrage">
              <a
                :href="`https://www.tvrage.com/shows/id-${currentShow.externals.tvrage}`"
                target="_blank"
                class="text-light"
                >TVRage</a
              >
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '../stores/shows'
import { storeToRefs } from 'pinia'
import Image from '../components/Image.vue'
import Badge from '../components/Badge.vue'
import Rating from '../components/Rating.vue'
import Button from '../components/Button.vue'

const route = useRoute()
const store = useShowsStore()
const { currentShow, loading, error } = storeToRefs(store)

onMounted(() => {
  const id = Number(route.params['id'])
  if (!isNaN(id)) {
    store.fetchShowById(id)
  }
})

function countryCodeToEmoji(code: string): string {
  return code.toUpperCase().replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)))
}
function hasAnyExternal(externals: { imdb?: string; thetvdb?: number; tvrage?: number }): boolean {
  if (!externals) return false
  return Object.values(externals).some(value => value != null && value !== '')
}
</script>
