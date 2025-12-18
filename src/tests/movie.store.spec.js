import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMovieStore } from '@/stores/movie'

describe('Movie Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
    })

    it('toggles like for a movie', () => {
        const store = useMovieStore()

        const result = store.toggleLike('movie1', 'user1')

        expect(result.success).toBe(true)
        expect(store.getLikesCount('movie1')).toBe(1)
        expect(store.hasUserLiked('movie1', 'user1')).toBe(true)
    })
})
