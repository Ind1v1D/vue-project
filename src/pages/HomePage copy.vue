<template>
  <div class="home">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Discover Your Next <span class="highlight">Favorite Movie</span>
        </h1>
        <p class="hero-subtitle">
          Search through thousands of movies and find detailed information about ratings, cast, and more.
        </p>
        <SearchBar @search="searchMovies" />
      </div>
    </section>
    <section class="results-section">
      <div class="results-container">
        <div v-if="loading" class="state-container loading-state">
          <div class="spinner"></div>
          <p class="state-text">Searching for movies...</p>
        </div>
        <div v-else-if="movies.length === 0" class="state-container empty-state">
          <span class="empty-icon">🍿</span>
          <p class="state-text">No movies found. Try searching for something else!</p>
        </div>
        <div v-else class="results-header">
          <h2>Search Results</h2>
          <p class="result-count">Found {{ movies.length }} movie{{ movies.length !== 1 ? 's' : '' }}</p>
        </div>
        <transition-group name="fade-grid" tag="div" class="movie-grid">
          <MovieCard
            v-for="m in movies"
            :key="m.imdbID"
            :movie="m"
            class="movie-item"
          />
        </transition-group>
      </div>
    </section>
  </div>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue'
import MovieCard from '../components/MovieCard.vue'
import { useMovies } from '../composables/useMovies'
import { onMounted } from 'vue'

const { movies, loading, error, searchMovies } = useMovies()

const randomWords = ['star', 'love', 'man', 'war', 'moon', 'dark', 'life', 'world', 'fire', 'dream']

const loadRandomMovies = () => {
  const randomQuery = randomWords[Math.floor(Math.random() * randomWords.length)]
  searchMovies(randomQuery)
}

onMounted(() => {
  loadRandomMovies()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.home {
  background: linear-gradient(#0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  min-height: 100vh;
  color: #fff;
}

.hero-section {
  background: linear-gradient(135deg, rgba(207, 48, 56, 0.15) 0%, rgba(207, 48, 56, 0.05) 100%),
    linear-gradient(to bottom, #1a1a1a, #0a0a0a);
  border-bottom: 1px solid #2d2d2d;
  padding: 80px 20px;
  text-align: center;
  animation: fadeIn 0.6s ease;
}

.hero-content {
  max-width: 700px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: #fff;
}

.highlight {
  background: linear-gradient(135deg, #cf3038, #ff4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 40px;
  font-weight: 400;
  line-height: 1.6;
}

.results-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
  min-height: 400px;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.loading-state {
  gap: 20px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #2d2d2d;
  border-top-color: #cf3038;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.results-header {
  animation: slideUp 0.6s ease-out;
}

.results-header h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: #fff;
}

.result-count {
  color: #b0b0b0;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  animation: slideUp 0.6s ease-out;
}

.movie-item {
  animation: fadeGridIn 0.5s ease-out;
}

.movie-item:nth-child(1) { animation-delay: 0.05s; }
.movie-item:nth-child(2) { animation-delay: 0.1s; }
.movie-item:nth-child(3) { animation-delay: 0.15s; }
.movie-item:nth-child(4) { animation-delay: 0.2s; }
.movie-item:nth-child(n+5) { animation-delay: 0.25s; }

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeGridIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-grid-enter-active,
.fade-grid-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-grid-enter-from,
.fade-grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

</style>