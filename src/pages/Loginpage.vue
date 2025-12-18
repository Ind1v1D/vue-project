<template>
  <div class="login">
    <div class="hero-section">
      <div class="hero-icon">🎬</div>
      <h1 class="hero-title">Welcome Back</h1>
      <p class="hero-subtitle">Sign in to continue your movie journey</p>
    </div>

    <div class="login-section">
      <div class="login-card">
        <div class="card-header">
          <i class='bx bx-log-in icon-large'></i>
          <h2>Sign In</h2>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">
              <i class='bx bx-envelope'></i>
              Email Address
            </label>
            <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                placeholder="Enter your email"
                required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">
              <i class='bx bx-lock-alt'></i>
              Password
            </label>
            <div class="password-wrapper">
              <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="Enter your password"
                  required
              />
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="password-toggle"
              >
                <i :class="showPassword ? 'bx bx-hide' : 'bx bx-show'"></i>
              </button>
            </div>
          </div>

          <div v-if="errorMessage" class="error-message">
            <i class='bx bx-error-circle'></i>
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="success-message">
            <i class='bx bx-check-circle'></i>
            {{ successMessage }}
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="!loading">
              <i class='bx bx-log-in'></i>
              Sign In
            </span>
            <span v-else>
              <i class='bx bx-loader-alt bx-spin'></i>
              Signing in...
            </span>
          </button>
        </form>

        <div class="sign-text">
          Don't have an account?
          <span class="signin" @click="goToSignup">Sign up here</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  const result = authStore.login(formData.value)

  if (result.success) {
    successMessage.value = result.message
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } else {
    errorMessage.value = result.message
  }

  loading.value = false
}

const goToSignup = () => {
  router.push('/signin')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.login {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  min-height: 100vh;
  color: #fff;
}

.hero-section {
  background: linear-gradient(rgba(207, 48, 56, 0.15), rgba(207, 48, 56, 0.05)),
  linear-gradient(to bottom, #1a1a1a, #0a0a0a);
  border-bottom: 1px solid #2d2d2d;
  padding: 60px 20px 100px;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200%;
  height: 100%;
  background: radial-gradient(circle, rgba(207, 48, 56, 0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.hero-icon {
  font-size: 4.5rem;
  margin-bottom: 20px;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #fff 0%, #cf3038 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #b0b0b0;
  font-weight: 400;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.login-section {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

.login-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 20px;
  padding: 48px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: slideUp 0.6s ease-out;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card:hover {
  border-color: #cf3038;
  box-shadow: 0 12px 48px rgba(207, 48, 56, 0.3);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.icon-large {
  font-size: 2.5rem;
  color: #cf3038;
}

.card-header h2 {
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  color: #fff;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e0e0e0;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-label i {
  color: #cf3038;
  font-size: 1.1rem;
}

.form-input {
  background: #0a0a0a;
  border: 2px solid #3d3d3d;
  border-radius: 12px;
  padding: 14px 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: #666;
}

.form-input:focus {
  border-color: #cf3038;
  box-shadow: 0 0 0 4px rgba(207, 48, 56, 0.1);
}

.password-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #b0b0b0;
  cursor: pointer;
  font-size: 1.3rem;
  padding: 4px;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.password-toggle:hover {
  color: #cf3038;
}

.error-message,
.success-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-message {
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  color: #ff6b6b;
}

.success-message {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  color: #66bb6a;
}

.submit-btn {
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  box-shadow: 0 4px 16px rgba(207, 48, 56, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(207, 48, 56, 0.5);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.sign-text {
  color: #b0b0b0;
  margin-top: 24px;
  text-align: center;
  font-size: 0.95rem;
}

.signin {
  color: #cf3038;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.signin:hover {
  color: #ff4444;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .login-card {
    padding: 32px 24px;
  }
}
</style>