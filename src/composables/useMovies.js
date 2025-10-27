import { ref } from 'vue'
import axios from 'axios'

export function useMovies() {
  const movies = ref([])
  const loading = ref(false)
  const error = ref(null)

  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`

  async function searchMovies(query) {
    if (!query) return
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${baseUrl}&s=${query}`)
      if (response.data.Response === 'True') {
        movies.value = response.data.Search
      } else {
        error.value = response.data.Error
      }
    } catch (err) {
      error.value = 'Failed to fetch movies'
    } finally {
      loading.value = false
    }
  }

  return { movies, loading, error, searchMovies }
}
