import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { ref } from 'vue'
import ShowDetail from '@/views/ShowDetail.vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '@/stores/shows'
import { mockShow } from '../../__mocks__/shows'

vi.mock('vue-router', () => {
  return {
    useRoute: vi.fn(),
  }
})

vi.mock('@/stores/shows', () => {
  return {
    useShowsStore: vi.fn(),
  }
})

const useRouteMock = useRoute as unknown as ReturnType<typeof vi.fn>
const useShowsStoreMock = useShowsStore as unknown as ReturnType<typeof vi.fn>

describe('ShowDetail.vue', () => {
  let fetchShowByIdMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchShowByIdMock = vi.fn()

    useRouteMock.mockReturnValue({ params: { id: '123' } })

    useShowsStoreMock.mockReturnValue({
      fetchShowById: fetchShowByIdMock,
      currentShow: ref(mockShow),
      loading: ref(false),
      error: ref(null),
    })
  })

  it('calls fetchShowById on mount with the correct id', () => {
    shallowMount(ShowDetail)
    expect(fetchShowByIdMock).toHaveBeenCalledWith(123)
  })

  it('renders loading spinner when loading is true', () => {
    (useShowsStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      fetchShowById: fetchShowByIdMock,
      currentShow: ref(null),
      loading: ref(true),
      error: ref(null),
    })

    const wrapper = shallowMount(ShowDetail)
    expect(wrapper.find('.spinner-border').exists()).toBe(true)
  })

  it('renders error message when error is set', () => {
    (useShowsStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      fetchShowById: fetchShowByIdMock,
      currentShow: ref(null),
      loading: ref(false),
      error: ref('Something went wrong'),
    })

    const wrapper = shallowMount(ShowDetail)
    expect(wrapper.find('.alert-danger').text()).toContain('Something went wrong')
  })
})