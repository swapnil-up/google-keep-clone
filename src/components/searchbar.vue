<script setup>
import { computed, ref, watch } from "vue";
import search from "vue-material-design-icons/Magnify.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  filterKey: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:input", "update:filtered"]);

let input = ref("");

const filteredList = computed(() =>
  props.items.filter((item) => {
    if (typeof item === "string") {
      return item.toLowerCase().includes(input.value.toLowerCase());
    }
    if (props.filterKey && typeof item === "object") {
      return item[props.filterKey]
        ?.toLowerCase()
        .includes(input.value.toLowerCase());
    }
    return false;
  })
);

watch(input, (newValue) => emit("update:input", newValue));
watch(filteredList, (newList) => emit("update:filtered", newList));
</script>

<template>
  <div class="search-area">
    <button><search class="search-icon" /></button>
    <input
      type="text"
      class="search-bar"
      placeholder="Search"
      v-model="input"
    />
    <div class="searchbar-area" v-if="input">
      <div class="error" v-if="filteredList === 0">
        <p>No results found</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-area {
  display: flex;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: rgb(229, 229, 229);
  width: 100%;
}
.search-icon {
  color: gray;
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-bar {
  border: 0px;
  outline: none;
  background: transparent;
  flex-grow: 1;
}
</style>
