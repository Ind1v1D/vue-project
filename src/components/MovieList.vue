<template>
  <div class="movie-list">
    <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
  </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue'

const props = defineProps({
  movies: Array
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
* {
  font-family: "Montserrat", sans-serif;
}

.movie-list {
  background: black;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 40px;
  justify-items: center;
  background-color: #f7faff;
  border-radius: 12px;
  animation: fadeIn 0.6s ease;
}
</style>
