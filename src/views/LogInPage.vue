<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import jokePuller from "@/components/jokePuller.vue";
import crud from "@/components/crud.vue";

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
  <crud />
  <jokePuller />
</template>

<style scoped>
button {
  border: 1px solid gray;
  margin: 5px;
  max-width: 500px;
}
</style>
