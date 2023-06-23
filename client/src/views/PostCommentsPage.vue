<template>
  <!-- CoolBannerImage Component -->
  <CoolBannerImage></CoolBannerImage>

  <div class="spacer"></div>

  <!-- PostComments Component -->
  <PostComments v-if="postID" :postID="postID"></PostComments>
</template>


<script setup>
// Import necessary components and functions
import PostComments from "../components/PostComments.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

// Access the current route and router
const route = useRoute();
const router = useRouter();

// Create a reactive variable to store the post ID
const postID = ref();

// Retrieve the post ID when the component is mounted
onMounted(async () => {
  postID.value = route.params.id;
});
</script>
