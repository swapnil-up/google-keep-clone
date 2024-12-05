<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let timeoutId;

const store = useStore();
const router = useRouter();

const login = () => {
  store.commit("login");
  router.push({ name: "home" });
};

const logout = () => {
  store.commit("logout");
  router.push({ name: "login" });
};

function resetTime() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(logout, 1000 * 120);
}

function initializeTimeout() {
  document.addEventListener("scroll", resetTime);

  resetTime();
}

initializeTimeout();
</script>

<template>
  <h2>First you must login.</h2>
  <button @click="login">login</button>
</template>

<style scoped>
button {
  border: 1px solid gray;
}
</style>
