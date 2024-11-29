<script setup>
import { ref } from "vue";

const props = defineProps({
  notes: {
    type: Array,
    required: true,
  },
});

let input = ref("");

function filteredList() {
  return props.notes.filter((note) =>
    note.title.toLowerCase().includes(input.value.toLowerCase())
  );
}
</script>

<template>
  <input type="text" class="search-bar" placeholder="Search" v-model="input" />
  <div class="searchbar-area" v-if="input">
    <div class="searchField" v-for="note in filteredList()" :key="note.id">
      <p>{{ note.title }}</p>
    </div>
    <div class="error" v-if="input && !filteredList().length">
      <p>No results found</p>
    </div>
  </div>
</template>
