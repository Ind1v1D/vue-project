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

        <div v-if="authStore.isAuthenticated" class="user-menu">
          <div class="user-button" @click="toggleDropdown">
            <div class="user-avatar">
              {{ getUserInitials }}
            </div>
            <span class="user-name">{{ authStore.currentUser.name }}</span>
            <i class='bx bx-chevron-down dropdown-icon' :class="{ rotated: showDropdown }"></i>
          </div>

          <div v-if="showDropdown" class="dropdown-menu">
            <div class="dropdown-item user-info">
              <i class='bx bx-user'></i>
              <div>
                <div class="user-info-name">{{ authStore.currentUser.name }}</div>
                <div class="user-info-email">{{ authStore.currentUser.email }}</div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <button @click="handleLogout" class="dropdown-item logout-btn">
              <i class='bx bx-log-out'></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <!-- Show login link if not logged in -->
        <router-link v-else to="/login" class="link" active-class="active">
          <div class="loginic"><i class='bx bx-log-in'></i></div>
          <span class="link-text">Log in</span>
          <span class="link-underline"></span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const showDropdown = ref(false)

const goHome = () => {
  router.push('/')
}

const getUserInitials = computed(() => {
  if (!authStore.currentUser?.name) return 'U'
  const names = authStore.currentUser.name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return names[0][0].toUpperCase()
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleLogout = () => {
  authStore.logout()
  showDropdown.value = false
  router.push('/')
}

const handleClickOutside = (event) => {
  const userMenu = document.querySelector('.user-menu')
  if (userMenu && !userMenu.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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

.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(207, 48, 56, 0.1);
  border: 1px solid rgba(207, 48, 56, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-button:hover {
  background: rgba(207, 48, 56, 0.2);
  border-color: #cf3038;
  transform: translateY(-2px);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #cf3038, #ff4444);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
}

.user-name {
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
}

.dropdown-icon {
  color: #fff;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background: #1a1a1a;
  border: 1px solid #3d3d3d;
  border-radius: 12px;
  min-width: 240px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: dropdownSlide 0.3s ease-out;
  overflow: hidden;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  color: #fff;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background: rgba(207, 48, 56, 0.1);
}

.dropdown-item i {
  font-size: 1.3rem;
  color: #cf3038;
}

.user-info {
  cursor: default;
}

.user-info:hover {
  background: transparent;
}

.user-info-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
}

.user-info-email {
  font-size: 0.85rem;
  color: #888;
}

.dropdown-divider {
  height: 1px;
  background: #3d3d3d;
  margin: 4px 0;
}

.logout-btn {
  color: #ff6b6b;
  font-weight: 600;
}

.logout-btn i {
  color: #ff6b6b;
}

.logout-btn:hover {
  background: rgba(255, 68, 68, 0.1);
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 12px 20px;
  }

  .nav-links {
    gap: 20px;
  }

  .user-name {
    display: none;
  }
}
</style>