import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'

describe('Modal', () => {
  const defaultProps = {
    modelValue: true,
    title: 'Test Modal',
  }

  it('renders when modelValue is true', () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
    })
    expect(wrapper.find('.modal').exists()).toBe(true)
    expect(wrapper.find('.modal-title').text()).toBe('Test Modal')
  })

  it('does not render when modelValue is false', () => {
    const wrapper = mount(Modal, {
      props: {
        ...defaultProps,
        modelValue: false,
      },
    })
    expect(wrapper.find('.modal').exists()).toBe(false)
  })

  it('renders default header slot content', () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
    })
    expect(wrapper.find('.modal-title').text()).toBe('Test Modal')
  })

  it('renders custom header slot content', () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
      slots: {
        header: '<h5 class="custom-header">Custom Header</h5>',
      },
    })
    expect(wrapper.find('.custom-header').text()).toBe('Custom Header')
  })

  it('renders default slot content', () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
      slots: {
        default: '<div class="modal-content">Modal Content</div>',
      },
    })
    expect(wrapper.find('.modal-content').text()).toContain('Modal Content')
  })

  it('renders footer slot content', () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
      slots: {
        footer: '<div class="modal-footer">Footer Content</div>',
      },
    })
    expect(wrapper.find('.modal-footer').text()).toBe('Footer Content')
  })

  it('emits update:modelValue when close button is clicked', async () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
    })
    await wrapper.findComponent(Button).trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('has correct ARIA attributes', () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
    })
    const modal = wrapper.find('.modal')
    expect(modal.attributes('role')).toBe('dialog')
    expect(modal.attributes('tabindex')).toBe('-1')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
    })
    const modal = wrapper.find('.modal')
    expect(modal.classes()).toContain('d-block')

    const dialog = wrapper.find('.modal-dialog')
    expect(dialog.classes()).toContain('modal-fullscreen')
    expect(dialog.classes()).toContain('m-0')

    const content = wrapper.find('.modal-content')
    expect(content.classes()).toContain('text-light')

    const header = wrapper.find('.modal-header')
    expect(header.classes()).toContain('border-secondary')
    expect(header.classes()).toContain('d-flex')
    expect(header.classes()).toContain('justify-content-between')
  })

  it('stops click event propagation on modal dialog', async () => {
    const wrapper = mount(Modal, {
      props: defaultProps,
    })

    const dialog = wrapper.find('.modal-dialog')

    const stopPropagation = vi.fn()
    await dialog.trigger('click', { stopPropagation })

    expect(stopPropagation).toHaveBeenCalled()
  })
})
