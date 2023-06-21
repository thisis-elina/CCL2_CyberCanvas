<template>
  <div v-if="userData">
    <div class="user-page">
      <div class="user-card">
        <div class="user-avatar"></div>
        <h2 class="user-name">{{ userData.userName }}</h2>
        <p class="user-bio">{{ userData.userBio }}</p>
        <div class="user-stats">
          <div class="stat">
            <span class="stat-label">Followers</span>
            <span class="stat-value">10.5K</span>
          </div>
          <div class="stat">
            <span class="stat-label">Posts</span>
            <span class="stat-value">256</span>
          </div>
          <div class="stat">
            <span class="stat-label">Likes</span>
            <span class="stat-value">2.3K</span>
          </div>
        </div>
        <div class="user-buttons">
          <router-link :to="`/user/${userData.userID}/edit`" class="edit-button">Edit Profile</router-link>
          <button class="delete-button" @click="deleteUser">Delete Profile</button>
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

.edit-button,
.delete-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.edit-button {
  background-color: #03c6fc;
  color: #fff;
}

.delete-button {
  background-color: #fc036e;
  color: #fff;
}

.user-page {
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.user-card {
  background-color: #141414;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #3a3a3a;
  margin: 0 auto;
}

.user-name {
  color: #03c6fc;
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
}

.stat {
  display: flex;
  flex-direction: column;
  color: #03c6fc;
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