<script setup>
import { ref, onMounted } from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import reminders from "vue-material-design-icons/BellOutline.vue";
import notesIcon from "vue-material-design-icons/LightbulbOutline.vue";
import editLabel from "vue-material-design-icons/PencilOutline.vue";
import archive from "vue-material-design-icons/ArchiveArrowDownOutline.vue";
import bin from "vue-material-design-icons/TrashCanOutline.vue";
import about from "vue-material-design-icons/InformationOutline.vue";
import tagList from "./tagList.vue";
import { useSidebar } from "@/composables/useSidebar.js";

const props = defineProps({
  notes: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const { isToggled } = useSidebar();
const handleKeyup = (event) => {
  if (event.key === "Escape") {
    isToggled.value = false;
  }
};

onMounted(() => {
  document.addEventListener("keyup", handleKeyup);
});
</script>

<template>
  <div
    :class="[
      'h-screen bg-white text-gray-500 top-0 left-0 transition-all duration-300',
      isToggled ? 'w-52' : 'w-16',
    ]"
    @keyup.esc="isToggled = false"
  >
    <div v-if="isToggled" class="p-4 max-w-48">
      <ul>
        <li class="sidebar-item">
          <notesIcon /> <router-link to="/">Notes</router-link>
        </li>
        <li class="sidebar-item">
          <reminders /> <router-link to="/reminder">Reminders</router-link>
        </li>
        <li class="sidebar-item"><editLabel /> Edit Labels</li>
        <li class="sidebar-item">
          <archive /> <router-link to="/archive">Archives</router-link>
        </li>
        <li class="sidebar-item">
          <bin /><router-link to="/bin">Bin</router-link>
        </li>
        <li class="sidebar-item">
          <about /> <router-link to="/about">About</router-link>
        </li>
      </ul>
      <div class="mt-8 list-none text-gray-500 text-lg">
        <tagList :notes="notes" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-item {
  @apply mt-2 p-2 rounded cursor-pointer transition-all delay-300 flex content-around hover:bg-gray-300;
}
</style>
