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
  <div class="sidebar">
    <button class="menu-button" @click="toggleMenu">
      <div v-if="!isToggled" class="expanded">
        <MenuIcon />
        <ul class="sidebar-items">
          <li>Notes</li>
          <li>Reminders</li>
          <li>Edit Labels</li>
          <li>Archive</li>
          <li>Bin</li>
        </ul>
      </div>
    </button>
  </div>
</template>

<style>
.sidebar {
  height: 100vh;
  width: 150px;
  color: grey;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
}

.sidebar-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-items li {
  margin-bottom: 10px;
}

</style>
