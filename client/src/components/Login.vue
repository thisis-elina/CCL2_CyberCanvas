<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 class="text-3xl text-center text-custom-blue mb-6">Greetings, netizen!</h1>
      <form @submit.prevent="submitForm">
        <div class=" mb-4
      ">
      <label for="userName" class="block text-custom-blue-light mb-1">Username</label>
      <input
          id="userName"
          v-model="userName"
          type="text"
          class="w-full px-3 py-2 bg-gray-700 border border-custom-blue rounded focus:outline-none focus:border-custom-blue-dark"
          placeholder="Enter your username"
      />
    </div>
    <div class="mb-6">
      <label for="userPassword" class="block text-custom-blue-light mb-1">Password</label>
      <input
          id="userPassword"
          v-model="userPassword"
          type="password"
          class="w-full px-3 py-2 bg-gray-700 border border-custom-blue rounded focus:outline-none focus:border-custom-blue-dark"
          placeholder="Enter your password"
      />
    </div>
    <button
        @click="login"
        type="submit"
        class="w-full py-2 px-4 bg-custom-blue bg-custom-blue-dark text-custom-blue-light rounded focus:outline-none focus:bg-custom-blue-dark"
    >
      Log In
    </button>
    </form>
    <p class="mt-4 text-sm text-custom-blue-light text-center">
      New to CyberCanvas?
      <router-link to="/register" class="underline">Access Point</router-link>
    </p>
  </div>
  </div>
</template>

<style scoped>
.bg-custom-blue {
  background-color: #4f46e5;
}

.bg-custom-blue-dark:hover {
  background-color: #372fc8;
}

.text-custom-blue {
  color: #4f46e5;
}

.text-custom-blue-light {
  color: #b7b1f1;
}

.border-custom-blue {
  border-color: #4f46e5;
}

.border-custom-blue-dark {
  border-color: #372fc8;
}
</style>


<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from 'vue-router'
const router = useRouter()

const userName = ref('');
const userPassword = ref('');

const login = async () => {
    console.log(userName.value, userPassword.value);
    let response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        userName: userName.value,
        userPassword: userPassword.value,
      }),
      credentials: 'include',
    });
    // Handle the response from the server
    const responseData = await response.json();
  console.log(responseData)
    if (responseData.success){
      await router.push({path: '/'});
    } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }}
</script>