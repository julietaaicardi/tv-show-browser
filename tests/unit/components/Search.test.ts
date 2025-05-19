import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import Search from '@/components/Search.vue'
import type { ResultItem } from '@/types'

interface SearchInstance {
  searchQuery: string
  isLoading: boolean
  error: string
  showResults: boolean
  activeIndex: number
  activeResultId: string
  handleInput: () => void
  handleKeydown: (event: KeyboardEvent) => void
  selectItem: (item: ResultItem) => void
  handleBlur: () => void
}

describe('Search', () => {
  let wrapper: VueWrapper<any>
  const mockResults: ResultItem[] = [
    { id: 1, name: 'Test Show 1', image: 'test1.jpg', year: '2020' },
    { id: 2, name: 'Test Show 2', image: 'test2.jpg', year: '2021' },
  ]

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(Search, {
      props: {
        results: mockResults,
      },
      global: {
        stubs: {
          'font-awesome-icon': {
            template: '<i class="fa-search"></i>',
          },
        },
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders search input with correct attributes', () => {
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('search')
    expect(input.attributes('placeholder')).toBe('Search...')
    expect(input.attributes('aria-label')).toBe('Search')
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('autocomplete')).toBe('off')
  })

  it('shows loading spinner when isLoading is true', async () => {
    ;(wrapper.vm as any).isLoading = true
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.spinner-border').exists()).toBe(true)
    expect(wrapper.find('.fa-search').exists()).toBe(false)
  })

  it('shows search icon when not loading', async () => {
    ;(wrapper.vm as any).isLoading = false
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.spinner-border').exists()).toBe(false)
    expect(wrapper.find('.fa-search').exists()).toBe(true)
  })

  it('emits search event with debounce when input changes', async () => {
    const input = wrapper.find('input')
    await input.setValue('test query')
    expect(wrapper.emitted('search')).toBeFalsy()
    await vi.advanceTimersByTimeAsync(400)
    expect(wrapper.emitted('search')?.[0]).toEqual(['test query'])
  })

  it('emits clear event when input is empty', async () => {
    const input = wrapper.find('input')
    await input.setValue('')
    await vi.advanceTimersByTimeAsync(400)
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('handles keyboard navigation', async () => {
    ;(wrapper.vm as any).showResults = true
    await wrapper.vm.$nextTick()

    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    expect((wrapper.vm as any).activeIndex).toBe(0)

    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    expect((wrapper.vm as any).activeIndex).toBe(1)

    await wrapper.find('input').trigger('keydown', { key: 'ArrowUp' })
    expect((wrapper.vm as any).activeIndex).toBe(0)

    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')?.[0]).toEqual([mockResults[0]])
    expect((wrapper.vm as any).searchQuery).toBe('')
    expect((wrapper.vm as any).showResults).toBe(false)
    ;(wrapper.vm as any).showResults = true
    await wrapper.vm.$nextTick()
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect((wrapper.vm as any).showResults).toBe(false)
  })

  it('selects item and clears input', async () => {
    await (wrapper.vm as any).selectItem(mockResults[0])
    expect(wrapper.emitted('select')?.[0]).toEqual([mockResults[0]])
    expect((wrapper.vm as any).searchQuery).toBe('')
    expect((wrapper.vm as any).showResults).toBe(false)
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('hides results on blur after delay', async () => {
    ;(wrapper.vm as any).showResults = true
    await wrapper.find('input').trigger('blur')
    expect((wrapper.vm as any).showResults).toBe(true)
    await vi.advanceTimersByTimeAsync(200)
    expect((wrapper.vm as any).showResults).toBe(false)
  })

  it('computes active result ID correctly', async () => {
    ;(wrapper.vm as any).activeIndex = 0
    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).activeResultId).toBe('search-result-1')
    ;(wrapper.vm as any).activeIndex = 1
    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).activeResultId).toBe('search-result-2')
    ;(wrapper.vm as any).activeIndex = -1
    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).activeResultId).toBe('')
  })

  it('passes correct props to Dropdown component', async () => {
    ;(wrapper.vm as any).showResults = true
    ;(wrapper.vm as any).isLoading = true
    ;(wrapper.vm as any).error = 'Test error'
    ;(wrapper.vm as any).searchQuery = 'test'
    await wrapper.vm.$nextTick()

    const dropdown = wrapper.findComponent({ name: 'Dropdown' })
    expect(dropdown.props('visible')).toBe(true)
    expect(dropdown.props('isLoading')).toBe(true)
    expect(dropdown.props('error')).toBe('Test error')
    expect(dropdown.props('query')).toBe('test')
    expect(dropdown.props('items')).toEqual(mockResults)
  })

  it('cleans up timeouts on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout')
    wrapper.unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
