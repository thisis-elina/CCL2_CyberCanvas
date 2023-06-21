<template>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <div class="spacer"></div>
  <ContentHeader></ContentHeader>
  <div class="spacer"></div>
  <div class="posts-page bg-gray-900 min-h-screen py-8">
  <Posts></Posts>
  </div>
</template>


<script setup>
import ContentHeader from "../components/ContentHeader.vue";
import Posts from "../components/Posts.vue";
</script>