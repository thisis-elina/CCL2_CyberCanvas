<template>
  <CoolBannerImage></CoolBannerImage>
  <div class="spacer"></div>
  <PostComments v-if="postID" :postID="postID"></PostComments>
</template>


<script setup>
import CoolBannerImage from "../components/CoolBannerImage.vue";
import PostComments from "../components/PostComments.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
const route = useRoute()

const router = useRouter();
const postID = ref();

onMounted(async () => {
  postID.value=route.params.id
})
</script>