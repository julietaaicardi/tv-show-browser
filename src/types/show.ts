export interface Show {
  id: number
  name: string
  summary: string
  image?: {
    medium: string
    original: string
  }
  rating?: {
    average: number
  }
  genres: string[]
  status: string
  premiered?: string
  network?: {
    name: string
  }
} 