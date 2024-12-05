<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const login = () => {
  store.commit("login");
  router.push({ name: "home" });
};
</script>

<template>
  <h2>First you must login.</h2>
  <button @click="login">login</button>
</template>
