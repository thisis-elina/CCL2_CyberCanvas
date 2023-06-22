<template>
  <div v-if="post" class=" min-h-screen py-8">
    <div class="post-container max-w-xl mx-auto rounded-lg shadow-lg p-8">

      <div class="post-card rounded-lg shadow-lg p-6">
      <div class="py-4">
        <p class="post-user text-sm text-purple-300 mb-1">Posted by : {{ post.userName }}</p>
        <p class="post-timestamp text-sm text-blue-400">Posted at: {{ formatTimestamp(post.time) }}</p>
      </div>
        <h2 class="post-title text-3xl py-3 font-bold text-green-400 mb-4">{{ post.title }}</h2>
        <p class="post-description text-center text-lg text-gray-400 mb-4">{{ post.description }}</p>
      </div>

      <NewReply :postID="postID" class="py-7"></NewReply>

      <div v-if="comments" class="replies">
        <h3 class="comment-heading orbitron text-xl font-bold mb-4">Replies</h3>
        <div v-if="comments.length === 0" class="text-gray-400">No replies yet.</div>
        <div v-else class="comment-list">
          <div v-for="reply in comments" :key="reply.id" class="comment post-card p-4 rounded-lg mb-4">
            <p class="comment-author text-lg font-bold">Comment by: {{ reply.userName }}</p>
            <p class="comment-text py-6 text-gray-300">{{ reply.comment }}</p>
            <p class="post-timestamp text-gray-400 text-sm">Replied at: {{ formatTimestamp(reply.time) }}</p>
            <div v-if="reply && loggedInUser" class="comment-actions flex justify-end mt-2">
              <button v-if="parseInt(reply.userID) === parseInt(loggedInUser.id)" class="btn btn-edit"
                      @click="editReply(reply.id)">Edit
              </button>
              <button v-if="parseInt(reply.userID) === parseInt(loggedInUser.id)" class="btn btn-delete"
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
import {defineProps, ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import NewReply from "./NewReply.vue";

const loggedInUser = ref()
const router = useRouter();
const post = ref();
const comments = ref([]);
const props = defineProps(["postID"]);
const reply = ref([]);
const postData = ref()
const replyData = ref()
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};


onMounted(async () => {
  console.log(props.postID)
  await login();
  await fetchPost();
  await fetchReplies();
  console.log("HERE")
  console.log(replyData.value, loggedInUser.value)
});

const fetchPost = async () => {
  console.log("some shi", props.postID)
  const response = await fetch(`http://localhost:3000/api/posts/${props.postID}`, {credentials: 'include'});
  const responseData = await response.json();
  if (responseData.success) {
    post.value = responseData.data;
    console.log(post.value)
  } else {
    console.error(responseData.error);
  }
};

const fetchReplies = async () => {
  // Fetch the comments data
  const response = await fetch(`http://localhost:3000/api/posts/${props.postID}/comments`, {credentials: 'include'});
  const responseData = await response.json();
  if (responseData.success) {
    comments.value = responseData.data
    replyData.value = responseData.data;
    console.log(comments.value)
  } else {
    console.error(responseData.error);
  }
};

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
    loggedInUser.value = responseData.data
    console.log(loggedInUser.value)
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }
}

const editReply = (replyID) => {
  console.log("edit reply pressed")
  console.log(replyID)
  console.log("edit reply pressed")
  router.push(`/reply/${replyID}/edit`)
}

const deleteReply = async (replyID) => {
  console.log("delete reply pressed")
  console.log(replyID)
  const response = await fetch(`http://localhost:3000/api/replies/${replyID}`, {
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
    console.log(props.postID);
    await router.go();
  } else {
    // Handle any errors that occur during the request
    console.log(responseData.error);
  }

};

</script>

<style scoped>


.post-container {
  @apply max-w-xl mx-auto rounded-lg shadow-lg p-8;
}

.post-title {
  @apply font-bold;
  font-family: 'Orbitron', sans-serif;
  font-weight: 2000;
  font-size: 2rem;
  color: #6278f6
}

.post-description {
  @apply text-gray-300;
  font-family: 'Tenor Sans', sans-serif;
}
.post-user {
  font-family: 'Tenor Sans', sans-serif;
  color: #5bd2ee
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
  color: #5bd2ee
}

.comment-text {
  @apply text-gray-300;
}
.post-card {
  @apply flex flex-col;
  background: linear-gradient(#111a2d, #1e293b);
  color: white;
}
</style>
