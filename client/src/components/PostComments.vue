<template>
  <!-- Display the post if available -->
  <div v-if="post" class="min-h-screen py-8">
    <div class="post-container max-w-xl mx-auto rounded-lg p-8">

      <div class="post-card rounded-lg shadow-lg p-6">
        <div class="py-4">
          <!-- Display the post's author -->
          <p class="post-user text-sm text-purple-300 mb-1">Posted by: {{ post.userName }}</p>
          <!-- Display the post's timestamp -->
          <p class="post-timestamp text-sm text-blue-400">Posted at: {{ formatTimestamp(post.time) }}</p>
        </div>
        <!-- Display the post's title -->
        <h2 class="post-title text-3xl py-3 font-bold text-green-400 mb-4">{{ post.title }}</h2>
        <!-- Display the post's description -->
        <p class="post-description text-center text-lg text-gray-400 mb-4">{{ post.description }}</p>
      </div>

      <!-- Add a new reply component -->
      <NewReply :postID="postID" class="py-7"></NewReply>

      <div v-if="comments" class="replies">
        <!-- Display the heading for replies -->
        <h3 class="comment-heading orbitron text-xl font-bold mb-4">Replies</h3>
        <div v-if="comments.length === 0" class="text-gray-400">No replies yet.</div>
        <div v-else class="comment-list">
          <!-- Iterate over each reply and display its information -->
          <div v-for="reply in comments" :key="reply.id" class="comment post-card p-4 rounded-lg mb-4">
            <!-- Display the author of the reply -->
            <p class="comment-author text-lg font-bold">Comment by: {{ reply.userName }}</p>
            <!-- Display the content of the reply -->
            <p class="comment-text py-6 text-gray-300">{{ reply.comment }}</p>
            <!-- Display the timestamp of the reply -->
            <p class="post-timestamp text-gray-400 text-sm">Replied at: {{ formatTimestamp(reply.time) }}</p>
            <div v-if="reply && loggedInUser" class="comment-actions flex justify-end mt-2">
              <!-- Display edit button if the logged-in user is the author of the reply -->
              <button v-if="parseInt(reply.userID) === parseInt(loggedInUser.id)" class="edit-button text-white px-4 py-2 rounded-md mr-2"
                      @click="editReply(reply.id)">Edit
              </button>
              <!-- Display delete button if the logged-in user is the author of the reply -->
              <button v-if="parseInt(reply.userID) === parseInt(loggedInUser.id)" class="delete-button text-white px-4 py-2 rounded-md"
                      @click="deleteReply(reply.id)">Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NewReply from "./NewReply.vue";

const loggedInUser = ref();
const router = useRouter();
const post = ref();
const comments = ref([]);
const props = defineProps(["postID"]);
const replyData = ref();

// Format timestamp into a readable date and time
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

// Fetch post data and replies on page load
onMounted(async () => {
  await login();
  await fetchPost();
  await fetchReplies();
});

// Fetch the post data
const fetchPost = async () => {
  const response = await fetch(`http://localhost:3000/api/posts/${props.postID}`, { credentials: 'include' });
  const responseData = await response.json();
  if (responseData.success) {
    post.value = responseData.data;
    console.log(post.value);
  } else {
    console.error(responseData.error);
  }
};

// Fetch the replies for the post
const fetchReplies = async () => {
  const response = await fetch(`http://localhost:3000/api/posts/${props.postID}/comments`, { credentials: 'include' });
  const responseData = await response.json();
  if (responseData.success) {
    comments.value = responseData.data;
    replyData.value = responseData.data;
    console.log(comments.value);
  } else {
    console.error(responseData.error);
  }
};

// Fetch the logged-in user
const login = async () => {
  let response = await fetch('http://localhost:3000/api/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  });

  const responseData = await response.json();
  if (responseData.success) {
    loggedInUser.value = responseData.data;
    console.log(loggedInUser.value);
  } else {
    console.log(responseData.error);
  }
};

// Edit a reply
const editReply = (replyID) => {
  console.log("edit reply pressed");
  console.log(replyID);
  console.log("edit reply pressed");
  router.push(`/reply/${replyID}/edit`);
};

// Delete a reply
const deleteReply = async (replyID) => {
  console.log("delete reply pressed");
  console.log(replyID);
  const response = await fetch(`http://localhost:3000/api/replies/${replyID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
  });
  const responseData = await response.json();
  console.log(responseData);
  if (responseData.success) {
    console.log(props.postID);
    await router.go();
  } else {
    console.log(responseData.error);
  }
};

</script>

<style scoped>
.post-container {
  @apply max-w-xl mx-auto rounded-lg p-8;
}

.post-title {
  @apply font-bold;
  font-family: 'Orbitron', sans-serif;
  font-weight: 2000;
  font-size: 2rem;
  color: #6278f6;
}

.post-description {
  @apply text-gray-300;
  font-family: 'Tenor Sans', sans-serif;
}

.post-user {
  font-family: 'Tenor Sans', sans-serif;
  color: #5bd2ee;
}

.post-timestamp {
  font-family: 'Tenor Sans', sans-serif;
}

.comments {
  @apply mb-8;
}

.comment-heading {
  @apply text-xl font-bold text-white mb-4;
}

.comment-list {
  @apply space-y-4;
}

.comment {
  @apply bg-gray-700 p-4 rounded-lg mb-4;
}

.comment-author {
  @apply text-lg font-bold mb-2;
  font-family: 'Tenor Sans', sans-serif;
  color: #5bd2ee;
}

.comment-text {
  @apply text-gray-300;
}

.post-card {
  @apply flex flex-col;
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
}

.edit-button {
  background-color: #535455;
  box-shadow: 0 0 10px #535455;
  text-shadow: 0 0 5px #535455;
}

.delete-button {
  background-color: #ac2e2e;
  box-shadow: 0 0 10px #ac2e2e;
  text-shadow: 0 0 5px #ac2e2e;
}
</style>