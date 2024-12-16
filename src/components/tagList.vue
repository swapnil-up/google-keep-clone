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
    <searchbar
      class="focus:ring-blue-400"
      :items="uniqueTags"
      @update:filtered="updateFilteredTags"
    />
    <li
      class="py-1 mt-0.5 px-2 bg-white mb-3 text-sm text-gray-400 cursor-pointer transition delay-100 ease-in-out rounded hover:bg-gray-500 hover:text-white"
      v-for="(tag, index) in filteredTags"
      :key="index"
    >
      {{ tag }}
    </li>
  </div>
</template>
