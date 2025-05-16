import { setActivePinia, createPinia } from 'pinia'
import { useShowsStore } from '../../stores/shows'
import { beforeEach, describe, expect, it, vi } from 'jest'
import * as tvmazeService from '../../api/tvmaze'

vi.mock('../../api/tvmaze')

describe('Shows Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches shows successfully', async () => {
    const mockShows = [
      {
        id: 1,
        name: 'Test Show',
        summary: 'Test Summary',
        genres: ['Drama'],
        status: 'Running',
      },
    ]

    vi.mocked(tvmazeService.getShows).mockResolvedValue(mockShows)

    const store = useShowsStore()
    await store.fetchShows()

    expect(store.shows).toEqual(mockShows)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('handles fetch shows error', async () => {
    const errorMessage = 'Failed to fetch shows'
    vi.mocked(tvmazeService.getShows).mockRejectedValue(new Error(errorMessage))

    const store = useShowsStore()
    await store.fetchShows()

    expect(store.shows).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe(errorMessage)
  })
}) 