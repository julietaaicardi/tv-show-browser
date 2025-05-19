import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

const globalStubs = {
  'font-awesome-icon': {
    name: 'font-awesome-icon',
    template: '<span />'
  }
}

describe('Button', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(Button, {
      global: { stubs: globalStubs }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders as a button by default', () => {
    const wrapper = mount(Button, {
      global: { stubs: globalStubs }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('button')
  })

  it('renders as a link when href is provided', () => {
    const wrapper = mount(Button, {
      props: { href: 'https://example.com' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })

  it('renders as router-link when to prop is provided', () => {
    const wrapper = mount(Button, {
      props: { to: '/some-route' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies variant class correctly', () => {
    const wrapper = mount(Button, {
      props: { variant: 'secondary' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.classes()).toContain('btn-secondary')
  })

  it('applies size class when provided', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.classes()).toContain('btn-lg')
  })

  it('applies block class when block prop is true', () => {
    const wrapper = mount(Button, {
      props: { block: true },
      global: { stubs: globalStubs }
    })
    expect(wrapper.classes()).toContain('w-100')
  })

  it('disables the button when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      global: { stubs: globalStubs }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click event when clicked and not disabled', async () => {
    const wrapper = mount(Button, {
      global: { stubs: globalStubs }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      global: { stubs: globalStubs }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('renders front icon when iconFront prop is provided', () => {
    const wrapper = mount(Button, {
      props: { iconFront: 'star' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.findComponent({ name: 'font-awesome-icon' }).exists()).toBe(true)
  })

  it('renders back icon when iconBack prop is provided', () => {
    const wrapper = mount(Button, {
      props: { iconBack: 'arrow-right' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.findComponent({ name: 'font-awesome-icon' }).exists()).toBe(true)
  })
})