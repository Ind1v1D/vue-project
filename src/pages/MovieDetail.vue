<template>
  <div class="movie-detail" v-if="movie">
    <button class="back-btn" @click="goBack">⬅ Back to Movies</button>
    <div class="poster-section">
      <img :src="movie.Poster" alt="Poster" />
    </div>
    <div class="info-section">
      <h1>{{ movie.Title }}</h1>
      <p><strong>Year:</strong> {{ movie.Year }}</p>
      <p><strong>Genre:</strong> {{ movie.Genre }}</p>
      <p><strong>Director:</strong> {{ movie.Director }}</p>
      <p><strong>Actors:</strong> {{ movie.Actors }}</p>
      <p class="plot"><strong>Plot:</strong> {{ movie.Plot }}</p>
    </div>
  </div>
  <div v-else class="loading">
    <div class="spinner"></div>
    <p class="loading-text">Loading movie details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const movie = ref(null)

function goBack() {
  router.push('/')
}

onMounted(async () => {
  const id = route.params.id
  const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`)
  const data = await res.json()
  movie.value = data
})
</script>



<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
* {
  font-family: "Montserrat", sans-serif;
}
.movie-detail {
  background: linear-gradient(#0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  background-color: #f7faff;
  min-height: 100vh;
  padding: 40px 20px;
  color: #222;
  gap: 40px;
}

.back-btn {
  position: fixed;
  top: 80px; 
  left: 30px;
  background-color: #e1383d;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  z-index: 1000; 
  transition: all 0.3s ease;
  border: 1px solid #0e0e0e;
}


.back-btn:hover {
  background-color: #252525;
  border: 1px solid #e1383d;
}

.poster-section {
  flex: 1 1 300px;
  display: flex;
  justify-content: center;

}

.poster-section img {
  max-width: 300px;
  border: 1px solid #3d3d3d;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.poster-section:hover img{
  box-shadow: 0 12px 40px rgba(207, 48, 56, 0.2);
  border-color: #cf3038;
}

.info-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  flex: 2 1 400px;
  border-radius: 12px;
  border: 1px solid #3d3d3d;
  padding: 25px 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}
.info-section:hover{
  box-shadow: 0 12px 40px rgba(207, 48, 56, 0.2);
  border-color: #cf3038;
}

.info-section h1 {
  color: #fff;
  margin-bottom: 15px;
  font-size: 2rem;
  animation: fadeIn 0.6s ease;
}

.info-section p {
  margin: 8px 0;
  font-size: 1.05rem;
  color: #ddd;
}

.info-section strong {
  color: #e1383d;
}

.plot {
  margin-top: 15px;
  line-height: 1.6;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  animation: fadeIn 0.5s ease;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 100px;
  background: #181818;
}
.loading-text {
  margin-top: 15px;
  color: #fff;
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

</style>
