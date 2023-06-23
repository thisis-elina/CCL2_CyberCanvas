<template>
  <div class="edit-user-page">
    <div class="edit-user-card">
      <h2 class="edit-user-title orbitron py-5 ">Edit Profile</h2>
      <form @submit.prevent="handleSubmit" class="edit-user-form">
        <div class="form-group flex items-center justify-between tenor">
          <label for="username" class="form-label">Name</label>
          <input v-model="userName" type="text" id="username" class="form-input" placeholder="Enter your new name" />
        </div>
        <div class="form-group flex items-center justify-between tenor">
          <label for="email" class="form-label">Email</label>
          <textarea v-model="userEmail" id="email" class="form-input" placeholder="Enter your new email"></textarea>
        </div>
        <div class="form-group flex items-center justify-between tenor">
          <label for="password" class="form-label">Password</label>
          <textarea v-model="userPassword" id="password" class="form-input" placeholder="Enter your new password" type="password"></textarea>
        </div>
        <div class="form-group flex items-center justify-between tenor">
          <label for="bio" class="form-label">Bio</label>
          <textarea v-model="userBio" id="bio" class="form-input" placeholder="Tell us about yourself"></textarea>
        </div>
        <button class="glass hover-purple text-white font-semibold px-4 py-2 rounded-md" type= "submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

.hover-purple:hover {
  background-color: #4453aa;
}

.edit-user-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.edit-user-card {
  @apply flex flex-col;
  background: linear-gradient(#111a2d, #1e293b);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  width: 400px
}

.edit-user-title {
  color: #6278f6;
  font-size: 2rem;
  margin-top: 1.5rem;
}

.edit-user-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  color: #6278f6;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.form-input {
  background-color: #3a3a3a;
  border: none;
  border-radius: 4px;
  color: #ccc;
  padding: 0.75rem;
}

textarea.form-input {
  height: 60px;
  width: 240px
}

input {
  width: 240px
}

.form-button {
  background-color: #03c6fc;
  border: none;
  border-radius: 4px;
  color: #000;
  font-weight: bold;
  padding: 0.75rem 1rem;
  cursor: pointer;
}

.form-button:hover {
  background-color: #02a6d6;
}

.form-button:active {
  background-color: #0393b3;
}
</style>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

onMounted(async () => {
  await getUser();
})

const route = useRoute()
const router = useRouter()
const userID = route.params.id;
const userData = ref()
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const userBio = ref('')
const handleSubmit = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        userName: userName.value,
        userEmail: userEmail.value,
        userPassword: userPassword.value,
        userBio: userBio.value,
      }),
      credentials: 'include',
    });
    const responseData = await response.json();
    console.log(responseData)
    if (responseData.success){
      await router.push({path: `/user/${userID}`});
    } else {
      // Handle any errors that occur during the request
      console.log(responseData.error);
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
  }
};


async function getUser() {
  let response = await fetch(`http://localhost:3000/api/users/${userID}`, {
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
    userData.value = responseData.data
    console.log(userData.value)
    userName.value = userData.value.userName;
    userEmail.value = userData.value.userEmail;
    userBio.value = userData.value.userBio;
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }
}
</script>

