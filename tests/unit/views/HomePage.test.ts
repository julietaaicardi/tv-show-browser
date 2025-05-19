import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'
import { useShowsStore } from '@/stores/shows'
import { ref } from 'vue'
import { mockShow } from '../../__mocks__/shows'
import type { Show } from '@/types'

vi.mock('@/stores/shows', () => ({
  useShowsStore: vi.fn(),
}))

vi.mock('@/components/ContentGroup.vue', () => {
  const { defineComponent } = require('vue')
  return {
    default: defineComponent({
      name: 'MockContentGroup',
      template: '<div><slot /></div>',
    }),
  }
})

describe('HomePage.vue', () => {
  let fetchShowsMock: ReturnType<typeof vi.fn>
  let useShowsStoreMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchShowsMock = vi.fn()
    useShowsStoreMock = useShowsStore as unknown as ReturnType<typeof vi.fn>
  })

  it('shows loading spinner when loading is true', () => {
    useShowsStoreMock.mockReturnValue({
      fetchShows: fetchShowsMock,
      showsById: ref({}),
      genres: ref({}),
      loading: ref(true),
      error: ref(null),
    })

    const wrapper = shallowMount(HomePage)
    expect(wrapper.find('.spinner-border').exists()).toBe(true)
  })

  it('displays error message when error exists', () => {
    useShowsStoreMock.mockReturnValue({
      fetchShows: fetchShowsMock,
      showsById: ref({}),
      genres: ref({}),
      loading: ref(false),
      error: ref('Something went wrong'),
    })

    const wrapper = shallowMount(HomePage)
    expect(wrapper.find('.alert-danger').text()).toContain('Something went wrong')
  })

  it('renders genres as section titles', () => {
    const mockGenres = {
      Drama: [1, 2],
      SciFi: [3],
    }

    const mockShows: Record<number, Show> = {
      1: { ...mockShow, id: 1, name: 'Show 1' },
      2: { ...mockShow, id: 2, name: 'Show 2' },
      3: { ...mockShow, id: 3, name: 'Show 3' },
    }

    useShowsStoreMock.mockReturnValue({
      fetchShows: fetchShowsMock,
      showsById: ref(mockShows),
      genres: ref(mockGenres),
      loading: ref(false),
      error: ref(null),
    })

    const wrapper = shallowMount(HomePage)
    const html = wrapper.html()

    expect(html).toContain('Drama')
    expect(html).toContain('SciFi')
  })
})