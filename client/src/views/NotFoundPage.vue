<template>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="page-not-found h-screen">
    <h1 class="title">404</h1>
    <h2 class="subtitle">Page Not Found</h2>
    <p class="description">Oops! The page you're looking for does not exist.</p>
    <router-link to="/" class="back-link">Go back to home</router-link>
  </div>
</template>

<style scoped>
.page-not-found {
  text-align: center;
  padding: 40px;
}

.title {
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 36px;
  margin-bottom: 20px;
}

.description {
  font-size: 24px;
  margin-bottom: 40px;
}

.back-link {
  font-size: 18px;
  text-decoration: underline;
  color: #888888;
}
</style>

<script setup>
</script>
