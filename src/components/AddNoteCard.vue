<script setup>
import { ref, defineEmits } from "vue";
import checkbox from "vue-material-design-icons/CheckboxMarkedOutline.vue";
import gallery from "vue-material-design-icons/ImageOutline.vue";

const emit = defineEmits(["add-note"]);

const isExpanded = ref(false);
const newNote = ref({
  title: "",
  content: "",
  tags: [],
});

function expand() {
  isExpanded.value = true;
}

function addNote() {
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
  newNote.value = { title: "", content: "" };
  isExpanded.value = false;
}

const istagDialog = ref(false);
function toggleTagDialog() {
  istagDialog.value = !istagDialog.value;
}
function addTag() {}
</script>

<template>
  <div class="addbar" @click="expand" @click.stop="addNote">
    <div v-if="!isExpanded" class="collapsed">
      <input
        type="text"
        placeholder="Take a note... "
        v-model="newNote.content"
      />
      <checkbox />
      <gallery />
    </div>
    <div v-else class="expanded">
      <input type="text" placeholder="Title" v-model="newNote.title" />
      <textarea
        type="text"
        placeholder="Take a note... "
        v-model="newNote.content"
      ></textarea>
      <div name="add-tag">
        <button name="add-tag-button" @click="toggleTagDialog()">+ tag</button>
        <div v-if="istagDialog" class="tag-dialog">
          <li v-for="tag in newNote.tags" :key="tag">{{ tag }}</li>
        </div>
      </div>
      <div class="actions">
        <button @click.stop="addNote">Add</button>
        <button @click.stop="reset">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.addbar {
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  background-color: white;
  border-radius: 8px;
  border: 1px solid grey;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.collapsed input {
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 16px;
  color: #333;
  outline: none;
  transition: all 0.3s ease;
}
.collapsed {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  color: grey;
}

.expanded {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.expanded input,
.expanded textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  outline: none;
  transition: all 0.3s ease;
}

.expanded textarea {
  resize: vertical;
  min-height: 100px;
}

.expanded input:focus,
.expanded textarea:focus {
  border-color: #6200ea;
  box-shadow: 0 0 5px rgba(98, 0, 234, 0.5);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.actions button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.actions button:hover {
  background-color: #3700b3;
}

.actions button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
.add-tag {
  display: flex;
  flex-direction: row;
}
.tag-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  z-index: 1000;
}

button {
  position: relative;
  margin: 5px;
}
</style>
