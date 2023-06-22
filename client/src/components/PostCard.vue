<template class="shadow-xl">
  <div v-if="postData" class="post-card rounded-lg shadow-lg p-4">
    <p class="post-user text-sm text-purple-300 mb-1">Posted by: {{ postData.userName }}</p>
    <p class="post-timestamp text-gray-400 text-sm">Posted at: {{ formatTimestamp(postData.time) }}</p>
    <div class="spacer"></div>
    <h2 class="post-title  text-2xl mb-2">{{ postData.title }}</h2>
    <p class="post-description text-lg text-gray-400 mb-2">{{ postData.description }}</p>
    <div v-if="postData && loggedInUser" class="flex justify-end mt-4"><div v-if="postData && loggedInUser" class="flex justify-end mt-4">
      <button class="reply-button text-white px-4 py-2 rounded-md mr-2" @click="replyPost">Reply</button>
      <button v-if="parseInt(postData.userID) === parseInt(loggedInUser.id)" class="edit-button text-white px-4 py-2 rounded-md mr-2" @click="editPost">Edit</button>
      <button v-if="parseInt(postData.userID) === parseInt(loggedInUser.id)" class="delete-button text-white px-4 py-2 rounded-md" @click="deletePost">Delete</button>
    </div></div>
  </div>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const loggedInUser = ref()

onMounted(async () => {
  await login();
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

const login = async () => {
  let response = await fetch('http://localhost:3000/api/login', {
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
    loggedInUser.value=responseData.data
    console.log(loggedInUser.value)
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }}

const replyPost = () => {
  router.push(`/posts/${props.postID}`)
}

</script>

<style scoped>
.post-card {
  @apply flex flex-col;
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
}

.post-title {
  @apply font-bold;
  font-family: 'Orbitron', sans-serif;
  font-weight: 2000;
  font-size: 2rem;
  color: #6278f6
}

.post-description {
  @apply text-gray-300;
  font-family: 'Tenor Sans', sans-serif;
}

.post-user {
  font-family: 'Tenor Sans', sans-serif;
  color: #5bd2ee
}

.post-timestamp {
  font-family: 'Tenor Sans', sans-serif;
}

.reply-button {
  background-color: #4453aa;
  box-shadow: 0 0 10px #4453aa;
  text-shadow: 0 0 5px #4453aa;
}

.edit-button {
  background-color: #535455;
  box-shadow: 0 0 10px #535455;
  text-shadow: 0 0 5px #535455;
}

.delete-button {
  background-color: #ac2e2e;
  box-shadow: 0 0 10px #ac2e2e;
  text-shadow: 0 0 5px #ac2e2e;
}




</style>
