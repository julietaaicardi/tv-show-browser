import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import ScrollableRow from '@/components/ScrollableRow.vue'

interface ScrollableRowInstance {
  showLeftArrow: boolean
  showRightArrow: boolean
  updateArrowVisibility: () => void
  getScrollAmount: () => number
  scrollContainer: HTMLElement | null
  isNonTouchDevice: boolean
}

describe('ScrollableRow', () => {
  let wrapper: VueWrapper<any>

  const setMatchMedia = (matches: boolean) => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  }

  beforeEach(() => {
    setMatchMedia(true)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    })
  })

  it('renders the title correctly', () => {
    wrapper = mount(ScrollableRow, {
      props: { title: 'Test Title' },
    })
    expect(wrapper.text()).toContain('Test Title')
  })

  it('renders scroll arrows on non-touch devices', async () => {
    setMatchMedia(true) // hover device
    wrapper = mount(ScrollableRow, {
      props: { title: 'Test' },
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.scroll-arrow.left').exists()).toBe(true)
    expect(wrapper.find('.scroll-arrow.right').exists()).toBe(true)
  })

  it('does not render scroll arrows on touch devices', async () => {
    setMatchMedia(false) // touch device
    wrapper = mount(ScrollableRow, {
      props: { title: 'Test' },
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.scroll-arrow').exists()).toBe(false)
  })

  it('has the correct CSS classes', () => {
    setMatchMedia(true)
    wrapper = mount(ScrollableRow, {
      props: { title: 'Test' },
    })
    expect(wrapper.find('.scrollable-content').exists()).toBe(true)
    expect(wrapper.find('.scrollable-container').exists()).toBe(true)
  })

  it('has the correct CSS classes for scroll arrows', async () => {
    setMatchMedia(true)
    wrapper = mount(ScrollableRow, {
      props: { title: 'Test' },
    })
    await wrapper.vm.$nextTick()

    const leftArrow = wrapper.find('.scroll-arrow.left')
    const rightArrow = wrapper.find('.scroll-arrow.right')
    expect(leftArrow.exists()).toBe(true)
    expect(rightArrow.exists()).toBe(true)
  })
})
