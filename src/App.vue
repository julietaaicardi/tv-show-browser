<template>
  <Header 
    @select="handleSelect" 
    @search="handleSearch" 
    @clear="handleClear" 
    @openMobileSearch="showMobileSearch = true"
    :searchResults="searchResults"
  />
  <router-view/>

  <!-- Mobile Search Modal -->
  <Modal
    v-model="showMobileSearch"
    title="Search TV Shows"
  >
    <template #header>
      <h5 class="modal-title text-light">Search TV Shows</h5>
    </template>
    
    <Search
      @select="handleMobileSelect"
      @search="handleSearch"
      @clear="handleClear"
      :results="searchResults"
    />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShowsStore } from './stores/shows'
import type { Show } from './types/show'
import type { ResultItem } from './types/resultItem'
import Header from './components/Header.vue'
import Modal from './components/Modal.vue'
import Search from './components/Search.vue'

const searchResults = ref<ResultItem[]>([])
const showMobileSearch = ref(false)
const router = useRouter()
const store = useShowsStore()

function handleSelect(selectedItem: ResultItem) {
  store.setCurrentShowById(selectedItem.id)
  router.push({ name: 'show-detail', params: { id: selectedItem.id } })
}

function handleMobileSelect(selectedItem: ResultItem) {
  handleSelect(selectedItem)
  showMobileSearch.value = false
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
