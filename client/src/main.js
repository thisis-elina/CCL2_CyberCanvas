import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "daisyui/dist/full.css"

import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import RegisterPage from "./views/RegisterPage.vue";
import NewPostPage from "./views/NewPostPage.vue";
import PostsPage from "./components/Posts.vue";
import PostCommentsPage from "./views/PostCommentsPage.vue";
import NewReply from "./components/NewReply.vue";
import ProfilePage from "./components/ProfilePage.vue";
import ProfileEditPage from "./views/ProfileEditPage.vue";
import EditPostPage from "./components/EditPostPage.vue";


const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/register",
        component: RegisterPage,
    },
    {
        path: "/new-post",
        component: NewPostPage,
    },
    {
        path: "/new-reply",
        component: NewReply,
    },
    {
        path: "/all-posts",
        component: PostsPage,
    },
    {
        path: '/posts/:id',
        component: PostCommentsPage,
    },
    {
        path: '/user/:id',
        component: ProfilePage,
    },
    {
        path: '/user/:id/edit',
        component: ProfileEditPage,
    },
    {
        path: '/posts/:id/edit',
        component: EditPostPage,
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
