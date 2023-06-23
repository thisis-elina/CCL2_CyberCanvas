<template>
  <nav class="bg-custom-blue shadow-xl sticky front">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="/src/assets/logo.svg" alt="Logo" />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/" class="text-white btn btn-ghost">Home</router-link>
            </div>
          </div>
        </div>
        <div class="justify-center">
          <input type="text" placeholder="Search" readonly
                 class="px-4 py-2 bg-gray-700 border border-custom-gray rounded focus:outline-none focus:border-custom-blue-dark" />
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-1">
              <router-link to="/login" v-if="!loggedInUser"  class="text-white text-m px-4 py-2 rounded-md underline-on-hover underline">Connect</router-link>
              <router-link  v-if="!loggedInUser" class="glass hover-purple text-white font-semibold px-4 py-2 rounded-md" to="/register">Join the Net</router-link>

            <div v-if="loggedInUser" class="relative" @click="toggleDropdown">
              <img class="h-12 w-12 rounded-full cursor-pointer" src="src/assets/placeholderavatar.png" alt="Profile Picture" />
              <div v-show="showDropdown"
                   class="absolute top-full left-0 mt-2 py-2 w-40 bg-custom-blue rounded-md shadow-lg">
                <router-link v-if="loggedInUser" :to="`/user/${loggedInUser.id}`"
                             class="block px-4 py-2 text-white hover:bg-custom-blue-darker">Profile
                </router-link>
                <div @click="logout"
                        class=" fake-button block px-4 py-2 text-white hover:bg-custom-blue-darker">Logout</div>
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
    loggedInUser.value = undefined;
    console.log(responseData.error);
  }}
</script>

<style scoped>
.btn {
  font-size: 14px;
}

.fake-button {
  cursor: pointer;
}
.hover-purple:hover {
  background-color: #4453aa;
}

.glass {
  background-color: #262e5e;
  font-family: 'Tenor Sans', sans-serif;
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

.front {
  z-index: 5;
}
</style>
