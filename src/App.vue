<script setup>
import { ref, watch, onMounted } from "vue";
import apiClient from "./api/axios";
import NavBar from "./components/NavBar.vue";
import Sidebar from "./components/Sidebar.vue";

// const notes = ref([
//   {
//     id: 1,
//     title: "first note",
//     content: "this is a test note",
//     tags: ["work", "first"],
//     additionalProperties: {},
//   },
//   {
//     id: 2,
//     title: "second note",
//     content: "asd jjl",
//     tags: ["first"],
//     additionalProperties: {},
//   },
//   {
//     id: 3,
//     title: "grocery list",
//     content: "Buy milk, bread, and eggs",
//     tags: ["personal", "shopping"],
//     additionalProperties: {},
//   },
//   {
//     id: 4,
//     title: "meeting notes",
//     content: "Discuss project roadmap and deliverables",
//     tags: ["work", "important"],
//     additionalProperties: {},
//   },
//   {
//     id: 5,
//     title: "fitness goals",
//     content: "Run 5km daily, eat healthy meals",
//     tags: ["personal", "health"],
//     additionalProperties: {},
//   },
//   {
//     id: 6,
//     title: "book recommendations",
//     content: "The Alchemist, Atomic Habits, Sapiens",
//     tags: ["reading", "leisure"],
//     additionalProperties: {},
//   },
//   {
//     id: 7,
//     title: "vacation plans",
//     content: "Visit Bali in summer, book flights and hotels",
//     tags: ["travel", "planning"],
//     additionalProperties: {},
//   },
// ]);

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
    <Sidebar class="sidebar" :notes="notes" />
    <div class="main-content-area">
      <NavBar :notes="notes" @update:filteredNotes="updateFilteredNotes" />
      <RouterView
        :filteredNotes="filteredNotes"
        :notes="notes"
        @update-notes="updateFilteredNotes"
        @delete-note="deleteNote"
      />
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
  flex-direction: row;
}
.sidebar {
  position: sticky;
  z-index: 10;
}
.main-content-area {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
