<template>
  <div class="posts-page bg-gray-900 min-h-screen py-8">
    <div class="post-list grid gap-4">
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
  await fetchPosts();
});

const fetchPosts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/posts', { credentials: 'include' });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.success) {
      posts.value=responseData.data
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
  @apply bg-gray-900 min-h-screen py-8;
}

.page-title {
  @apply text-4xl font-bold text-green-400 mb-8;
}

.post-list {
  @apply grid gap-4;
}
</style>
