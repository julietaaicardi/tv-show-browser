import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Show } from '../types/show'
import { getShows, getShowById } from '../services/tvmaze'

type ShowsById = Record<number, Show>
type Genres = Record<string, number[]>

function normalizeShows(apiShows: Show[]): { showsById: ShowsById; genres: Genres } {
  const showsById: ShowsById = {}
  const genres: Genres = {}

  // First pass: create showsById and collect all genres
  apiShows.forEach(show => {
    if (!show.id || !show.name) return

    showsById[show.id] = show

    // Initialize genre arrays if they don't exist
    show.genres?.forEach(genre => {
      if (!genres[genre]) {
        genres[genre] = []
      }
    })
  })

  // Second pass: populate genres with sorted show IDs
  Object.entries(showsById).forEach(([id, show]) => {
    show.genres?.forEach(genre => {
      genres[genre].push(Number(id))
    })
  })

  // Sort shows in each genre by rating
  Object.keys(genres).forEach(genre => {
    genres[genre].sort((a, b) => {
      const ratingA = showsById[a].rating?.average ?? 0
      const ratingB = showsById[b].rating?.average ?? 0
      return ratingB - ratingA
    })
  })

  return { showsById, genres }
}

export const useShowsStore = defineStore('shows', () => {
  // const shows = ref<Show[]>([])
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
      // shows.value = apiShows
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

  return {
    // shows,
    showsById,
    genres,
    currentShow,
    loading,
    error,
    fetchShows,
    fetchShowById,
  }
}) 