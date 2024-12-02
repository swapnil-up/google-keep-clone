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
    <div class="left-side">
      <img
        src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
      />
      <div class="title">Keep</div>
    </div>
    <div>
      <searchbar :items="notes" filterKey="title" />
    </div>
    <div class="right-side">
      <img src="https://accounts.google.com/SignOutOptions?hl=en&continue" />
    </div>
  </div>
</template>

<style>
.navbar {
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}
.left-side {
  align-items: center;
  display: flex;
  flex-direction: row;
}
.title {
  font-size: large;
}
.search-bar {
  padding: 5px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-left: 10px;
}
</style>
