<template>
  <!-- Spacer elements -->
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer-half"></div>

  <!-- Hero Section -->
  <HeroSection></HeroSection>

  <!-- Main Content -->
  <div class="w-screen h-screen items-center justify-center px-8">
    <div class="grid grid-cols-4 h-screen justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="col-span-3">
        <!-- Content Header -->
        <ContentHeader></ContentHeader>

        <!-- Posts Container -->
        <div class="no-scrollbar posts-container">
          <Posts></Posts>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-span-1 items-center justify-center">
        <Sidebar></Sidebar>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Spacer styles */
.spacer {
  height: 20px;
}

.spacer-half {
  height: 10px;
}

/* Grid styles */
.grid {
  background-color: #121826;
}

/* Posts Container styles */
.posts-container {
  overflow-y: auto;
  max-height: calc(100vh - 100px);
  padding: 20px;
}
</style>

<script setup>
// Component imports
import ContentHeader from "../components/ContentHeader.vue";
import Sidebar from "../components/Sidebar.vue";
import HeroSection from "../components/HeroSection.vue";
import Posts from "../components/Posts.vue";
</script>
