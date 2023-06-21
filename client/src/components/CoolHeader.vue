<template>
  <nav class="bg-custom-blue shadow-xl sticky">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="/" alt="Logo" />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/" class="text-white btn btn-ghost">Home</router-link>
              <router-link to="/" class="text-white btn btn-ghost">About</router-link>
            </div>
          </div>
        </div>
        <div class="justify-center">
          <input type="text" placeholder="Search"
                 class="px-4 py-2 bg-gray-700 border border-custom-gray rounded focus:outline-none focus:border-custom-blue-dark" />
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-1">

            <button v-if="!loggedInUser"  class="text-white text-m px-4 py-2 rounded-md underline-on-hover">
              <router-link to="/login" class="underline">Connect</router-link>
            </button>
            <button v-if="!loggedInUser"
                    class="glass bg-custom-blue-dark bg-custom-blue-darker text-white font-semibold px-4 py-2 rounded-md">
              <router-link to="/register">Join the Net</router-link>
            </button>

            <div v-if="loggedInUser" class="relative" @click="toggleDropdown">
              <img class="h-8 w-8 rounded-full cursor-pointer" src="/" alt="Profile Picture" />
              <div v-show="showDropdown"
                   class="absolute top-full left-0 mt-2 py-2 w-40 bg-custom-blue rounded-md shadow-lg">
                <router-link to="/"
                             class="block px-4 py-2 text-white hover:bg-custom-blue-darker">Profile
                </router-link>
                <router-link to="/"
                             class="block px-4 py-2 text-white hover:bg-custom-blue-darker">Settings
                </router-link>
                <button @click="logout"
                        class="block px-4 py-2 text-white hover:bg-custom-blue-darker">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>

import {onMounted, ref, watch,} from "vue";
import { createRouter as router, useRoute, useRouter } from "vue-router";
const route = useRoute()
const showDropdown = ref(false);
const loggedInUser = ref()


onMounted(async () => {
  await login();
  console.log('user')
  console.log(loggedInUser.value)
})

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

async function logout() {
  let response = await fetch('http://localhost:3000/api/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  } );
  // Handle the response from the server
  const responseData = await response.json();
  if (responseData.success) {
    loggedInUser.value = undefined
    console.log(loggedInUser.value)
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }
}

watch(route, () => {
  // This will run every time the route changes.
  login();
}, { deep: true }) // Use the deep option to watch nested properties

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
.btn {
  font-size: 14px;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

.bg-custom-blue {
  background-color: #111827;
}

/* Add the following CSS to create a more visible drop shadow */
.shadow-xl {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5), 0 4px 10px -5px rgba(0, 0, 0, 0.3);
}

.hover\:bg-custom-blue-darker:hover {
  background-color: #372fc8;
}

.border-custom-gray {
  border-color: #87878c;
}

[v-show] {
  display: none;
}

.btn {
  font-size: 14px;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

.bg-custom-blue {
  background-color: #111827;
}

.shadow-xl {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5), 0 4px 10px -5px rgba(0, 0, 0, 0.3);
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

.border-custom-gray {
  border-color: #87878c;
}
</style>
