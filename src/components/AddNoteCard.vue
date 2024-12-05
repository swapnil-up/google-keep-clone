<script setup>
import { ref, defineEmits, watch, onMounted, nextTick } from "vue";
import checkbox from "vue-material-design-icons/CheckboxMarkedOutline.vue";
import gallery from "vue-material-design-icons/ImageOutline.vue";
import labels from "vue-material-design-icons/LabelOutline.vue";
import tagList from "./tagList.vue";
import { useStore } from "vuex";
import imageSelect from "./imageSelect.vue";
const store = useStore();

const { notes } = defineProps({
  notes: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["add-note"]);

const isExpanded = ref(false);
const newNote = ref({
  title: "",
  content: "",
  tags: [],
  additionalProperties: {},
});
const textareaRef = ref(null);

function expand() {
  isExpanded.value = true;
}

function addNote() {
  if (newNote.value.title.trim() != "") {
    console.log("sending");
    console.log(newNote.value);
    emit("add-note", {
      id: Date.now(),
      content: newNote.value.content,
      title: newNote.value.title,
      tags: newNote.value.tags.length > 0 ? newNote.value.tags : [],
      additionalProperties: {
        image: newNote.value.additionalProperties.image || null,
      },
    });
    reset();
    store.commit("incrementNotesCount", 1);
  }
}

function reset() {
  newNote.value = {
    title: "",
    content: "",
    tags: [],
    additionalProperties: {},
  };
  isExpanded.value = false;
}

const istagDialog = ref(false);

function toggleTagDialog() {
  istagDialog.value = !istagDialog.value;
}

function updateTags(selectedTags) {
  newNote.value.tags = selectedTags;
}

function updateImage(imageUrl) {
  newNote.value.additionalProperties.image = imageUrl;
}

const handleKeyup = (event) => {
  if (event.key === "Escape") {
    reset();
  }
};

onMounted(() => {
  document.addEventListener("keyup", handleKeyup);
});

watch(isExpanded, (newVal) => {
  if (newVal) {
    nextTick(() => {
      textareaRef.value?.focus();
    });
  }
});
</script>

<template>
  <div class="addbar" @click="expand">
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
        ref="textareaRef"
      ></textarea>
      <div name="add-tag">
        <button name="add-tag-button" @click="toggleTagDialog()">
          <labels style="color: gray" />
        </button>
        <div v-if="istagDialog" class="tag-dialog">
          <tagList :notes="notes" />
        </div>
      </div>
      <div><imageSelect @image-selected="updateImage" /></div>
      <div class="actions">
        <button @click.stop="addNote">Add</button>
        <button @click.stop="reset">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.addbar {
  width: 80%;
  max-width: 1000px;
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
  padding: 15px;
}

.expanded input,
.expanded textarea {
  padding: 12px;
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
  display: inline;
}
.tag-dialog {
  display: inline;
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  z-index: 1000;
  list-style-type: none;
}

.button {
  position: relative;
  margin: 5px;
}
</style>
