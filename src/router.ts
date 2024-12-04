import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomePage.vue";
import About from "./views/AboutPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: (route) => ({
        // notes: route.meta.notes,
      }),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => About,
    },
  ],
});

export default router;
