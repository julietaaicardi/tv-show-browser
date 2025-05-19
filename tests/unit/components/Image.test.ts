import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Image from '@/components/Image.vue'
import { nextTick } from 'vue'

describe('Image', () => {
  const defaultProps = {
    src: 'test-image.jpg',
    alt: 'Test Image',
    fallbackText: 'Test Fallback',
  }

  it('renders image when src is provided', () => {
    const wrapper = mount(Image, {
      props: defaultProps,
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('test-image.jpg')
    expect(img.attributes('alt')).toBe('Test Image')
  })

  it('shows fallback when src is empty', () => {
    const wrapper = mount(Image, {
      props: {
        ...defaultProps,
        src: '',
      },
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.fallback-icon').exists()).toBe(true)
    expect(wrapper.find('.fallback-text').text()).toBe('Test Fallback')
  })

  it('shows fallback when src is not provided', () => {
    const wrapper = mount(Image, {
      props: {
        alt: defaultProps.alt,
        fallbackText: defaultProps.fallbackText,
      },
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.fallback-icon').exists()).toBe(true)
    expect(wrapper.find('.fallback-text').text()).toBe('Test Fallback')
  })

  it('shows fallback when image fails to load', async () => {
    const wrapper = mount(Image, {
      props: defaultProps,
    })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.fallback-icon').exists()).toBe(true)
    expect(wrapper.find('.fallback-text').text()).toBe('Test Fallback')
  })

  it('updates when src prop changes', async () => {
    const wrapper = mount(Image, {
      props: {
        ...defaultProps,
        src: '',
      },
    })
    expect(wrapper.find('img').exists()).toBe(false)

    await wrapper.setProps({ src: 'new-image.jpg' })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('new-image.jpg')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(Image, {
      props: defaultProps,
    })
    expect(wrapper.classes()).toContain('image-container')
    expect(wrapper.classes()).toContain('w-100')
    expect(wrapper.classes()).toContain('h-100')
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.classes()).toContain('overflow-hidden')
  })

  it('fallback has correct CSS classes', async () => {
    const wrapper = mount(Image, {
      props: {
        src: '',
        alt: 'Fallback',
        fallbackText: 'No image'
      }
    })
  
    await nextTick()
  
    const fallback = wrapper.find('.d-flex')
    expect(fallback.exists()).toBe(true)
    expect(fallback.classes()).toEqual(
      expect.arrayContaining([
        'w-100',
        'h-100',
        'd-flex',
        'flex-column',
        'align-items-center',
        'justify-content-center',
        'text-light',
        'bg-gray-900'
      ])
    )
  })
})
