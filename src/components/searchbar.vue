<script setup>
import { computed, ref, watch } from "vue";
import NoteCard from "./NoteCard.vue";

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
  <input type="text" class="search-bar" placeholder="Search" v-model="input" />
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
</template>

<style>
.searchbar-area {
  display: flex;
  flex-direction: column;
}
</style>
