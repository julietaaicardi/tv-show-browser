import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Show } from '../types/show'
import { getShows, getShowById } from '../services/tvmaze'

export const useShowsStore = defineStore('shows', () => {
  const shows = ref<Show[]>([])
  const currentShow = ref<Show | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchShows() {
    loading.value = true
    error.value = null
    try {
      shows.value = await getShows()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  async function fetchShowById(id: number) {
    loading.value = true
    error.value = null
    try {
      currentShow.value = await getShowById(id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  return {
    shows,
    currentShow,
    loading,
    error,
    fetchShows,
    fetchShowById,
  }
}) 