<template>
  <div class="not-found">
    <div class="error-container">
      <div class="error-icon">🎬</div>
      
      <div class="error-code">404</div>
      
      <h1 class="error-title">Scene Not Found</h1>
      
      <p class="error-message">
        Oops! This page seems to be missing from our database.
        <br />
        Looks like this scene didn't make the final cut.
      </p>

      <div class="error-visual">
        <div class="film-strip">
          <div class="film-hole"></div>
          <div class="film-hole"></div>
          <div class="film-hole"></div>
        </div>
        <div class="broken-reel">🎞️</div>
        <div class="film-strip">
          <div class="film-hole"></div>
          <div class="film-hole"></div>
          <div class="film-hole"></div>
        </div>
      </div>

      <div class="action-buttons">
        <router-link to="/" class="home-button">
          <span class="button-icon">🏠</span>
          Back to Home
        </router-link>
      </div>

      <div class="suggestions">
        <p class="suggestions-title">You might want to:</p>
        <ul class="suggestions-list">
          <li>Check the URL for typos</li>
          <li>Search for your favorite movies</li>
          <li>Explore trending titles</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* { 
  font-family: 'Montserrat', sans-serif; 
  margin: 0;
  padding: 0;
}

.not-found {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 20px;
}

.error-container {
  max-width: 700px;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  display: inline-block;
  animation: swing 3s infinite ease-in-out;
  filter: grayscale(50%);
}

@keyframes swing {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

.error-code {
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(207, 48, 56, 0.3);
  animation: glitch 5s infinite;
}

@keyframes glitch {
  0%, 98%, 100% { 
    transform: translate(0);
    filter: blur(0);
  }
  99% { 
    transform: translate(-2px, 2px);
    filter: blur(1px);
  }
}

.error-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #fff 0%, #b0b0b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-message {
  font-size: 1.15rem;
  color: #b0b0b0;
  line-height: 1.8;
  margin-bottom: 40px;
  font-weight: 400;
}

.error-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  opacity: 0.6;
}

.film-strip {
  width: 60px;
  height: 40px;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
  border: 2px solid #3d3d3d;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  padding: 0 8px;
  align-items: center;
}

.film-hole {
  width: 8px;
  height: 8px;
  background: #0a0a0a;
  border-radius: 50%;
}

.broken-reel {
  font-size: 3rem;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.action-buttons {
  margin: 50px 0 40px;
}

.home-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 50px;
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 24px rgba(207, 48, 56, 0.4);
  border: none;
  cursor: pointer;
}

.home-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(207, 48, 56, 0.6);
}

.home-button:active {
  transform: translateY(-2px);
}

.button-icon {
  font-size: 1.3rem;
}

.suggestions {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 12px;
  padding: 30px;
  margin-top: 40px;
  transition: all 0.3s ease;
}

.suggestions:hover {
  border-color: #cf3038;
  box-shadow: 0 8px 24px rgba(207, 48, 56, 0.15);
}

.suggestions-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
}

.suggestions-list {
  list-style: none;
  padding: 0;
}

.suggestions-list li {
  font-size: 1rem;
  color: #b0b0b0;
  padding: 8px 0;
  position: relative;
  padding-left: 24px;
  text-align: left;
  font-weight: 400;
}

.suggestions-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #cf3038;
  font-weight: 700;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 7rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .home-button {
    padding: 14px 40px;
    font-size: 1rem;
  }

  .error-visual {
    transform: scale(0.8);
  }
}
</style>
