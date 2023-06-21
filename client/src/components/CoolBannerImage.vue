<script setup></script>

<template>
  <div class="banner" aria-hidden="true">
    <img src="src/assets/illustration.svg" alt="Illustration">
  </div>
</template>

<style scoped>
.banner {
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner img {
  max-width: 100%;
  max-height: 100%;
}
</style>