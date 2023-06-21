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
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
