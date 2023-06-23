<template>
  <!-- Login Page -->
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-6 register-block rounded-lg shadow-lg">
      <h1 class="text-3xl text-center welcome-text py-8">Greetings, netizen!</h1>
      <!-- Login Form -->
      <form class="tenor" @submit.prevent="submitForm">
        <!-- Username Input -->
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
        <!-- Password Input -->
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
        <!-- Login Button -->
        <button
            @click="login"
            type="submit"
            class="w-full glass hover-purple text-white font-semibold px-4 py-2 rounded-md"
        >
          Log In
        </button>
      </form>
      <!-- Registration Prompt -->
      <p class="mt-4 text-sm text-custom-blue-light text-center">
        New to CyberCanvas?
        <router-link to="/register" class="underline">Access Point</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles */
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

.welcome-text {
  font-family: 'Orbitron', sans-serif;
  font-weight: 3000;
  font-size: 2rem;
  color: #6278f6;
}

.register-block {
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
  width: 100vw;
}

.hover-purple:hover {
  background-color: #4453aa;
}

.glass {
  background-color: #262e5e;
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

// Define reactive variables
const userName = ref('');
const userPassword = ref('');

// Login function
const login = async () => {
  console.log(userName.value, userPassword.value);

  // Send login request to the server
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
  console.log(responseData);

  // Redirect to home page if login is successful
  if (responseData.success) {
    await router.push({ path: '/' });
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }
}
</script>
