import { setActivePinia, createPinia } from 'pinia'
import { useShowsStore } from '@/stores/shows'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as api from '@/api/tvmaze'
import { mockShow } from '../../__mocks__/shows' // Ajustá el path si es diferente

vi.mock('@/api/tvmaze', () => ({
  getShows: vi.fn(),
  getShowById: vi.fn(),
  searchShows: vi.fn(),
}))

vi.mock('@/stores/utilities', () => ({
  normalizeShows: vi.fn(() => ({
    showsById: { 1: mockShow },
    genres: { Drama: [1] }
  }))
}))

describe('useShowsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchShows stores normalized data', async () => {
    (api.getShows as ReturnType<typeof vi.fn>).mockResolvedValue([mockShow])

    const store = useShowsStore()
    await store.fetchShows()

    expect(store.showsById).toEqual({ 1: mockShow })
    expect(store.genres).toEqual({ Drama: [1] })
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('fetchShowById sets currentShow', async () => {
    const anotherShow = { ...mockShow, id: 2, name: 'Another Show' }
    ;(api.getShowById as ReturnType<typeof vi.fn>).mockResolvedValue(anotherShow)

    const store = useShowsStore()
    await store.fetchShowById(2)

    expect(store.currentShow).toEqual(anotherShow)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('searchShowsByQuery returns search results', async () => {
    const searchResults = [{ ...mockShow, id: 3, name: 'Search Result' }]
    ;(api.searchShows as ReturnType<typeof vi.fn>).mockResolvedValue(searchResults)

    const store = useShowsStore()
    const res = await store.searchShowsByQuery('test')

    expect(res).toEqual(searchResults)
  })
})