import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Show, ShowsById, Genres } from '../types'
import { getShows, getShowById, searchShows } from '../api/tvmaze'
import { normalizeShows } from './utilities'

export const useShowsStore = defineStore('shows', () => {
  const showsById = ref<ShowsById>({})
  const genres = ref<Genres>({})
  const currentShow = ref<Show | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchShows() {
    loading.value = true
    error.value = null
    try {
      const apiShows = await getShows()
      const { showsById: normalizedShows, genres: normalizedGenres } = normalizeShows(apiShows)
      showsById.value = normalizedShows
      genres.value = normalizedGenres
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

  function setCurrentShowById(id: number) {
    currentShow.value = showsById.value[id]
  }

  async function searchShowsByQuery(query: string): Promise<Show[]> {
    try {
      const shows = await searchShows(query)
      return shows
    } catch (e) {
      console.error('Error searching shows:', e)
      throw e
    }
  }

  return {
    showsById,
    genres,
    currentShow,
    loading,
    error,
    fetchShows,
    fetchShowById,
    setCurrentShowById,
    searchShowsByQuery
  }
})
