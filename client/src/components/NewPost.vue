<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl text-center text-white font-bold mb-8">Create a New Discussion</h1>
      <div class="bg-gray-800 rounded-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <input v-model="title" name="title" id="title" placeholder="Title" class="w-full px-4 py-2 bg-gray-700 text-white rounded" />
          <div class="form-group">
            <textarea v-model="description" name="description" id="description" rows="5" placeholder="Enter a description" class="w-full px-4 py-2 bg-gray-700 text-white rounded"></textarea>
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

import {onMounted, ref,} from "vue";
import {createRouter as router, useRoute, useRouter} from "vue-router";
const title = ref();
const description = ref();
const loggedInUser = ref()

onMounted(() => {
  login();})

const handleSubmit = async () => {
  try {
    console.log(title.value, description.value);
    const response = await fetch(`http://127.0.0.1:3000/api/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
    }),
      credentials: 'include',
    });
    // if (!response.ok) {
    //   throw new Error("An unexpected error occurred!");
    // }
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
  }
};

const login = async () => {
  let response = await fetch('http://127.0.0.1:3000/api/login', {
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