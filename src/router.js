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

// Navigation guard to handle authentication
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // If route is for guests only (login/signup) and user is authenticated
    if (to.meta.guestOnly && authStore.isAuthenticated) {
        // Redirect to home page
        next({ name: 'Home' })
    }
    // If route requires authentication and user is NOT authenticated
    else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Redirect to login page
        next({ name: 'Login' })
    }
    // Otherwise, allow navigation
    else {
        next()
    }
})

export default router