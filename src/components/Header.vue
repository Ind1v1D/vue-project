<template>
  <header class="navbar">
    <div class="navbar-container">
      <div class="logo" @click="goHome" role="button" tabindex="0" @keydown.enter="goHome">
        <span class="logo-icon">🎬</span>
        <span class="logo-text">MovieHub</span>
      </div>
      
      <nav class="nav-links">
        <router-link to="/" class="link" active-class="active">
          <span class="link-text">Home</span>
          <span class="link-underline"></span>
        </router-link>
        <router-link to="/about" class="link" active-class="active">
          <span class="link-text">About</span>
          <span class="link-underline"></span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.navbar {
  background: linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 100%);
  border-bottom: 2px solid #cf3038;
  box-shadow: 0 4px 16px rgba(207, 48, 56, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  width: 100%;
}

.logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  user-select: none;
  padding: 8px 12px;
  border-radius: 8px;
}

.logo:hover {
  transform: scale(1.08) translateY(-2px);
}

.logo-icon {
  font-size: 1.8rem;
  transition: transform 0.3s ease;
}

.logo:hover .logo-icon {
  transform: rotate(15deg);
}

.logo-text {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.8px;
  background: linear-gradient(135deg, #fff 0%, #b0b0b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.logo:hover .logo-text {
  background: linear-gradient(135deg, #ff4444 0%, #cf3038 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.link {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.link-text {
  transition: color 0.3s ease;
}

.link-underline {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #cf3038, #ff4444);
  transition: width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.link:hover {
  color: #ff4444;
}

.link:hover .link-underline {
  width: 100%;
}

.link.active {
  color: #ff4444;
  font-weight: 700;
}

.link.active .link-underline {
  width: 100%;
}
</style>