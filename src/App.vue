<script setup>
import { ref } from "vue";
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
  { id: 2, title: "second note", content: "asd;lfkj;", tags: ["first"] },
]);

function handleAddNote(newNote) {
  notes.value.push(newNote);
}
</script>

<template>
  <div class="app">
    <Sidebar class="sidebar" />
    <div class="main-area">
      <NavBar :notes="notes" />

      <div class="main-content-area">
        <AddNoteCard @add-note="handleAddNote" />
        <draggable v-model="notes" handle=".drag-handle">
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
.main-content-area {
  margin-top: 20px;
}
.notes {
  margin-top: 15px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.drag-handle {
  cursor: grab;
}
.modal-div {
  background-color: white;
}
</style>
