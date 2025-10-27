import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import MovieDetail from './pages/MovieDetail.vue'
import AboutPage from './pages/AboutPage.vue' 
import Loginpage from './pages/Loginpage.vue'
import SigninPage from './pages/SigninPage.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/movie/:id', component: MovieDetail, props: true },
  { path: '/about', component: AboutPage },
  { path: '/login', component: Loginpage },
  { path: '/signin', component: SigninPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
