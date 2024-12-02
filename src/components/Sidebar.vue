<script setup>
import { ref } from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import labels from "vue-material-design-icons/LabelOutline.vue";
import reminders from "vue-material-design-icons/BellOutline.vue";
import notes from "vue-material-design-icons/LightbulbOutline.vue";
import editLabel from "vue-material-design-icons/PencilOutline.vue";
import archive from "vue-material-design-icons/ArchiveArrowDownOutline.vue";
import bin from "vue-material-design-icons/TrashCanOutline.vue";

var isToggled = ref(false);

function toggleMenu() {
  isToggled.value = !isToggled.value;
  console.log(isToggled.value);
}
</script>

<template>
  <div
    :class="{ 'sidebar-expanded': isToggled, 'sidebar-collapsed': !isToggled }"
    class="sidebar"
  >
    <button class="menu-button" @click="toggleMenu">
      <MenuIcon class="menu-icon" />
    </button>
    <div v-if="isToggled" class="sidebar-items-container">
      <ul class="sidebar-items">
        <li class="sidebar-item"><notes /> Notes</li>
        <li class="sidebar-item"><reminders /> Reminders</li>
        <li class="sidebar-item"><labels /> Labels</li>
        <li class="sidebar-item"><editLabel /> Edit Labels</li>
        <li class="sidebar-item"><archive /> Archive</li>
        <li class="sidebar-item"><bin /> Bin</li>
      </ul>
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

.sidebar-items-container {
  padding: 16px;
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
  background-color: #3a3a3a;
}
</style>
