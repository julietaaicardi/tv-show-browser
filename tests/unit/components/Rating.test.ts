import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rating from '@/components/Rating.vue'

describe('Rating', () => {
  it('renders rating value correctly', () => {
    const wrapper = mount(Rating, {
      props: {
        rating: 4.5,
      },
    })
    expect(wrapper.text().trim()).toBe('4.5')
  })

  it('renders star icon', () => {
    const wrapper = mount(Rating, {
      props: {
        rating: 4.5,
      },
    })
    expect(wrapper.find('.fa-icon').exists()).toBe(true)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(Rating, {
      props: {
        rating: 4.5,
      },
    })
    expect(wrapper.classes()).toContain('d-flex')
    expect(wrapper.classes()).toContain('align-items-center')

    const icon = wrapper.find('.fa-icon')
    expect(icon.classes()).toContain('text-warning')
    expect(icon.classes()).toContain('fs-6')
    expect(icon.classes()).toContain('me-1')

    const ratingText = wrapper.find('.rating-text')
    expect(ratingText.classes()).toContain('fw-bold')
  })
})
