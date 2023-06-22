<template>
  <div v-if="loggedInUser && reply" class="min-h-screen flex items-center justify-center post-container">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl py-6 text-center text-white font-bold orbitron">Edit your Reply</h1>
      <div class="post-card rounded-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="form-group">
            <textarea v-model="comment" name="comment" id="comment" rows="5" placeholder="Enter a comment"
                      class="w-full px-4 py-2 bg-gray-700 text-white rounded"></textarea>
          </div>
          <div class="flex justify-center">
            <button
                class="glass hover-purple text-white font-semibold px-4 py-2 rounded-md"
                type="submit">Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref,} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const comment = ref();
const loggedInUser = ref()
const reply = ref()
const replyID = route.params.id

onMounted(async () => {
  await login();
  await fetchReply();
})
const fetchReply = async () => {
  console.log("You in fetch reply now")
  console.log(replyID)
  const response = await fetch(`http://localhost:3000/api/replies/${replyID}`, {credentials: 'include'});
  const responseData = await response.json();
  if (responseData.success) {
    reply.value = responseData.data;
    comment.value = reply.value.comment
    console.log(reply.value)
  } else {
    console.error(responseData.error);
  }
};
const handleSubmit = async () => {
  try {
    console.log(reply.value, comment.value);
    const response = await fetch(`http://localhost:3000/api/replies/${replyID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        comment: comment.value,
      }),
      credentials: 'include',
    });
    const responseData = await response.json();
    console.log(responseData)
    if (responseData.success) {
      await router.push({path: "/posts/" + reply.value.postID});
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
  if (responseData.success) {
    loggedInUser.value = responseData.data
    console.log(loggedInUser.value)
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }
}
</script>

<style scoped>
.hover-purple:hover {
  background-color: #262e5e;
}

.post-card {
  @apply flex flex-col;
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
}

.post-container {
  @apply max-w-4xl mx-auto rounded-lg shadow-lg p-8;
}

label {
  @apply text-gray-300;
}

input,
textarea {
  @apply bg-gray-700 text-white focus:ring-purple-400;
}

textarea:focus,
input:focus {
  @apply outline-none ring-purple-400;
}

textarea {
  @apply resize-none;
}
</style>