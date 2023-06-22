<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-6 register-block rounded-lg shadow-xl">
      <h1 class="text-3xl text-center welcome-text">Greetings, new netizen!</h1>
      <form class="text-form" @submit.prevent="submitForm">
        <div class= "mb-4">
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
                class="w-full glass hover-purple text-white font-semibold px-4 py-2 rounded-md"
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

.text-form {
  font-family: 'Tenor Sans', sans-serif;
}
.welcome-text {
  font-family: 'Orbitron', sans-serif;
  font-weight: 3000;
  font-size: 2rem;
  color: #6278f6
}
.register-block {
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
  width: 100vw;
}
.bg-custom-blue {
  background-color: #4f46e5;
}
.hover-purple:hover {
  background-color: #4453aa;
}

.glass {
  background-color: #262e5e
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
