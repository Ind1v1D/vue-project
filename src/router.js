import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomePage from './pages/HomePage.vue'
import MovieDetail from './pages/MovieDetail.vue'
import AboutPage from './pages/AboutPage.vue'
import Loginpage from './pages/Loginpage.vue'
import SigninPage from './pages/SigninPage.vue'

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'Home'
    },
    {
        path: '/movie/:id',
        component: MovieDetail,
        props: true,
        name: 'MovieDetail'
    },
    {
        path: '/about',
        component: AboutPage,
        name: 'About'
    },
    {
        path: '/login',
        component: Loginpage,
        name: 'Login',
        meta: { guestOnly: true }
    },
    {
        path: '/signin',
        component: SigninPage,
        name: 'Signin',
        meta: { guestOnly: true }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.guestOnly && authStore.isAuthenticated) {
        next({ name: 'Home' })
    }
    else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'Login' })
    }
    else {
        next()
    }
})

export default router