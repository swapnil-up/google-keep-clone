<script setup>
import { ref, watch } from "vue";
import NavBar from "./components/NavBar.vue";
import Sidebar from "./components/Sidebar.vue";
import { useRouter } from "vue-router";


const notes = ref([
  {
    id: 1,
    title: "first note",
    content: "this is a test note",
    tags: ["work", "first"],
  },
  {
    id: 2,
    title: "second note",
    content: "asd jjl",
    tags: ["first"],
  },
  {
    id: 3,
    title: "grocery list",
    content: "Buy milk, bread, and eggs",
    tags: ["personal", "shopping"],
  },
  {
    id: 4,
    title: "meeting notes",
    content: "Discuss project roadmap and deliverables",
    tags: ["work", "important"],
  },
  {
    id: 5,
    title: "fitness goals",
    content: "Run 5km daily, eat healthy meals",
    tags: ["personal", "health"],
  },
  {
    id: 6,
    title: "book recommendations",
    content: "The Alchemist, Atomic Habits, Sapiens",
    tags: ["reading", "leisure"],
  },
  {
    id: 7,
    title: "vacation plans",
    content: "Visit Bali in summer, book flights and hotels",
    tags: ["travel", "planning"],
  },
]);

const filteredNotes = ref([...notes.value]);

function updateFilteredNotes(newNotes) {
  filteredNotes.value = newNotes;
}

function updateNotes(newNotes) {
  notes.value = newNotes;
}
</script>

<template>
  <div class="app">
    <Sidebar class="sidebar" :notes="notes" />
    <div class="main-content-area">
      <NavBar :notes="notes" @update:filteredNotes="updateFilteredNotes" />
      <RouterView
        :filteredNotes="filteredNotes"
        :notes="notes"
        @update-notes="updateNotes"
      />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.app {
  display: flex;
  flex-direction: row;
}
.sidebar {
  position: fixed;
  z-index: 10;
}
.main-content-area {
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  width: 100%;
}
</style>
