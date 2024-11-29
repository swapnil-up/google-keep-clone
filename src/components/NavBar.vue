<script setup>
import { ref } from "vue";
import searchbar from "./searchbar.vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";

const props = defineProps({
  notes: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="navbar">
    <div class="top-items-nav">
      <div class="buttons-top-nav">
        <div>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          />
        </div>
        <div class="title">Keep</div>
        <searchbar :notes="notes"/>
      </div>
    </div>
  </div>
</template>

<style>
/* .navbar {
  display: flex;
  flex-direction: row;
} */
.top-items-nav {
  width: 100%;
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
  width: 250px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-left: 10px;
}
</style>
