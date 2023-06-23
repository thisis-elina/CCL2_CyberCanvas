<template>
  <!-- Create Reply Component -->
  <div v-if="loggedInUser" class="flex items-center justify-center container mx-auto px-4">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl py-6 text-center text-white font-bold orbitron">Create a Reply</h1>
      <div class="bg-gray-800 rounded-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Comment Input -->
          <div class="form-group">
            <textarea v-model="comment" name="comment" id="comment" rows="5" placeholder="Enter your comment" class="w-full px-4 py-2 bg-gray-700 text-white rounded"></textarea>
          </div>
          <!-- Submit Button -->
          <div class="flex justify-center">
            <button class="glass hover-purple text-white font-semibold px-4 py-2 rounded-md" type="submit">Reply</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps(["postID"]);
const router = useRouter();
const comment = ref();
const loggedInUser = ref();

// Fetch logged-in user on page load
onMounted(async () => {
  await login();
});

// Handle form submission
const handleSubmit = async () => {
  try {
    console.log(comment.value);

    // Send comment data to the server
    const response = await fetch(`http://localhost:3000/api/posts/${props.postID}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        comment: comment.value,
        userID: loggedInUser.value.id,
      }),
      credentials: 'include',
    });

    // Handle the response from the server
    const responseData = await response.json();
    console.log(responseData);

    // Refresh the page if the comment creation is successful
    if (responseData.success) {
      await router.go();
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
};
</script>

<style scoped>
/* Custom styles */
.hover-purple:hover {
  background-color: #262e5e;
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
