<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import jokePuller from "@/components/jokePuller.vue";
import apiClient from "../api/axios";

const store = useStore();
const router = useRouter();

const login = () => {
  store.commit("login");
  router.push({ name: "home" });
};

const email = ref("");
const password = ref("");
const loginApi = async () => {
  try {
    const response = await apiClient.post("/login", {
      email: email.value,
      password: password.value,
    });
    if (response.data.message === "Login successful") {
      store.commit("login");
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};
</script>

<template>
  <h2>First you must login.</h2>
  <button
    class="border border-gray-500 m-1 max-w-xl hover:bg-gray-300 hover:text-black-200 hover:shadow-sm transition duration-400"
    @click="login"
  >
    login
  </button>
  <jokePuller />
  <div>
    <form @submit.prevent="loginApi" class="flex flex-col">
      <label for="email">email</label>
      <input placeholder="enter email" v-model="email" required />
      <label for="password">password</label>
      <input placeholder="enter password" v-model="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
  <router-link to="/register"><p>Haven't registered yet?</p></router-link>
</template>
