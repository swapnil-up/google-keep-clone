<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import NavBar from "./components/NavBar.vue";
import NoteCard from "./components/NoteCard.vue";
import AddNoteCard from "./components/AddNoteCard.vue";
import Sidebar from "./components/Sidebar.vue";

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

function handleAddNote(newNote) {
  notes.value.push(newNote);
}

const filteredNotes = ref([...notes.value]);

function updateFilteredNotes(newNotes) {
  filteredNotes.value = newNotes;
}
</script>

<template>
  <div class="app">
    <Sidebar class="sidebar" :notes="notes" />
    <div class="main-content-area">
      <NavBar :notes="notes" @update:filteredNotes="updateFilteredNotes" />
      <AddNoteCard @add-note="handleAddNote" :notes="notes" />
      <div class="notes-area">
        <draggable
          v-model="filteredNotes"
          handle=".drag-handle"
          class="single-note"
          item-key="id"
        >
          <template #item="{ element }">
            <NoteCard :note="element" />
          </template>
        </draggable>
      </div>
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
.notes-area {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 16px;
  padding: 10px;
}
.single-note {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.drag-handle {
  cursor: grab;
}
.modal-div {
  background-color: white;
}
</style>
