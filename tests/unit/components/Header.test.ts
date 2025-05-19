import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import Search from '@/components/Search.vue'
import Image from '@/components/Image.vue'

describe('Header', () => {
  const defaultProps = {
    searchResults: [],
  }

  it('renders properly with required props', () => {
    const wrapper = mount(Header, {
      props: defaultProps,
    })
    expect(wrapper.classes()).toContain('container-fluid')
    expect(wrapper.text()).toContain('TV Show Browser')
  })

  it('renders logo image', () => {
    const wrapper = mount(Header, {
      props: defaultProps,
    })
    const image = wrapper.findComponent(Image)
    expect(image.exists()).toBe(true)
    expect(image.props('alt')).toBe('TV Show Browser Logo')
  })

  it('renders Search component on desktop', () => {
    const wrapper = mount(Header, {
      props: defaultProps,
    })
    const wrapperEl = wrapper.find('.search-wrapper')
    expect(wrapperEl.exists()).toBe(true)
    expect(wrapperEl.classes()).toContain('d-none')
    expect(wrapperEl.classes()).toContain('d-md-block')

    const search = wrapperEl.findComponent(Search)
    expect(search.exists()).toBe(true)
  })

  it('renders mobile search button', () => {
    const wrapper = mount(Header, {
      props: defaultProps,
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.classes()).toContain('d-md-none')
    expect(button.attributes('aria-label')).toBe('Open search')
  })

  it('emits openMobileSearch event when mobile search button is clicked', async () => {
    const wrapper = mount(Header, {
      props: defaultProps,
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('openMobileSearch')).toBeTruthy()
  })

  it('emits select event when Search component emits select', async () => {
    const wrapper = mount(Header, {
      props: defaultProps,
    })
    const search = wrapper.findComponent(Search)
    const mockItem = { id: 1, name: 'Test Show', image: 'test.jpg', year: '2024' }
    await search.vm.$emit('select', mockItem)
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')?.[0]).toEqual([mockItem])
  })

  it('emits search event when Search component emits search', async () => {
    const wrapper = mount(Header, {
      props: defaultProps,
    })
    const search = wrapper.findComponent(Search)
    await search.vm.$emit('search', 'test query')
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['test query'])
  })

  it('emits clear event when Search component emits clear', async () => {
    const wrapper = mount(Header, {
      props: defaultProps,
    })
    const search = wrapper.findComponent(Search)
    await search.vm.$emit('clear')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('passes searchResults prop to Search component', () => {
    const searchResults = [
      { id: 1, name: 'Test Show 1', image: 'test1.jpg', year: '2024' },
      { id: 2, name: 'Test Show 2', image: 'test2.jpg', year: '2023' },
    ]
    const wrapper = mount(Header, {
      props: {
        searchResults,
      },
    })
    const search = wrapper.findComponent(Search)
    expect(search.props('results')).toEqual(searchResults)
  })
})
