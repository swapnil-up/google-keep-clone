<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import jokePuller from "@/components/jokePuller.vue";

const store = useStore();
const router = useRouter();

const login = () => {
  store.commit("login");
  router.push({ name: "home" });
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
</template>
