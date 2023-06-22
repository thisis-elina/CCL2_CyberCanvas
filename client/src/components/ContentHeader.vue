<template>
  <nav class="bg-custom-blue">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="hidden md:block">
            <div class="flex items-baseline space-x-4">
              <div class="py-1 tenor left-buttons">
                <button class="button">Popular</button>
                <button class="button">Newest</button>
                <button class="button">Following</button>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="py-2 ml-4 flex items-center md:ml-6 space-x-1">
            <button v-if="loggedInUser"
                class="glass hover-purple text-white font-semibold px-4 py-2 rounded-md">
              <router-link to="/new-post">Create a Canvas</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="flex items-center justify-center">
    <div class="divider"></div>
  </div>
</template>

<style scoped>
.glass {
  font-family: 'Tenor Sans', sans-serif;
}
.button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none;
  transition: all 0.3s;
}

.button.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.create-button {
  background-color: #8f83f3;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.divider {
  height: 1px;
  width: calc(95%);
  margin: 10px;
  background-color: white;
}

.hover-purple:hover {
  background-color: #262e5e;
}

</style>


<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()
const showDropdown = ref(false);
const loggedInUser = ref()

onMounted(async () => {
  await login();
})

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