import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '@/components/MovieCard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: []
})

describe('MovieCard', () => {
    it('renders movie title and year', async () => {
        const wrapper = mount(MovieCard, {
            global: {
                plugins: [router]
            },
            props: {
                movie: {
                    Title: 'Inception',
                    Year: '2010',
                    Poster: 'N/A',
                    imdbID: 'tt1375666'
                }
            }
        })

        expect(wrapper.text()).toContain('Inception')
        expect(wrapper.text()).toContain('2010')
    })
})
