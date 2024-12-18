<script setup>
import { ref, watch, defineEmits } from "vue";
import searchbar from "./searchbar.vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import user from "vue-material-design-icons/AccountCircle.vue";
import grid from "vue-material-design-icons/DotsGrid.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useSidebar } from "@/composables/useSidebar.js";
import apiClient from "../api/axios.js";

const store = useStore();
const router = useRouter();

const props = defineProps({
  notes: {
    type: Array,
    required: true,
  },
});

const { toggleMenu } = useSidebar();

const emit = defineEmits(["update:filteredNotes"]);

function updateFilteredNotes(newNotes) {
  emit("update:filteredNotes", newNotes);
}

const logout = async () => {
  const token = localStorage.getItem("api_token");
  if (token) {
    try {
      const response = await apiClient.post("/logout");
      console.log("Logout sent:", localStorage.getItem("api_token"));
      if (response.data.message === "Logout successful") {
        localStorage.removeItem("api_token");
        store.commit("logout");
        router.push({ name: "login" });
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  }
};
</script>

<template>
  <div class="flex justify-start items-baseline sm:block h-16">
    <div
      class="py-2 sm:p-4 flex justify-between sm:gap-3 overflow-hidden whitespace-nowrap"
    >
      <button
        class="bg-none mx-3 text-gray-400 cursor-pointer"
        @click="toggleMenu"
      >
        <MenuIcon />
      </button>
      <router-link to="/" class="mr-2">
        <div class="flex items-center sm:min-w-28 sm:gap-2 sm:mr-2">
          <img
            class="w-[40px]"
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          />

          <div class="hidden font-serif text-gray-700 text-lg sm:block">
            Keep
          </div>
        </div>
      </router-link>
      <searchbar
        class="p-1 h-full border rounded text-sm ml-[3%]"
        :items="notes"
        filterKey="title"
        @update:filtered="updateFilteredNotes"
      />
      <div
        class="hidden items-center justify-around shrink text-gray-500 gap-2 sm:flex"
      >
        <div><grid /></div>
        <div
          class="cursor-pointer hover:bg-gray-500 hover:text-gray-50 hover:rounded-full"
        >
          <user @click="logout" />
        </div>
      </div>
    </div>
  </div>
</template>
