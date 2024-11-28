<script setup lang="ts">
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import NoteCard from "./components/NoteCard.vue";
import AddNoteCard from "./components/AddNoteCard.vue";
import Sidebar from "./components/Sidebar.vue";

const notes = ref([
  { id: 1, title: "first note", content: "this is a test note" },
  { id: 2, title: "second note", content: "asd;lfkj;" },
]);

interface Note {
  id: number;
  title: string;
  content: string;
}
function handleAddNote(newNote: Note) {
  console.log("trying to get add");
  notes.value.push(newNote);
}
</script>

<template>
  <div class="app">
    <Sidebar class="sidebar" />
    <div class="main-area">
      <NavBar />
      <AddNoteCard @add-note="handleAddNote" />
      <div class="notes">
        <NoteCard v-for="note in notes" :key="note.id" :note="note" />
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
  height: 100vh;
}
.sidebar {
  display: flex;
  flex-direction: row;
  padding: 20px;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.notes {
  margin-top: 15px;
  padding: 20px;
  display: flex;
  flex-direction: wrap;
  gap: 20px;
}
</style>
