<template>
    <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer-half"></div>
    <HeroSection class=""></HeroSection>
    <div class="w-screen h-screen items-center justify-center px-8">
      <div class="grid grid-cols-4 h-screen justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="col-span-3">
          <ContentHeader></ContentHeader>
          <div class="no-scrollbar posts-container">
          <Posts></Posts>
          </div>
        </div>
        <div class="col-span-1 items-center justify-center">
          <Sidebar></Sidebar>
        </div>
      </div>
    </div>
</template>

<style scoped>
.spacer {
  height: 20px;
}
.spacer-half {
  height: 20px;
}
.grid {
  background-color: #121826;
}
.posts-container {
  overflow-y: auto;
  max-height: calc(100vh - 100px);
  padding: 20px;
}
</style>


<script setup>
import ContentHeader from "../components/ContentHeader.vue";
import Sidebar from "../components/Sidebar.vue";
import HeroSection from "../components/HeroSection.vue";
import PostsPage from "../components/Posts.vue";
import Posts from "../components/Posts.vue";
</script>