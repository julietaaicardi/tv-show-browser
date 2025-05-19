import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ContentGroup from '@/components/ContentGroup.vue'
import type { Show } from '@/types'

describe('ContentGroup', () => {
  const mockShows: Record<number, Show> = {
    1: {
      id: 1,
      name: 'Test Show 1',
      summary: 'Test summary for show 1',
      image: {
        medium: 'test1.jpg',
        original: 'test1-original.jpg',
      },
      rating: {
        average: 8.5,
      },
      premiered: '2020-01-01',
      genres: ['Drama'],
      status: 'Running',
      network: {
        name: 'Test Network',
        officialSite: 'https://test.com',
        country: {
          code: 'US',
        },
      },
      officialSite: 'https://test.com',
      language: 'English',
      runtime: 60,
      schedule: {
        time: '20:00',
        days: ['Monday'],
      },
      externals: {
        imdb: 'tt123456',
        thetvdb: 123456,
        tvrage: 123456,
      },
    },
    2: {
      id: 2,
      name: 'Test Show 2',
      summary: 'Test summary for show 2',
      image: {
        medium: 'test2.jpg',
        original: 'test2-original.jpg',
      },
      rating: {
        average: 7.5,
      },
      premiered: '2021-01-01',
      genres: ['Comedy'],
      status: 'Running',
      network: {
        name: 'Test Network',
        officialSite: 'https://test.com',
        country: {
          code: 'US',
        },
      },
      officialSite: 'https://test.com',
      language: 'English',
      runtime: 30,
      schedule: {
        time: '19:00',
        days: ['Tuesday'],
      },
      externals: {
        imdb: 'tt789012',
        thetvdb: 789012,
        tvrage: 789012,
      },
    },
  }

  const globalStubs = {
    stubs: {
      Card: {
        name: 'Card',
        props: ['id', 'name', 'image', 'rating', 'year'],
        template: '<div class="stub-card" />',
      },
      ScrollableRow: {
        name: 'ScrollableRow',
        props: ['title'],
        template: '<div class="stub-scrollable-row"><slot /></div>',
      },
      RouterLink: true,
    },
  }

  const defaultProps = {
    title: 'Test ContentGroup',
    itemIds: [1, 2],
    itemsById: mockShows,
  }

  it('renders ScrollableRow with correct title', () => {
    const wrapper = shallowMount(ContentGroup, {
      props: defaultProps,
      global: globalStubs,
    })
    const scrollableRow = wrapper.findComponent({ name: 'ScrollableRow' })
    expect(scrollableRow.props('title')).toBe('Test ContentGroup')
  })

  it('renders Card components for each valid item ID', () => {
    const wrapper = shallowMount(ContentGroup, {
      props: defaultProps,
      global: globalStubs,
    })
    const cards = wrapper.findAllComponents({ name: 'Card' })
    expect(cards).toHaveLength(2)
  })

  it('filters out invalid item IDs', () => {
    const wrapper = shallowMount(ContentGroup, {
      props: {
        ...defaultProps,
        itemIds: [1, 2, 999], // 999 is an invalid ID
      },
      global: globalStubs,
    })
    const cards = wrapper.findAllComponents({ name: 'Card' })
    expect(cards).toHaveLength(2)
  })

  it('passes correct props to Card components', () => {
    const wrapper = shallowMount(ContentGroup, {
      props: defaultProps,
      global: globalStubs,
    })
    const cards = wrapper.findAllComponents({ name: 'Card' })

    // Check first card
    expect(cards[0].props('id')).toBe(1)
    expect(cards[0].props('name')).toBe('Test Show 1')
    expect(cards[0].props('image')).toBe('test1.jpg')
    expect(cards[0].props('rating')).toBe(8.5)
    expect(cards[0].props('year')).toBe('2020')

    // Check second card
    expect(cards[1].props('id')).toBe(2)
    expect(cards[1].props('name')).toBe('Test Show 2')
    expect(cards[1].props('image')).toBe('test2.jpg')
    expect(cards[1].props('rating')).toBe(7.5)
    expect(cards[1].props('year')).toBe('2021')
  })

  it('applies correct CSS classes to card wrappers', () => {
    const wrapper = shallowMount(ContentGroup, {
      props: defaultProps,
      global: globalStubs,
    })
    const links = wrapper.findAll('router-link-stub')

    links.forEach(link => {
      expect(link.classes()).toContain('card-wrapper')
      expect(link.classes()).toContain('overflow-hidden')
      expect(link.classes()).toContain('rounded-4')
      expect(link.classes()).toContain('flex-shrink-0')
    })
  })

  it('handles missing optional data gracefully', () => {
    const incompleteShow: Show = {
      id: 3,
      name: 'Incomplete Show',
      summary: 'Test summary for incomplete show',
      image: {
        medium: 'test3.jpg',
        original: 'test3-original.jpg',
      },
      rating: {
        average: undefined,
      },
      premiered: '',
      genres: [],
      status: 'Unknown',
      network: {
        name: 'Test Network',
        officialSite: 'https://test.com',
        country: {
          code: 'US',
        },
      },
      officialSite: 'https://test.com',
      language: 'English',
      runtime: 0,
      schedule: {
        time: '',
        days: [],
      },
      externals: {
        imdb: '',
        thetvdb: 0,
        tvrage: 0,
      },
    }

    const wrapper = shallowMount(ContentGroup, {
      props: {
        ...defaultProps,
        itemIds: [3],
        itemsById: { 3: incompleteShow },
      },
      global: globalStubs,
    })

    const card = wrapper.findComponent({ name: 'Card' })
    expect(card.props('rating')).toBeUndefined()
    expect(card.props('year')).toBe('')
  })
})
