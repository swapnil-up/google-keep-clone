<script setup>
import { ref, computed } from "vue";
import searchbar from "./searchbar.vue";

const { notes } = defineProps({
  notes: {
    type: Array,
    required: true,
  },
});

const uniqueTags = computed(() => {
  const tagSet = new Set();
  notes.forEach((note) => {
    const tags = Array.isArray(note.tags) ? note.tags : [];
    tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
});

const filteredTags = ref([...uniqueTags.value]);

function updateFilteredTags(newTags) {
  filteredTags.value = newTags;
}
</script>

<template>
  <div>
    <searchbar :items="uniqueTags" @update:filtered="updateFilteredTags" />
    <li v-for="(tag, index) in filteredTags" :key="index">
      {{ tag }}
    </li>
  </div>
</template>

<style scoped>
searchbar:focus {
  border-color: #adadad;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

li {
  padding: 8px 12px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #adadad;
  color: white;
}
</style>
