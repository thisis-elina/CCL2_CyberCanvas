<template>
  <!-- Spacers -->
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer"></div>

  <!-- ContentHeader Component -->
  <ContentHeader></ContentHeader>

  <div class="spacer"></div>

  <!-- Posts Component -->
  <div class="posts-page bg-gray-900 min-h-screen py-8">
    <Posts></Posts>
  </div>
</template>


<script setup>
// Import necessary components
import ContentHeader from "../components/ContentHeader.vue";
import Posts from "../components/Posts.vue";
</script>