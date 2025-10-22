<template>
  <form class="search" @submit.prevent="onSubmit">
    <input v-model="q" placeholder="Search movies (e.g. Guardians)" />
    <button type="submit">Search</button>
    <button type="button" v-if="q" @click="clear">Clear</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const q = ref('')
const emit = defineEmits(['search'])

function onSubmit() {
  emit('search', q.value.trim())
}
function clear() {
  q.value = ''
  emit('search', '')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
* {
  font-family: "Montserrat", sans-serif;
}

.search { display:flex; gap: 8px; margin: 12px 0; }
.search input {
margin-left: 15px;
flex:1;
padding:8px 10px; 
border-radius:6px; 
border:1px solid #ff3b44; 
background:linear-gradient(#0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%); 
color:#fff; font-size:1rem; transition: border 0.2s ease }
.search button { padding:8px 12px;
  border-radius:6px;
  border:1px solid #ff3b44; 
  background:#000; 
  color:white; 
  cursor:pointer; 
 }
.search button:hover { 
  color:#fff; 
  background: #cf3037; 
}
.search button[type="button"] {
   background:#cf3037 ;
   color: #fff;
   font-weight: 500;
   border:1px solid #ff3b44; 
   transition: FadeIn 0.3s ease;
  }
.search button[type="button"]:hover {
   color:#fff;
    background: #9c242a; 
    }
    @keyframes FadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
</style>
