import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '@/components/Card.vue'
import Image from '@/components/Image.vue'
import Rating from '@/components/Rating.vue'

describe('Card', () => {
  const defaultProps = {
    id: 1,
    name: 'Test Movie',
    image: 'test-image.jpg',
    year: '2024'
  }

  it('renders properly with required props', () => {
    const wrapper = mount(Card, {
      props: defaultProps
    })
    expect(wrapper.classes()).toContain('card')
    expect(wrapper.find('.title').text()).toBe('Test Movie')
    expect(wrapper.find('.card-image').exists()).toBe(true)
  })

  it('renders rating when provided', () => {
    const wrapper = mount(Card, {
      props: {
        ...defaultProps,
        rating: 4.5
      }
    })
    expect(wrapper.findComponent(Rating).exists()).toBe(true)
  })

  it('does not render rating when not provided', () => {
    const wrapper = mount(Card, {
      props: defaultProps
    })
    expect(wrapper.findComponent(Rating).exists()).toBe(false)
  })

  it('renders year correctly', () => {
    const wrapper = mount(Card, {
      props: defaultProps
    })
    expect(wrapper.find('span').text()).toBe('(2024)')
  })

  it('renders Image component with correct props', () => {
    const wrapper = mount(Card, {
      props: defaultProps
    })
    const imageComponent = wrapper.findComponent(Image)
    expect(imageComponent.exists()).toBe(true)
    expect(imageComponent.props('src')).toBe('test-image.jpg')
    expect(imageComponent.props('alt')).toBe('Test Movie')
    expect(imageComponent.props('fallbackText')).toBe('Test Movie')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(Card, {
      props: defaultProps
    })
    expect(wrapper.classes()).toContain('position-relative')
    expect(wrapper.classes()).toContain('rounded-4')
    expect(wrapper.classes()).toContain('d-block')
    expect(wrapper.classes()).toContain('text-decoration-none')
    expect(wrapper.classes()).toContain('overflow-hidden')
  })

  it('has correct overlay structure', () => {
    const wrapper = mount(Card, {
      props: defaultProps
    })
    const overlay = wrapper.find('.card-overlay')
    expect(overlay.exists()).toBe(true)
    expect(overlay.classes()).toContain('position-absolute')
    expect(overlay.classes()).toContain('bottom-0')
    expect(overlay.classes()).toContain('left-0')
    expect(overlay.classes()).toContain('right-0')
    expect(overlay.classes()).toContain('text-light')
  })
}) 