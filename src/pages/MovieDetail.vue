<template>
  <div class="movie-detail" v-if="movie">
    <button class="back-btn" @click="goBack">⬅ Back to Movies</button>

    <div class="content-wrapper">
      <div class="poster-section">
        <img :src="movie.Poster" alt="Poster" />
      </div>

      <div class="info-section">
        <h1>{{ movie.Title }}</h1>
        <p><strong>Year:</strong> {{ movie.Year }}</p>
        <p><strong>Genre:</strong> {{ movie.Genre }}</p>
        <p><strong>Director:</strong> {{ movie.Director }}</p>
        <p><strong>Actors:</strong> {{ movie.Actors }}</p>
        <p class="plot"><strong>Plot:</strong> {{ movie.Plot }}</p>

        <div class="interactions-section">
          <button
              @click="handleLike"
              class="like-btn"
              :class="{ liked: isLiked }"
              :disabled="!authStore.isAuthenticated"
          >
            <i :class="isLiked ? 'bx bxs-heart' : 'bx bx-heart'"></i>
            <span>Likes: {{ likesCount }}</span>
          </button>
          <span v-if="!authStore.isAuthenticated" class="auth-hint">
            <router-link to="/login">Login</router-link> to like this movie
          </span>
        </div>
      </div>
    </div>

    <div class="comments-wrapper">
      <div class="comments-header">
        <h2>
          <i class='bx bx-message-square-dots'></i>
          Comments ({{ movieComments.length }})
        </h2>
      </div>

      <div v-if="authStore.isAuthenticated" class="add-comment-section">
        <div class="user-avatar-small">
          {{ getUserInitials }}
        </div>
        <div class="comment-input-wrapper">
          <textarea
              v-model="newComment"
              placeholder="Share your thoughts about this movie..."
              class="comment-input"
              rows="3"
              @keydown.ctrl.enter="handleAddComment"
          ></textarea>
          <div class="comment-actions">
            <span class="hint">Ctrl + Enter to post</span>
            <button
                @click="handleAddComment"
                class="post-btn"
                :disabled="!newComment.trim() || isPosting"
            >
              <i class='bx bx-send'></i>
              {{ isPosting ? 'Posting...' : 'Post Comment' }}
            </button>
          </div>
        </div>
      </div>

      <div v-else class="login-prompt">
        <i class='bx bx-lock-alt'></i>
        <p>
          <router-link to="/login">Sign in</router-link> or
          <router-link to="/signin">create an account</router-link> to join the discussion
        </p>
      </div>

      <div class="comments-list">
        <div
            v-for="comment in movieComments"
            :key="comment.id"
            class="comment-card"
        >
          <div class="comment-avatar">
            {{ getCommentInitials(comment.userName) }}
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">{{ comment.userName }}</span>
              <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
            </div>

            <div v-if="editingCommentId === comment.id" class="edit-comment">
              <textarea
                  v-model="editCommentText"
                  class="comment-input"
                  rows="3"
              ></textarea>
              <div class="edit-actions">
                <button @click="saveEdit(comment.id)" class="save-btn">
                  <i class='bx bx-check'></i> Save
                </button>
                <button @click="cancelEdit" class="cancel-btn">
                  <i class='bx bx-x'></i> Cancel
                </button>
              </div>
            </div>

            <p v-else class="comment-text">{{ comment.text }}</p>

            <span v-if="comment.editedAt" class="edited-label">(edited)</span>

            <div
                v-if="authStore.currentUser?.id === comment.userId && editingCommentId !== comment.id"
                class="comment-actions-btns"
            >
              <button @click="startEdit(comment)" class="action-btn edit">
                <i class='bx bx-edit-alt'></i> Edit
              </button>
              <button @click="deleteComment(comment.id)" class="action-btn delete">
                <i class='bx bx-trash'></i> Delete
              </button>
            </div>
          </div>
        </div>

        <div v-if="movieComments.length === 0" class="empty-comments">
          <i class='bx bx-message-square-x'></i>
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <div class="spinner"></div>
    <p class="loading-text">Loading movie details...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMovieStore } from '@/stores/movie'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const movieStore = useMovieStore()

