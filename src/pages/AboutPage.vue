<template>
  <div class="about">
    <section class="hero-section">
      <div class="hero-icon">🎬</div>
      <h1 class="hero-title">Movie Recommendation Hub</h1>
      <p class="hero-subtitle">
        Discover, explore, and rate movies with the power of Vue 3 and OMDb API
      </p>
    </section>

    <section class="content-section">
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <span class="card-icon">📖</span>
            <h2>About This Project</h2>
          </div>
          <p class="card-content">
            This website is created to demonstrate working with <strong>Vue 3</strong> and
            <strong>OMDb API</strong>. You can search for movies, view details, and check ratings.
          </p>
        </div>

        <div class="details-card">
          <div class="details-grid">
            <div class="detail-item">
              <span class="detail-icon">👨‍💻</span>
              <h3>Developed By</h3>
              <div class="developer-list">
                <p>Danara Bagauova</p>
                <p>Makhambet Yerdaulet</p>
                <p>Shoibek Arman</p>
              </div>
            </div>

            <div class="detail-item">
              <span class="detail-icon">⚙️</span>
              <h3>Technologies Used</h3>
              <div class="tech-list">
                <span class="tech-tag">Vue 3</span>
                <span class="tech-tag">Vue Router</span>
                <span class="tech-tag">Axios</span>
                <span class="tech-tag">Vite</span>
                <span class="tech-tag">OMDb API</span>
              </div>
            </div>
          </div>
        </div>

        <div class="features-section">
          <h2 class="section-title">What You Can Do</h2>
          <div class="features-list">
            <div class="feature-item">
              <span class="feature-number">01</span>
              <h3>Search Movies</h3>
              <p>Find any movie by title using our search functionality</p>
            </div>
            <div class="feature-item">
              <span class="feature-number">02</span>
              <h3>View Details</h3>
              <p>Get comprehensive information about cast, plot, and ratings</p>
            </div>
            <div class="feature-item">
              <span class="feature-number">03</span>
              <h3>Check Ratings</h3>
              <p>See IMDb ratings and user reviews at a glance</p>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <h2>Start Exploring</h2>
          <p>Ready to discover your next favorite movie?</p>
          <router-link to="/" class="cta-button">Go to Home</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* { font-family: 'Montserrat', sans-serif; }

.about {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  min-height: 100vh;
  color: #fff;
}

.hero-section {
  background: linear-gradient( rgba(207, 48, 56, 0.15)),
    linear-gradient(to bottom, #1a1a1a, #0a0a0a);
  border-bottom: 1px solid #2d2d2d;
  padding: 80px 20px;
  text-align: center;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
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

.content-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.info-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 16px;
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: slideUp 0.6s ease-out;
}

.info-card:hover {
  border-color: #cf3038;
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(207, 48, 56, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.card-icon { font-size: 2.5rem; }

.info-card h2 {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  color: #fff;
}

.card-content {
  font-size: 1.05rem;
  color: #b0b0b0;
  line-height: 1.8;
  margin: 0;
  font-weight: 400;
}

.card-content strong {
  color: #cf3038;
  font-weight: 700;
}

.details-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 16px;
  padding: 40px;
  animation: slideUp 0.7s ease-out;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.detail-item { text-align: center; }

.detail-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 16px;
}

.detail-item h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #fff;
}

.developer-list p {
  font-size: 1rem;
  color: #b0b0b0;
  margin: 8px 0;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.tech-tag {
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  color: #fff;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(207, 48, 56, 0.25);
  transition: all 0.3s ease;
  display: inline-block;
}

.tech-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(207, 48, 56, 0.4);
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 32px;
  text-align: center;
  color: #fff;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-item {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.feature-item:hover {
  border-color: #cf3038;
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(207, 48, 56, 0.15);
}

.feature-number {
  display: inline-block;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 12px;
  color: #cf3038;
}

.feature-item h3 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: #fff;
}

.feature-item p {
  font-size: 1rem;
  color: #b0b0b0;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

.cta-section {
  background: linear-gradient(135deg, rgba(207, 48, 56, 0.2) 0%, rgba(207, 48, 56, 0.1) 100%);
  border: 2px solid #cf3038;
  border-radius: 16px;
  padding: 50px 40px;
  text-align: center;
  animation: slideUp 0.9s ease-out;
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: #fff;
}

.cta-section p {
  font-size: 1.05rem;
  color: #b0b0b0;
  margin-bottom: 28px;
  font-weight: 400;
}

.cta-button {
  display: inline-block;
  padding: 14px 40px;
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 6px 20px rgba(207, 48, 56, 0.4);
  border: none;
  cursor: pointer;
}

.cta-button:hover {
  transform: translateY(-3px);
}
</style>
