<template class="shadow-xl">
  <!-- Display the post card with reply data -->
  <router-link :to="`/replies/${props.replyID}`" v-if="replyData" class="post-card bg-black rounded-lg shadow-lg p-4">
    <p class="post-description text-lg text-gray-400 mb-2">{{ replyData.comment }}</p>
    <p class="post-user text-sm text-purple-300 mb-1">Posted by: {{ replyData.userName }}</p>
    <p class="post-timestamp text-sm text-blue-400">Posted at: {{ formatTimestamp(replyData.time) }}</p>
  </router-link>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';

onMounted(async () => {
  await getReply();
})

const props = defineProps(["replyID"]);
const replyData = ref();

const formatTimestamp = (timestamp) => {
  // Custom timestamp formatting logic can be added here
  return new Date(timestamp).toLocaleString();
};

async function getReply() {
  try {
    // Fetch reply data from the server
    const response = await fetch(`http://localhost:3000/api/posts/${props.postID}/${props.replyID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    // Handle the response from the server
    const responseData = await response.json();
    if (responseData.success) {
      replyData.value = responseData.data;
      console.log(replyData.value);
    } else {
      // Handle any errors that occur during the request
      console.log(responseData.error);
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
  }
}
</script>

<style scoped>
.post-card {
  /* Styling for the post card */
  @apply flex flex-col;
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
}

.post-description {
  /* Styling for the post description */
  @apply text-gray-300;
}

.post-user {
  /* Styling for the post user */
  @apply text-purple-300;
}

.post-timestamp {
  /* Styling for the post timestamp */
  @apply text-blue-400;
}
</style>
