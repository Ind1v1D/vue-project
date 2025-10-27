<template>
    <div class="signin">
        <section class="hero-section">
            <h1 class="hero-title">Signin</h1>
            <p class="hero-subtitle">
                Start your journey to discover amazing movies!
            </p>
        </section>
        <section class="signin-section">
        <div class="signin-card">
          <div class="card-header">
            <span class="card-icon">👤<i class='bx bx-log-in'></i></span>
            <h2>Create new account </h2>
          </div>
            <form class="signin-form">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" class="signin-button">Sign In</button>
                <p class="log-text">Already have an account? </p>
                <p class="login" @click="gologin">Log in</p>   
            </form>
        </div>
    </section>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const gologin = () => {
  router.push('/login')
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* { font-family: 'Montserrat', sans-serif; }
.signin {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  min-height: 100vh;
  color: #fff;
}

.hero-section {
  background: linear-gradient( rgba(207, 48, 56, 0.15)),
    linear-gradient(to bottom, #1a1a1a, #0a0a0a);
  border-bottom: 1px solid #2d2d2d;
  padding: 2px 20px 100px;
  margin-bottom: 40px;
  text-align: center;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  display: inline-block;
}   

.hero-title {
  font-size: 3.2rem;
  font-weight: 900;
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #fff 0%, #b0b0b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  font-weight: 400;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}
.signin-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
}
.signin-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 16px;
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: slideUp 0.6s ease-out;
  align-items: center;
  justify-content: center;
}

.signin-card:hover {
  border-color: #cf3038;
  box-shadow: 0 12px 40px rgba(207, 48, 56, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.log-text {
  color: #b0b0b0;
  margin-top: 16px;
}
.login {
  color: #cf3038;
  cursor: pointer;
  font-weight: 600;
  margin-top: 8px;
}

.info-card h2 {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  color: #fff;
}
</style>