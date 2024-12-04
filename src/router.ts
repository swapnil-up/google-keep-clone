import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomePage.vue";
import About from "./views/AboutPage.vue";
import Archive from "./views/ArchivePage.vue";
import Reminder from "./views/RemindersPage.vue";
import Bin from "./views/BinPage.vue";
import NotFound from "./views/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
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

export default router;
