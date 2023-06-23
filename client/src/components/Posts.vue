<template>
  <!-- Display the posts page -->
  <div class="posts-page bg-gray-900 min-h-screen py-8">
    <div class="post-list grid gap-4">
      <!-- Iterate over each post and display a PostCard component -->
      <PostCard v-for="post in posts" :postID="post.id" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PostCard from "./PostCard.vue";
import { useRouter } from 'vue-router';
import ContentHeader from "./ContentHeader.vue";

const router = useRouter();
const posts = ref([]);

onMounted(async () => {
  // Fetch the posts when the component is mounted
  await fetchPosts();
});

const fetchPosts = async () => {
  try {
    // Fetch the posts data from the API
    const response = await fetch('http://localhost:3000/api/posts', { credentials: 'include' });
    const responseData = await response.json();
    if (responseData.success) {
      // Assign the fetched posts to the 'posts' ref
      posts.value = responseData.data;
    } else {
      // Handle any errors that occur during the request
      console.log(responseData.error);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.posts-page {
  /* Styling for the posts page */
  @apply bg-gray-900 min-h-screen py-8;
}

.page-title {
  /* Styling for the page title */
  @apply text-4xl font-bold text-green-400 mb-8;
}

.post-list {
  /* Styling for the post list */
  @apply grid gap-4;
}
</style>
