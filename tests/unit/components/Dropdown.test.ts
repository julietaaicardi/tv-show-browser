import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from '@/components/Dropdown.vue'
import Image from '@/components/Image.vue'

describe('Dropdown', () => {
  const mockItems = [
    {
      id: 1,
      name: 'Test Movie 1',
      image: 'test-image-1.jpg',
      year: '2024'
    },
    {
      id: 2,
      name: 'Test Movie 2',
      image: 'test-image-2.jpg',
      year: '2023'
    }
  ]

  const defaultProps = {
    visible: true,
    items: mockItems,
    isLoading: false,
    error: '',
    query: 'test'
  }

  it('renders when visible prop is true', () => {
    const wrapper = mount(Dropdown, {
      props: defaultProps
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  it('does not render when visible prop is false', () => {
    const wrapper = mount(Dropdown, {
      props: {
        ...defaultProps,
        visible: false
      }
    })
    expect(wrapper.isVisible()).toBe(false)
  })

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Something went wrong'
    const wrapper = mount(Dropdown, {
      props: {
        ...defaultProps,
        error: errorMessage
      }
    })
    expect(wrapper.text()).toContain(errorMessage)
  })

  it('displays "No results found" when items array is empty and query exists', () => {
    const wrapper = mount(Dropdown, {
      props: {
        ...defaultProps,
        items: [],
        query: 'nonexistent'
      }
    })
    expect(wrapper.text()).toContain('No results found')
  })

  it('renders list of items correctly', () => {
    const wrapper = mount(Dropdown, {
      props: defaultProps
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    
    // Check first item
    expect(buttons[0].text()).toContain('Test Movie 1')
    expect(buttons[0].text()).toContain('2024')
    
    // Check second item
    expect(buttons[1].text()).toContain('Test Movie 2')
    expect(buttons[1].text()).toContain('2023')
  })

  it('renders Image component for each item', () => {
    const wrapper = mount(Dropdown, {
      props: defaultProps
    })
    const images = wrapper.findAllComponents(Image)
    expect(images).toHaveLength(2)
    
    // Check first image props
    expect(images[0].props('src')).toBe('test-image-1.jpg')
    expect(images[0].props('alt')).toBe('Test Movie 1')
    
    // Check second image props
    expect(images[1].props('src')).toBe('test-image-2.jpg')
    expect(images[1].props('alt')).toBe('Test Movie 2')
  })

  it('emits select event when item is clicked', async () => {
    const wrapper = mount(Dropdown, {
      props: defaultProps
    })
    await wrapper.find('button').trigger('mousedown')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')?.[0]).toEqual([mockItems[0]])
  })

  it('updates activeIndex on mouseenter', async () => {
    const wrapper = mount(Dropdown, {
      props: defaultProps
    })
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('mouseenter')
    expect(wrapper.emitted('update:activeIndex')).toBeTruthy()
    expect(wrapper.emitted('update:activeIndex')?.[0]).toEqual([1])
  })

  it('has correct ARIA attributes', () => {
    const wrapper = mount(Dropdown, {
      props: defaultProps
    })
    const container = wrapper.find('[role="listbox"]')
    expect(container.exists()).toBe(true)
    
    const buttons = wrapper.findAll('[role="option"]')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].attributes('aria-selected')).toBe('false')
  })
}) 