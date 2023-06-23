<template>
  <div v-if="userData">
    <div class="user-page">
      <div class="user-card">
        <div class="user-avatar"></div>
        <h2 class="user-name orbitron">{{ userData.userName }}</h2>
        <p class="user-bio tenor">{{ userData.userBio }}</p>
        <div class="user-stats tenor">
          <div class="stat">
            <span class="stat-label">Followers</span>
            <span class="stat-value">10.5K</span>
          </div>
          <div class="stat tenor">
            <span class="stat-label">Posts</span>
            <span class="stat-value">256</span>
          </div>
          <div class="stat tenor">
            <span class="stat-label">Likes</span>
            <span class="stat-value">2.3K</span>
          </div>
        </div>
        <div class="user-buttons">
          <router-link :to="`/user/${userData.userID}/edit`" class="edit-button text-white px-4 py-2 rounded-md mr-2">Edit Profile</router-link>
          <button class="delete-button text-white px-4 py-2 rounded-md" @click="deleteUser">Delete Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.edit-button {
  background-color: #4453aa;
  box-shadow: 0 0 10px #4453aa;
  text-shadow: 0 0 5px #4453aa;
}

.delete-button {
  background-color: #ac2e2e;
  box-shadow: 0 0 10px #ac2e2e;
  text-shadow: 0 0 5px #ac2e2e;
}

.user-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.user-card {
  background: linear-gradient(#111a2d, #1e293b);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url("../../src/assets/avatar.jpg");
  background-size: cover;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}

.user-name {
  color: #6278f6;
  font-size: 2rem;
  margin-top: 1.5rem;
}

.user-bio {
  color: #ccc;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.user-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  color: #5bd2ee;
}

.stat {
  display: flex;
  flex-direction: column;
  color: #5bd2ee;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: bold;
}

.stat-value {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}
</style>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
const userName = ref();
const userEmail = ref();
const userBio = ref();

onMounted(async () => {
  await getUser();
})
const route = useRoute()
const router = useRouter()
const userID = route.params.id;
const userData = ref()

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

const deleteUser = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });
    const responseData = await response.json();
    console.log(responseData)
    if (responseData.success) {
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