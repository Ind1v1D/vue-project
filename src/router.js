import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import MovieDetail from './pages/MovieDetail.vue'
import AboutPage from './pages/AboutPage.vue' 

const routes = [
  { path: '/', component: HomePage },
  { path: '/movie/:id', component: MovieDetail, props: true },
  { path: '/about', component: AboutPage } 
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
