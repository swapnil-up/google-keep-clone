<script setup>
import { computed, ref, watch } from "vue";
import NoteCard from "./NoteCard.vue";
import search from "vue-material-design-icons/Magnify.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  filterKey: {
    type: String,
    default: "title",
  },
});

const emit = defineEmits(["update:input"]);

let input = ref("");

const filteredList = computed(() =>
  props.items.filter((item) =>
    item[props.filterKey]?.toLowerCase().includes(input.value.toLowerCase())
  )
);

watch(input, (newValue) => emit("update:input", newValue));
</script>

<template>
  <div class="search-area">
    <button><search class="search-icon" /></button>
    <input
      type="text"
      class="search-bar"
      placeholder="Search"
      v-model="input"
    />
    <div class="searchbar-area" v-if="input">
      <NoteCard
        v-for="item in filteredList"
        :key="item.id"
        :note="item"
        class="note-card"
      />
      <div class="error" v-if="filteredList === 0">
        <p>No results found</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-area {
  display: flex;
  flex-direction: row;
  border: 1px solid gray;
  width: 100%;
}
.search-icon {
  color: gray;
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-bar {
  border: 0px;
  outline: none;
  background: transparent;
  flex-grow: 1;
}
</style>
