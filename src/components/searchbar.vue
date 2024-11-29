<script setup>
import { computed, ref } from "vue";
import NoteCard from "./NoteCard.vue";

const props = defineProps({
  notes: {
    type: Array,
    required: true,
  },
});

let input = ref("");

const filteredList = computed(() =>
  props.notes.filter((note) =>
    note.title.toLowerCase().includes(input.value.toLowerCase())
  )
);
</script>

<template>
  <input type="text" class="search-bar" placeholder="Search" v-model="input" />
  <div class="searchbar-area" v-if="input">
    <!-- <div class="searchField" v-for="note in filteredList()" :key="note.id">
      <p>{{ note.title }}</p>
    </div> -->
    <NoteCard
      v-for="note in filteredList"
      :key="note.id"
      :note="note"
      class="note-card"
    />
    <div class="error" v-if="filteredList === 0">
      <p>No results found</p>
    </div>
  </div>
</template>
