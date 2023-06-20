<script setup>
import {onBeforeUpdate, onMounted, ref,} from "vue";
const loggedInUser = ref()
import CoolBannerImage from "./components/CoolBannerImage.vue";
import HeaderLoggedOut from "./components/HeaderLoggedOut.vue";
import HeaderLoggedIn from "./components/HeaderLoggedIn.vue";
import Footer from "./components/Footer.vue";
import CoolHeader from "./components/CoolHeader.vue";


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
    console.log(responseData.error);
  }}
</script>

<template>
  <CoolHeader></CoolHeader>
  <CoolBannerImage></CoolBannerImage>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped>

</style>
