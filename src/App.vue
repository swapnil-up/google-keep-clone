<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import NavBar from "./components/NavBar.vue";
import NoteCard from "./components/NoteCard.vue";
import AddNoteCard from "./components/AddNoteCard.vue";
import Sidebar from "./components/Sidebar.vue";
import EditModal from "./components/EditModal.vue";

const notes = ref([
  { id: 1, title: "first note", content: "this is a test note" },
  { id: 2, title: "second note", content: "asd;lfkj;" },
]);

function handleAddNote(newNote) {
  console.log("trying to get add");
  notes.value.push(newNote);
}

const showModal = ref(false);
</script>

<template>
  <div class="app">
    <Sidebar class="sidebar" />
    <div class="main-area">
      <NavBar />
      <AddNoteCard @add-note="handleAddNote" />
      <draggable v-model="notes" handle=".drag-handle">
        <template #item="{ element }">
          <NoteCard :note="element" />
        </template>
      </draggable>

      <button id="show-modal" @click="showModal = true">Show Modal</button>
      
        <EditModal
          :isOpen="showModal"
          @update:isOpen="showModal = $event"
        ></EditModal>
      
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
  flex-wrap: wrap;
  gap: 20px;
}
.drag-handle {
  cursor: grab;
}
</style>
