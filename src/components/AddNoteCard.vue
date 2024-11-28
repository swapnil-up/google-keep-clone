<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["add-note"]);

const isExpanded = ref(false);
const newNote = ref({
  title: "",
  content: "",
});

function expand() {
  isExpanded.value = true;
}

function addNote() {
  console.log("add triggered ");
  if (newNote.value.title.trim() != "") {
    console.log("sending");
    emit("add-note", {
      id: Date.now(),
      content: newNote.value.content,
      title: newNote.value.title,
    });
    reset();
  }
}

function reset() {
  console.log("close triggered");
  newNote.value = { title: "", content: "" };
  isExpanded.value = false;
}
</script>

<template>
  <div class="addbar" @click="expand">
    <div v-if="!isExpanded" class="collapsed">
      <input
        type="text"
        placeholder="Take a note... "
        v-model="newNote.content"
      />
    </div>
    <div v-else class="expanded">
      <input type="text" placeholder="Title" v-model="newNote.title" />
      <textarea
        type="text"
        placeholder="Take a note... "
        v-model="newNote.content"
      ></textarea>
    </div>
    <div class="actions">
      <button @click.stop="addNote">Add</button>
      <button @click.stop="reset">Close</button>
    </div>
  </div>
</template>

<style>
.addbar {
  margin-top: 100px;
}
</style>
