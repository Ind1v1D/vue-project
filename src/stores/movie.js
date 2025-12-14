import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMovieStore = defineStore('movies', () => {
    const likes = ref(JSON.parse(localStorage.getItem('movieLikes') || '{}'))
    const comments = ref(JSON.parse(localStorage.getItem('movieComments') || '{}'))

    const getMovieLikes = (movieId) => {
        return likes.value[movieId] || []
    }

    const getMovieComments = (movieId) => {
        return comments.value[movieId] || []
    }

    const hasUserLiked = (movieId, userId) => {
        const movieLikes = likes.value[movieId] || []
        return movieLikes.includes(userId)
    }

    const getLikesCount = (movieId) => {
        return (likes.value[movieId] || []).length
    }

    function toggleLike(movieId, userId) {
        if (!likes.value[movieId]) {
            likes.value[movieId] = []
        }

        const userIndex = likes.value[movieId].indexOf(userId)

        if (userIndex > -1) {
            likes.value[movieId].splice(userIndex, 1)
        } else {
            likes.value[movieId].push(userId)
        }

        localStorage.setItem('movieLikes', JSON.stringify(likes.value))

        return {
            success: true,
            liked: userIndex === -1,
            count: likes.value[movieId].length
        }
    }

    function addComment(movieId, userId, userName, commentText) {
        if (!comments.value[movieId]) {
            comments.value[movieId] = []
        }

        const newComment = {
            id: Date.now().toString(),
            userId,
            userName,
            text: commentText,
            createdAt: new Date().toISOString()
        }

        comments.value[movieId].unshift(newComment)
        localStorage.setItem('movieComments', JSON.stringify(comments.value))

        return { success: true, comment: newComment }
    }

    function deleteComment(movieId, commentId, userId) {
        if (!comments.value[movieId]) {
            return { success: false, message: 'No comments found' }
        }

        const commentIndex = comments.value[movieId].findIndex(
            c => c.id === commentId && c.userId === userId
        )

        if (commentIndex === -1) {
            return { success: false, message: 'Comment not found or unauthorized' }
        }

        comments.value[movieId].splice(commentIndex, 1)
        localStorage.setItem('movieComments', JSON.stringify(comments.value))

        return { success: true, message: 'Comment deleted' }
    }

    function editComment(movieId, commentId, userId, newText) {
        if (!comments.value[movieId]) {
            return { success: false, message: 'No comments found' }
        }

        const comment = comments.value[movieId].find(
            c => c.id === commentId && c.userId === userId
        )

        if (!comment) {
            return { success: false, message: 'Comment not found or unauthorized' }
        }

        comment.text = newText
        comment.editedAt = new Date().toISOString()
        localStorage.setItem('movieComments', JSON.stringify(comments.value))

        return { success: true, comment }
    }

    return {
        likes,
        comments,
        getMovieLikes,
        getMovieComments,
        hasUserLiked,
        getLikesCount,
        toggleLike,
        addComment,
        deleteComment,
        editComment
    }
})