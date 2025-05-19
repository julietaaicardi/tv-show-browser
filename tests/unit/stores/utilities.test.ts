import { describe, it, expect } from 'vitest'
import { normalizeShows } from '@/stores/utilities'
import { mockShow } from '../../__mocks__/shows'
import type { Show } from '@/types'

describe('Store Utilities', () => {
  describe('normalizeShows', () => {
    it('normalizes shows correctly', () => {
      const mockShowList: Show[] = [
        { ...mockShow, id: 1, name: 'Show 1', genres: ['Drama', 'Action'], rating: { average: 8.5 } },
        { ...mockShow, id: 2, name: 'Show 2', genres: ['Comedy', 'Drama'], rating: { average: 7.5 } }
      ]

      const result = normalizeShows(mockShowList)

      expect(Object.keys(result.showsById)).toHaveLength(2)
      expect(result.showsById[1].name).toBe('Show 1')
      expect(result.showsById[2].name).toBe('Show 2')

      expect(Object.keys(result.genres)).toHaveLength(3)
      expect(result.genres['Drama']).toContain(1)
      expect(result.genres['Drama']).toContain(2)
      expect(result.genres['Action']).toContain(1)
      expect(result.genres['Comedy']).toContain(2)
    })

    it('sorts shows in genres by rating', () => {
      const mockShowList: Show[] = [
        { ...mockShow, id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 7.5 } },
        { ...mockShow, id: 2, name: 'Show 2', genres: ['Drama'], rating: { average: 8.5 } }
      ]

      const result = normalizeShows(mockShowList)
      expect(result.genres['Drama']).toEqual([2, 1])
    })

    it('handles shows without genres', () => {
      const mockShowList: Show[] = [
        { ...mockShow, id: 1, name: 'Show 1', genres: [] }
      ]

      const result = normalizeShows(mockShowList)
      expect(Object.keys(result.genres)).toHaveLength(0)
      expect(result.showsById[1].name).toBe('Show 1')
    })

    it('handles shows without ratings', () => {
      const mockShowList: Show[] = [
        { ...mockShow, id: 1, name: 'Show 1', genres: ['Drama'], rating: { } },
        { ...mockShow, id: 2, name: 'Show 2', genres: ['Drama'], rating: { average: 8.5 } }
      ]

      const result = normalizeShows(mockShowList)
      expect(result.genres['Drama']).toEqual([2, 1])
    })

    it('skips shows without name', () => {
      const mockShowList: Show[] = [
        { ...mockShow, id: 1, name: 'Show 1' },
        { ...mockShow, id: 3, name: '' }
      ]

      const result = normalizeShows(mockShowList)
      expect(Object.keys(result.showsById)).toHaveLength(1)
      expect(result.showsById[1].name).toBe('Show 1')
    })
  })
})