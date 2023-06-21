<template class="shadow-xl">
  <router-link :to="`/posts/${props.postID}`" v-if="postData" class="post-card bg-black rounded-lg shadow-lg p-4">
    <h2 class="post-title text-2xl text-green-400 mb-2">{{ postData.title }}</h2>
    <p class="post-description text-lg text-gray-400 mb-2">{{ postData.description }}</p>
    <p class="post-user text-sm text-purple-300 mb-1">Posted by : {{ postData.userName }}</p>
    <p class="post-timestamp text-sm text-blue-400">Posted at: {{ formatTimestamp(postData.time) }}</p>
    <div class="flex justify-end mt-4">
      <button class="edit-button bg-blue-500 text-white px-4 py-2 rounded-md mr-2" @click="editPost">Edit</button>
      <button class="delete-button bg-red-500 text-white px-4 py-2 rounded-md" @click="deletePost">Delete</button>
    </div>
  </router-link>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await getPost();
})

const props = defineProps(["postID"]);
const postData = ref()
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};


async function getPost(){
  let response = await fetch(`http://localhost:3000/api/posts/${props.postID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  });

  // Handle the response from the server
  const responseData = await response.json();
  if (responseData.success){
    postData.value=responseData.data
    console.log(postData.value)
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }}

const editPost = () => {
  router.push(`/posts/${props.postID}/edit`);
}

const deletePost = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${props.postID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });
    const responseData = await response.json();
    console.log(responseData)
    if (responseData.success) {
      await router.push({path: '/'});
    } else {
      // Handle any errors that occur during the request
      console.log(responseData.error);
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
  }
};


</script>

<style scoped>
.post-card {
  @apply flex flex-col;
}

.post-title {
  @apply font-bold;
}

.post-description {
  @apply text-gray-300;
}

.post-user {
  @apply text-purple-300;
}

.post-timestamp {
  @apply text-blue-400;
}
</style>
