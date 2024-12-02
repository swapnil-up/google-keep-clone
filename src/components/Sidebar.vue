<script setup>
import { ref } from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";

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
        <li class="sidebar-item">Notes</li>
        <li class="sidebar-item">Reminders</li>
        <li class="sidebar-item">Edit Labels</li>
        <li class="sidebar-item">Archive</li>
        <li class="sidebar-item">Bin</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 80px; 
  height: 100vh;
  background-color: grey;
  color: white;
  transition: width 0.3s ease-in-out;
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar-expanded {
  width: 250px; 
}

.menu-button {
  background: none;
  border: none;
  color: white;
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  fill: white;
  width: 24px;
  height: 24px;
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
}

.sidebar-item:hover {
  background-color: #3a3a3a;
}
</style>
