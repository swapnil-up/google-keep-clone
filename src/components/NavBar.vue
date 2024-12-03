<script setup>
import { ref } from "vue";
import searchbar from "./searchbar.vue";
import user from "vue-material-design-icons/AccountCircle.vue";
import grid from "vue-material-design-icons/DotsGrid.vue";

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
    <searchbar style="flex-grow: 4" :items="notes" filterKey="title" />
    <div class="right-side">
      <div><grid /></div>
      <div><user /></div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.left-side {
  align-items: center;
  display: flex;
  flex-direction: row;
  min-width: 120px;
  gap: 10px;
}
.title {
  font-family: "Product Sans";
  color: #5f6368;
  font-size: large;
  white-space: nowrap;
  overflow: hidden;
}
.img {
  height: 40px;
}
.search-bar {
  padding: 5px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-left: 3%;
  max-width: 60%;
  overflow: hidden;
}
.right-side {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-width: 100px;
  flex-shrink: 1;
  overflow: hidden;
  color: gray;
}

@media (max-width: 600px) {
  .title,
  .right-side {
    display: none;
  }
  .navbar {
    justify-content: flex-start;
  }
  .left-side {
    min-width: 40px;
  }
}
</style>
