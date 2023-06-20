<template>
  <div class="min-h-screen bg-gray-800 flex items-center justify-center bg-gray-900">
    <div class="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 class="text-3xl text-center text-custom-blue mb-6">Greetings, new netizen!</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="userName" class="block text-custom-blue-light mb-1">Username</label>
          <input
              id="userName"
              v-model="userName"
              type="text"
              class="w-full px-3 py-2 bg-gray-700 border border-custom-blue rounded focus:outline-none focus:border-custom-blue-dark"
              placeholder="Enter your username"
          />
        </div>
        <div class="mb-4">
          <label for="userEmail" class="block text-custom-blue-light mb-1">Email</label>
          <input
              id="userEmail"
              v-model="userEmail"
              type="text"
              class="w-full px-3 py-2 bg-gray-700 border border-custom-blue rounded focus:outline-none focus:border-custom-blue-dark"
              placeholder="Enter your email"
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
        <button @click="register"
                type="submit"
                class="w-full py-2 px-4 bg-custom-blue bg-custom-blue-dark text-custom-blue-light rounded focus:outline-none focus:bg-custom-blue-dark"
        >
          Join the Net
        </button>
      </form>
      <p class="mt-4 text-sm text-custom-blue-light text-center">
        Already joined the CyberCanvas?
        <router-link to="/login" class="underline">Connect</router-link>
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
import {useRouter} from "vue-router";

const router = useRouter()
import {ref} from 'vue';

const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');

const register = async () => {
  try {
    console.log(userName.value, userEmail.value, userPassword.value);
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        userName: userName.value,
        userEmail: userEmail.value,
        userPassword: userPassword.value,
      }),
      credentials: 'include',
    });

    // Handle the response from the server
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.success){
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
