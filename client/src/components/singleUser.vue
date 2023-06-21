<template>
  <div class="single-user bg-gray-900 min-h-screen py-8">
    <div class="user-container max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 class="user-name text-3xl font-bold text-green-400 mb-2">{{ user.name }}</h2>
      <p class="user-email text-lg text-gray-400 mb-4">{{ user.email }}</p>

      <div class="user-bio">
        <h3 class="user-bio-heading text-xl font-bold text-purple-400 mb-4">Biography</h3>
        <p class="user-bio-text text-gray-300">{{ user.bio }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);

onMounted(async () => {
  await fetchUser();
});

const fetchUser = async () => {
  // Fetch the user data from your API
  // Replace the following lines with your own logic
  const userId = router.currentRoute.value.params.userId;
  const response = await fetch(`http://localhost:3000/api/users/${userId}`, { credentials: 'include' });
  const responseData = await response.json();
  if (response.ok) {
    user.value = responseData.user;
  } else {
    console.error(responseData.error);
  }
};
</script>

<style scoped>
.single-user {
  @apply bg-gray-900 min-h-screen py-8;
}

.user-container {
  @apply max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8;
}

.user-name {
  @apply text-3xl font-bold text-green-400 mb-2;
}

.user-email {
  @apply text-lg text-gray-400 mb-4;
}

.user-bio-heading {
  @apply text-xl font-bold text-purple-400 mb-4;
}

.user-bio-text {
  @apply text-gray-300;
}
</style>
