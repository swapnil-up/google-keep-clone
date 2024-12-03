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
    note.tags.forEach((tag) => tagSet.add(tag));
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
