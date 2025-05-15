import axios from 'axios'
import type { Show } from '../types/show'

const api = axios.create({
  baseURL: 'https://api.tvmaze.com',
})

export async function getShows(): Promise<Show[]> {
  const { data } = await api.get('/shows')
  return data
}

export async function getShowById(id: number): Promise<Show> {
  const { data } = await api.get(`/shows/${id}`)
  return data
}

export async function searchShows(query: string): Promise<Show[]> {
  const { data } = await api.get(`/search/shows?q=${encodeURIComponent(query)}`)
  return data.map((item: { show: Show }) => item.show)
} 