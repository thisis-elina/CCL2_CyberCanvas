<template>
  <div class="container bg-gray-900">
    <div class="spacer"></div>
    <div class="spacer"></div>
    <HeroSection></HeroSection>
    <div class="bg-custom-blue w-screen items-center justify-center px-8 ">
      <div class="grid grid-cols-4 h-screen justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="col-span-3">
          <ContentHeader></ContentHeader>
        </div>
        <div class="col-span-1 items-center justify-center">
          <Sidebar></Sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.spacer {
  height: 20px;
}

.grid {
  background-color: #111827;
}
</style>


<script setup>
import ContentHeader from "../components/ContentHeader.vue";
import Sidebar from "../components/Sidebar.vue";
import HeroSection from "../components/HeroSection.vue";
</script>