import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

describe('Auth Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
    })

    it('signs up a new user successfully', () => {
        const auth = useAuthStore()

        const result = auth.signup({
            name: 'Test User',
            email: 'test@mail.com',
            password: '123456'
        })

        expect(result.success).toBe(true)
        expect(auth.isAuthenticated).toBe(true)
        expect(auth.currentUser.email).toBe('test@mail.com')
    })
})
