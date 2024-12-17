<script setup>
import { ref } from "vue";
import apiClient from "../api/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const name = ref("");

const registerUser = async () => {
  try {
    const response = await apiClient.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    console.log(response.data.message);
    if (response.data.message === "Registration successful") {
      router.push({ name: "login" });
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};
</script>

<template>
  <h2>Register here</h2>
  <form @submit.prevent="registerUser" class="flex flex-col">
    <div>
      <label for="name">name</label>
      <input placeholder="enter name" v-model="name" required />
    </div>
    <div>
      <label for="email">email</label>
      <input placeholder="enter email" v-model="email" required />
    </div>
    <div>
      <label for="password">password</label>
      <input placeholder="enter password" v-model="password" required />
    </div>
    <button type="submit">Register</button>
  </form>
  <router-link to="`/login`">Already registered? Login here</router-link>
</template>
