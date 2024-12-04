<script setup>
import { ref, onMounted } from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import labels from "vue-material-design-icons/LabelOutline.vue";
import reminders from "vue-material-design-icons/BellOutline.vue";
import notesIcon from "vue-material-design-icons/LightbulbOutline.vue";
import editLabel from "vue-material-design-icons/PencilOutline.vue";
import archive from "vue-material-design-icons/ArchiveArrowDownOutline.vue";
import bin from "vue-material-design-icons/TrashCanOutline.vue";
import about from "vue-material-design-icons/InformationOutline.vue";
import tagList from "./tagList.vue";

const props = defineProps({
  notes: {
    type: Array,
    required: true,
    default: () => [],
  },
});

var isToggled = ref(false);

function toggleMenu() {
  isToggled.value = !isToggled.value;
}

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
    :class="{ 'sidebar-expanded': isToggled, 'sidebar-collapsed': !isToggled }"
    class="sidebar"
    @keyup.esc="isToggled = false"
  >
    <button class="menu-button" @click="toggleMenu">
      <MenuIcon class="menu-icon" />
    </button>
    <div v-if="isToggled" class="sidebar-items-container">
      <ul class="sidebar-items">
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
      <div class="tag-lists"><tagList :notes="notes" /></div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 60px;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  color: white;
  transition: width 0.2s ease-in-out;
  left: 0;
  top: 0;
}

.sidebar-expanded {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 1%;
  margin-left: 1%;
}

.sidebar-collapsed {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
}

.menu-button {
  background: none;
  border: none;
  color: rgb(0, 0, 0);
  padding: 16px;
  cursor: pointer;
}

.menu-icon {
  fill: black;
  width: 24px;
  height: 24px;
  left: 0;
  align-items: center;
}

.tag-lists {
  list-style-type: none;
  font-size: larger;
}
.sidebar-items-container {
  padding: 16px;
  color: black;
  overflow: scroll;
  max-width: 200px;
}

.sidebar-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  margin: 8px 0;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: black;
  display: flex;
  align-content: space-around;
}

.sidebar-item:hover {
  background-color: #adadad;
}
</style>
