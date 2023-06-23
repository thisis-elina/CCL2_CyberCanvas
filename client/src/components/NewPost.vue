<template>
  <!-- Create Post Page -->
  <div v-if="loggedInUser" class="min-h-screen flex items-center justify-center post-container">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl py-6 text-center text-white font-bold orbitron">Create a New Discussion</h1>
      <div class="post-card rounded-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Title Input -->
          <input v-model="title" name="title" id="title" placeholder="Title" class="w-full px-4 py-2 bg-gray-700 text-white rounded"/>
          <!-- Description Input -->
          <div class="form-group">
            <textarea v-model="description" name="description" id="description" rows="5" placeholder="Enter a description" class="w-full px-4 py-2 bg-gray-700 text-white rounded"></textarea>
          </div>
          <!-- Submit Button -->
          <div class="flex justify-center">
            <button class="glass hover-purple text-white font-semibold px-4 py-2 rounded-md" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const title = ref("");
const description = ref("");
const loggedInUser = ref();

// Fetch logged-in user on page load
onMounted(async () => {
  await login();
});

// Handle form submission
const handleSubmit = async () => {
  try {
    console.log(title.value, description.value);

    // Send post data to the server
    const response = await fetch(`http://localhost:3000/api/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
      }),
      credentials: 'include',
    });

    // Handle the response from the server
    const responseData = await response.json();
    console.log(responseData);

    // Redirect to home page if post creation is successful
    if (responseData.success) {
      await router.push({ path: '/' });
    } else {
      // Handle any errors that occur during the request
      console.log(responseData.error);
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
  }
};

// Fetch logged-in user
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
  if (responseData.success) {
    loggedInUser.value = responseData.data;
    console.log(loggedInUser.value);
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }
}
</script>

<style scoped>
/* Custom styles */
.hover-purple:hover {
  background-color: #262e5e;
}

.post-card {
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
}

.post-container {
  max-width: 24rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3);
}

label {
  color: #cbd5e1;
}

input,
textarea {
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
}

textarea:focus,
input:focus {
  outline: none;
  ring: 0.2rem solid #9f7aea;
}

textarea {
  resize: none;
}
</style>
