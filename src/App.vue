<script setup>
import { ref, watch, onMounted } from "vue";
import apiClient from "./api/axios";
import NavBar from "./components/NavBar.vue";
import Sidebar from "./components/Sidebar.vue";

const notes = ref([]);

const fetchNotes = async () => {
  try {
    const response = await apiClient.get("/notes/");
    notes.value = response.data;
  } catch (error) {
    console.error("error acquired", error);
  }
};

onMounted(() => {
  fetchNotes();
});

const filteredNotes = ref([...notes.value]);

function updateFilteredNotes(newNotes) {
  filteredNotes.value = newNotes;
}
const deleteNote = async (noteToDelete) => {
  const response = await apiClient.delete(`/notes/${noteToDelete.id}`);
  if (response.data.message === "deleted successfully") {
    notes.value = notes.value.filter((note) => note.id !== noteToDelete.id);
    filteredNotes.value = filteredNotes.value.filter(
      (note) => note.id !== noteToDelete.id
    );
  }
};
</script>

<template>
  <div class="app">
    <NavBar :notes="notes" @update:filteredNotes="updateFilteredNotes" />
    <div class="main-content-area">
      <Sidebar class="sidebar" :notes="notes" />
      <div class="flex flex-col">
        <RouterView
          :filteredNotes="filteredNotes"
          :notes="notes"
          @update-notes="updateFilteredNotes"
          @delete-note="deleteNote"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
}
.sidebar {
  position: sticky;
}
.main-content-area {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
