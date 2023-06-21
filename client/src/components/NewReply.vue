<template>
  <div v-if="loggedInUser" class="bg-gray-900 flex items-center justify-center">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl text-center text-white font-bold mb-8">Create a Reply</h1>
      <div class="bg-gray-800 rounded-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="form-group">
            <textarea v-model="comment" name="comment" id="comment" rows="5" placeholder="Enter your comment" class="w-full px-4 py-2 bg-gray-700 text-white rounded"></textarea>
          </div>
          <div class="flex justify-center">
            <button class="glass bg-custom-blue-dark bg-custom-blue-darker text-white font-semibold px-4 py-2 rounded-md" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["postID"]);
import {defineProps, onMounted, ref,} from "vue";
import {useRoute, useRouter} from "vue-router";
const router = useRouter()
const comment = ref();
const description = ref();
const loggedInUser = ref()

onMounted(async () => {
  await login();
})

const handleSubmit = async () => {
  try {
    console.log(description.value);
    const response = await fetch(`http://localhost:3000/api/posts/${props.postID}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        comment: comment.value,
        userID: loggedInUser.value.id,
      }),
      credentials: 'include',
    });
    const responseData = await response.json();
    console.log(responseData)
    if (responseData.success){
      await router.go();
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
</script>

<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.btn-primary {
  @apply bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded;
}

.btn-primary:focus {
  @apply outline-none ring-purple-400;
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

.bg-custom-blue-dark {
  background-color: #4f46e5;
}

.bg-custom-blue-darker:hover {
  background-color: #372fc8;
}

.underline-on-hover:hover {
  text-decoration: underline;
}
</style>