const movie = ref(null)
const newComment = ref('')
const isPosting = ref(false)
const editingCommentId = ref(null)
const editCommentText = ref('')

const movieId = computed(() => route.params.id)
const isLiked = computed(() => {
  if (!authStore.currentUser) return false
  return movieStore.hasUserLiked(movieId.value, authStore.currentUser.id)
})
const likesCount = computed(() => movieStore.getLikesCount(movieId.value))
const movieComments = computed(() => movieStore.getMovieComments(movieId.value))

const getUserInitials = computed(() => {
  if (!authStore.currentUser?.name) return 'U'
  const names = authStore.currentUser.name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return names[0][0].toUpperCase()
})

function getCommentInitials(name) {
  const names = name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return names[0][0].toUpperCase()
}

function goBack() {
  router.push('/')
}

function handleLike() {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  movieStore.toggleLike(movieId.value, authStore.currentUser.id)
}

async function handleAddComment() {
  if (!newComment.value.trim() || isPosting.value) return

  isPosting.value = true

  await new Promise(resolve => setTimeout(resolve, 300))

  movieStore.addComment(
      movieId.value,
      authStore.currentUser.id,
      authStore.currentUser.name,
      newComment.value.trim()
  )

  newComment.value = ''
  isPosting.value = false
}

function startEdit(comment) {
  editingCommentId.value = comment.id
  editCommentText.value = comment.text
}

function cancelEdit() {
  editingCommentId.value = null
  editCommentText.value = ''
}

function saveEdit(commentId) {
  movieStore.editComment(
      movieId.value,
      commentId,
      authStore.currentUser.id,
      editCommentText.value.trim()
  )
  cancelEdit()
}

