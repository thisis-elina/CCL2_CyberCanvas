<script setup>
import { onBeforeUpdate, onMounted, ref } from "vue";

// Importing necessary components
import Footer from "./components/Footer.vue";
import CoolHeader from "./components/CoolHeader.vue";

// Declare reactive variables
const loggedInUser = ref();

// This hook is called when the component is mounted to the DOM
onMounted(async () => {
  await login();
});

// Function to perform login
const login = async () => {
  // Send a GET request to the login API endpoint
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
  if (responseData.success) {
    // Update the value of loggedInUser with the data from the response
    loggedInUser.value = responseData.data;
    console.log(loggedInUser.value);
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }
};
</script>

<template>
  <!-- Main layout template -->
  <CoolHeader></CoolHeader>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped>
/* Scoped CSS styles specific to this component */
</style>
