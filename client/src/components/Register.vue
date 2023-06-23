<template>
  <!-- Display the registration form -->
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-6 register-block rounded-lg shadow-xl">
      <h1 class="text-3xl text-center welcome-text">Greetings, new netizen!</h1>
      <!-- Registration form -->
      <form class="text-form" @submit.prevent="submitForm">
        <!-- Username field -->
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
        <!-- Email field -->
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
        <!-- Password field -->
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
        <!-- Register button -->
        <button
            @click="register"
            type="submit"
            class="w-full glass hover-purple text-white font-semibold px-4 py-2 rounded-md"
        >
          Join the Net
        </button>
      </form>
      <p class="mt-4 text-sm text-custom-blue-light text-center">
        Already joined the CyberCanvas?
        <!-- Link to login page -->
        <router-link to="/login" class="underline">Connect</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.text-form {
  /* Styling for the registration form */
  font-family: 'Tenor Sans', sans-serif;
}

.welcome-text {
  /* Styling for the welcome text */
  font-family: 'Orbitron', sans-serif;
  font-weight: 3000;
  font-size: 2rem;
  color: #6278f6;
}

.register-block {
  /* Styling for the registration block */
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
  width: 100vw;
}

.hover-purple:hover {
  /* Styling for hover effect on purple elements */
  background-color: #4453aa;
}

.glass {
  /* Styling for the glass effect button */
  background-color: #262e5e;
}

.text-custom-blue {
  /* Styling for custom blue text */
  color: #4f46e5;
}

.text-custom-blue-light {
  /* Styling for light custom blue text */
  color: #b7b1f1;
}

.border-custom-blue {
  /* Styling for custom blue border */
  border-color: #4f46e5;
}
</style>

<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue';

const router = useRouter();
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');

const register = async () => {
  try {
    // Send the registration request to the server
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
    if (responseData.success) {
      // Redirect to the home page on successful registration
      await router.push({ path: '/' });
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
