<script setup>
import { ref } from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";

function toggleMenu() {
  console.log("toggled");
}
</script>

<template>
  <div class="relative">
    <div class="top-nav">
      <div class="buttons-top-nav">
        <button class="menu-button" @click="toggleMenu">
          <MenuIcon />
        </button>
        <div>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          />
        </div>
        <div class="title">Keep</div>
        <input type="text" class="search-bar" placeholder="Search" />
      </div>
    </div>
  </div>
</template>

<style>
.relative {
  position: relative;
}
.top-nav {
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-color: black;
}
.buttons-top-nav {
  display: flex;
  align-items: center;
}
.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}
.menu-icon {
  size: "26";
}

.search-bar {
  padding: 5px;
  width: 250px; /* Increased width */
  height: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-left: 10px; /* Added margin for spacing */
}
</style>
