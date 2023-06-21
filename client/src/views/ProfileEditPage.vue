<template>
  <div class="edit-user-page">
    <div class="edit-user-card">
      <h2 class="edit-user-title">Edit Profile</h2>
      <form @submit.prevent="handleSubmit" class="edit-user-form">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input v-model="userName" type="text" id="username" class="form-input" placeholder="Enter your new username" />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <textarea v-model="userEmail" id="email" class="form-input" placeholder="Enter your new email"></textarea>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <textarea v-model="userPassword" id="password" class="form-input" placeholder="Enter your new password" type="password"></textarea>
        </div>
        <div class="form-group">
          <label for="bio" class="form-label">Bio</label>
          <textarea v-model="userBio" id="bio" class="form-input" placeholder="Tell us about yourself"></textarea>
        </div>
        <button class="form-button" type= "submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.edit-user-page {
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.edit-user-card {
  background-color: #141414;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}

.edit-user-title {
  color: #03c6fc;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.edit-user-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  color: #03c6fc;
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
  height: 120px;
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
import {ref} from "vue";

const route = useRoute()
const router = useRouter()
const userID = route.params.id;
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

