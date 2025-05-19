import type { Show } from '@/types'

export const mockShow: Show = {
  id: 1,
  name: 'Mock Show',
  image: { original: 'mock.jpg', medium: 'mock.jpg' },
  rating: { average: 9 },
  premiered: '2020-01-01',
  genres: ['Drama'],
  language: 'English',
  runtime: 60,
  schedule: { days: ['Monday'], time: '21:00' },
  status: 'Running',
  network: {
    name: 'Mock Network',
    officialSite: 'https://mocknetwork.com',
    country: { code: 'US' },
  },
  officialSite: 'https://mockshow.com',
  summary: '<p>Mock summary</p>',
  externals: {
    imdb: 'tt123456',
    thetvdb: 654321,
    tvrage: 1111,
  },
}