<script setup>
import { computed, ref, watch } from "vue";
import searchIcon from "vue-material-design-icons/Magnify.vue";

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
  <div class="flex border border-gray-300 rounded bg-white w-full">
    <button>
      <searchIcon class="text-gray-300 mx-3 flex items-center justify-center" />
    </button>
    <input
      type="text"
      class="outline-none bg-transparent flex-grow w-full"
      placeholder="Search"
      v-model="input"
    />
    <div v-if="input">
      <div v-if="filteredList === 0">
        <p>No results found</p>
      </div>
    </div>
  </div>
</template>
