import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import CarDetailsView from "./views/CarDetailsView.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const routes = [
  { path: "/", component: HomeView },
  { path: "/car/:id", component: CarDetailsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
