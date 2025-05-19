import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '@/components/Badge.vue'

describe('Badge', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Badge Text'
      }
    })
    expect(wrapper.text()).toBe('Badge Text')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('applies variant class correctly', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'secondary'
      }
    })
    expect(wrapper.classes()).toContain('bg-secondary')
  })

  it('applies pill class when pill prop is true', () => {
    const wrapper = mount(Badge, {
      props: {
        pill: true
      }
    })
    expect(wrapper.classes()).toContain('rounded-pill')
  })

  it('does not apply pill class when pill prop is false', () => {
    const wrapper = mount(Badge, {
      props: {
        pill: false
      }
    })
    expect(wrapper.classes()).not.toContain('rounded-pill')
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Custom Badge Content'
      }
    })
    expect(wrapper.text()).toBe('Custom Badge Content')
  })
}) 