
import type { Show } from '../types/show'
import type { ShowsById, Genres } from '../types/store'
export const normalizeShows = function normalizeShows(apiShows: Show[]): { showsById: ShowsById; genres: Genres } {
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