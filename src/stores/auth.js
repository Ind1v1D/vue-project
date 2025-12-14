import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))
    const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
    const isAuthenticated = computed(() => currentUser.value !== null)

    function signup(userData) {
        const existingUser = users.value.find(u => u.email === userData.email)
        if (existingUser) {
            return { success: false, message: 'User with this email already exists' }
        }

        const newUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            createdAt: new Date().toISOString()
        }

        users.value.push(newUser)
        localStorage.setItem('users', JSON.stringify(users.value))

        login({ email: userData.email, password: userData.password })

        return { success: true, message: 'Account created successfully' }
    }

    function login(credentials) {
        const user = users.value.find(
            u => u.email === credentials.email && u.password === credentials.password
        )

        if (!user) {
            return { success: false, message: 'Invalid email or password' }
        }

        const { password, ...userWithoutPassword } = user
        currentUser.value = userWithoutPassword
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))

        return { success: true, message: 'Login successful' }
    }

    function logout() {
        currentUser.value = null
        localStorage.removeItem('currentUser')
    }

    function updateProfile(userData) {
        if (!currentUser.value) return { success: false, message: 'Not authenticated' }

        const userIndex = users.value.findIndex(u => u.id === currentUser.value.id)
        if (userIndex !== -1) {
            users.value[userIndex] = { ...users.value[userIndex], ...userData }
            localStorage.setItem('users', JSON.stringify(users.value))

            const { password, ...userWithoutPassword } = users.value[userIndex]
            currentUser.value = userWithoutPassword
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))

            return { success: true, message: 'Profile updated successfully' }
        }

        return { success: false, message: 'User not found' }
    }

    return {
        users,
        currentUser,
        isAuthenticated,
        signup,
        login,
        logout,
        updateProfile
    }
})