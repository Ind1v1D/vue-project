<template>
  <div id="app">
    <Header />
    <main class="container">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style scoped>
.container{
  background: #181818;
  min-height: calc(100vh - 70px);
  padding: 20px 0;
}
</style>