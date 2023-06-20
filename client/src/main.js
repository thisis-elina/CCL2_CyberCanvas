import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "daisyui/dist/full.css"

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import RegisterPage from "./views/RegisterPage.vue";
import NewPostPage from "./views/NewPostPage.vue";


const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage,
    },
    {
        path: "/new-post",
        name: "new-post",
        component: NewPostPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
