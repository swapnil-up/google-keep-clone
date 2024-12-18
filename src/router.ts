import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomePage.vue";
import About from "./views/AboutPage.vue";
import Archive from "./views/ArchivePage.vue";
import Reminder from "./views/RemindersPage.vue";
import Login from "./views/LogInPage.vue";
import NotFound from "./views/NotFoundPage.vue";
import store from "./stores";
import RegisterPage from "./views/RegisterPage.vue";
import apiClient from "./api/axios.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/archive",
      name: "archive",
      component: Archive,
    },
    {
      path: "/reminder",
      name: "reminder",
      component: Reminder,
    },
    {
      path: "/bin",
      redirect: "/",
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("api_token");
  if (token) {
    try {
      const response = await apiClient.get(`/user`);
      localStorage.setItem("set-user", response.data);
      store.commit("login");
      next();
    } catch (error) {
      console.log(error);
      localStorage.removeItem("api_token");
      next({ name: "login" });
    }
  }
  if (to.name != "login" && to.name !== "register" && !store.state.isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