function deleteComment(commentId) {
  if (confirm('Are you sure you want to delete this comment?')) {
    movieStore.deleteComment(movieId.value, commentId, authStore.currentUser.id)
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

onMounted(async () => {
  const id = route.params.id
  const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`)
  const data = await res.json()
  movie.value = data
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: "Montserrat", sans-serif;
}

.movie-detail {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  min-height: 100vh;
  padding: 40px 20px;
  color: #fff;
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto 60px;
}

.back-btn {
  position: fixed;
  top: 80px;
  left: 30px;
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  color: white;
  border: 1px solid #ff4444;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(207, 48, 56, 0.3);
}

.back-btn:hover {
  background: #252525;
  border: 1px solid #cf3038;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(207, 48, 56, 0.5);
}

.poster-section {
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
}

.poster-section img {
  max-width: 300px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #3d3d3d;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.poster-section img:hover {
  box-shadow: 0 12px 48px rgba(207, 48, 56, 0.3);
  border-color: #cf3038;
  transform: translateY(-4px);
}

.info-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  flex: 2 1 400px;
  border-radius: 16px;
  border: 1px solid #3d3d3d;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.info-section:hover {
  box-shadow: 0 12px 48px rgba(207, 48, 56, 0.2);
  border-color: #cf3038;
}

.info-section h1 {
  color: #fff;
  margin-bottom: 20px;
  font-size: 2.2rem;
  font-weight: 800;
  animation: fadeIn 0.6s ease;
}

.info-section p {
  margin: 10px 0;
  font-size: 1.05rem;
  color: #ddd;
}

.info-section strong {
  color: #cf3038;
  font-weight: 700;
}

.plot {
  margin-top: 20px;
  line-height: 1.7;
}

.interactions-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #3d3d3d;
  display: flex;
  align-items: center;
  gap: 16px;
}

.like-btn {
  background: transparent;
  border: 2px solid #cf3038;
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.like-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  transition: width 0.4s ease;
  z-index: -1;
}

.like-btn:hover:not(:disabled)::before {
  width: 100%;
}

.like-btn:hover:not(:disabled) {
  border-color: #ff4444;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(207, 48, 56, 0.4);
}

.like-btn i {
  font-size: 1.4rem;
  transition: all 0.3s ease;
}

.like-btn.liked {
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  border-color: #ff4444;
  box-shadow: 0 4px 16px rgba(207, 48, 56, 0.4);
}

.like-btn.liked::before {
  width: 100%;
}

.like-btn.liked i {
  animation: heartBeat 0.5s ease;
  color: #fff;
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.4); }
  50% { transform: scale(1.1); }
  75% { transform: scale(1.3); }
}

.like-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: #555;
  color: #888;
}

.like-btn:disabled:hover {
  transform: none;
  box-shadow: none;
}

.auth-hint {
  font-size: 0.9rem;
  color: #888;
}

.auth-hint a {
  color: #cf3038;
  text-decoration: none;
  font-weight: 600;
}

.auth-hint a:hover {
  text-decoration: underline;
}

.comments-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.comments-header {
  margin-bottom: 32px;
}

.comments-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 12px;
}

.comments-header i {
  color: #cf3038;
  font-size: 2rem;
}

.add-comment-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  display: flex;
  gap: 16px;
  transition: all 0.3s ease;
}

.add-comment-section:hover {
  border-color: #cf3038;
}

.user-avatar-small {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #cf3038, #ff4444);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.comment-input-wrapper {
  flex: 1;
}

.comment-input {
  width: 95%;
  background: #0a0a0a;
  border: 2px solid #3d3d3d;
  border-radius: 12px;
  padding: 14px 16px;
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  outline: none;
}

.comment-input::placeholder {
  color: #666;
}

.comment-input:focus {
  border-color: #cf3038;
  box-shadow: 0 0 0 4px rgba(207, 48, 56, 0.1);
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.hint {
  font-size: 0.85rem;
  color: #666;
}

.post-btn {
  background: linear-gradient(135deg, #cf3038 0%, #ff4444 100%);
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.post-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(207, 48, 56, 0.4);
}

.post-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-prompt {
  background: rgba(207, 48, 56, 0.1);
  border: 1px solid rgba(207, 48, 56, 0.3);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  margin-bottom: 32px;
}

.login-prompt i {
  font-size: 3rem;
  color: #cf3038;
  margin-bottom: 16px;
}

.login-prompt p {
  font-size: 1.1rem;
  color: #ddd;
}

.login-prompt a {
  color: #cf3038;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.login-prompt a:hover {
  color: #ff4444;
  text-decoration: underline;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #3d3d3d;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 16px;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.comment-card:hover {
  border-color: #cf3038;
  box-shadow: 0 8px 24px rgba(207, 48, 56, 0.15);
}

.comment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #555, #777);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.comment-author {
  font-weight: 700;
  color: #fff;
  font-size: 1rem;
}

.comment-date {
  color: #888;
  font-size: 0.85rem;
}

.comment-text {
  color: #ddd;
  line-height: 1.6;
  margin: 8px 0;
}

.edited-label {
  color: #666;
  font-size: 0.8rem;
  font-style: italic;
}

.comment-actions-btns {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.action-btn {
  background: none;
  border: 1px solid #3d3d3d;
  color: #ddd;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #cf3038;
}

.action-btn.delete:hover {
  background: rgba(255, 68, 68, 0.1);
  border-color: #ff4444;
  color: #ff6b6b;
}

.edit-comment {
  margin: 12px 0;
}

.edit-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.save-btn,
.cancel-btn {
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  border: none;
}

.save-btn {
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: #fff;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.cancel-btn {
  background: #3d3d3d;
  color: #fff;
}

.cancel-btn:hover {
  background: #555;
}

.empty-comments {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-comments i {
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-comments p {
  font-size: 1.1rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background: #0a0a0a;
}

.loading-text {
  margin-top: 20px;
  color: #fff;
  font-size: 1.3rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #2d2d2d;
  border-top-color: #cf3038;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .back-btn {
    top: 70px;
    left: 20px;
    padding: 10px 16px;
    font-size: 0.9rem;
  }

  .info-section h1 {
    font-size: 1.8rem;
  }

  .add-comment-section {
    flex-direction: column;
    padding: 20px;
  }

  .comment-card {
    padding: 20px;
  }
}
</style>