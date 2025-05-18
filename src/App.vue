<template>
  <Header @select="handleSelect" @search="handleSearch" @clear="handleClear" :searchResults="searchResults"/>
  <router-view/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShowsStore } from './stores/shows'
import type { Show } from './types/show'
import type { ResultItem } from './types/resultItem'
import Header from './components/Header.vue'

const searchResults = ref<ResultItem[]>([])
const router = useRouter()
const store = useShowsStore()

function handleSelect(selectedItem: ResultItem) {
  store.setCurrentShowById(selectedItem.id)
  router.push({ name: 'show-detail', params: { id: selectedItem.id } })
}
async function handleSearch(query: string) {
  try {
    const shows: Show[] = await store.searchShowsByQuery(query)
    searchResults.value = shows.map((show) => ({
      id: show.id,
      name: show.name,
      image: show.image?.medium ?? '',
      year: show.premiered?.split('-')[0] ?? '—',
    }))
  } catch (e) {
    console.error(e)
  }
}

function handleClear() {
  searchResults.value = []
}

</script>
