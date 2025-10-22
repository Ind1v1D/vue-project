<template>
  <div class="movie-card" @click="goToDetails">
    <img
      :src="movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'"
      :alt="movie.Title"
      class="poster"
    />
    <div class="movie-info">
      <h3 class="title">{{ movie.Title }}</h3>
      <p class="year">{{ movie.Year }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({ movie: Object })
const router = useRouter()
function goToDetails() {
  router.push(`/movie/${props.movie.imdbID}`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
* {
  font-family: "Montserrat", sans-serif;
}

.movie-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 12px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #3d3d3d;
}


.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(207, 48, 56, 0.15);
  border-color: #cf3038;
}

.poster {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-bottom: 3px solid #cf3038;
}

.movie-info {
  padding: 12px 10px 18px;
  text-align: center;
}

.title {
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
  margin: 8px 0 4px;
}

.year {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
}
</style>
