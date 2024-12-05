<script setup>
import { ref, watch, defineEmits } from "vue";
import searchbar from "./searchbar.vue";
import user from "vue-material-design-icons/AccountCircle.vue";
import grid from "vue-material-design-icons/DotsGrid.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const props = defineProps({
  notes: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["update:filteredNotes"]);

function updateFilteredNotes(newNotes) {
  emit("update:filteredNotes", newNotes);
}

const logout = () => {
  store.commit("logout");
  router.push({ name: "login" });
};
</script>

<template>
  <div class="navbar">
    <router-link to="/">
      <div class="left-side">
        <img
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
        />

        <div class="title">Keep</div>
      </div>
    </router-link>
    <searchbar
      class="searchbar-area"
      style="flex-grow: 4"
      :items="notes"
      filterKey="title"
      @update:filtered="updateFilteredNotes"
    />
    <div class="right-side">
      <div><grid /></div>
      <div class="userIcon"><user @click="logout" /></div>
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
  margin-right: 10px;
  overflow: hidden;
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
.searchbar-area {
  padding: 5px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-left: 3%;
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
  .navbar {
    display: flex;
    justify-content: start;
    gap: 10px;
  }
  .title {
    display: none;
  }
  .right-side {
    display: none;
  }
  .left-side {
    min-width: 40px;
  }
  .searchbar-area {
    flex-grow: 1;
    flex-shrink: 2;
  }
}

@media (max-width: 450px) {
  .left-side {
    margin: 0px;
  }
  .searchbar-area {
    margin: 0px;
  }
}

.userIcon:hover {
  cursor: grab;
}
</style>
