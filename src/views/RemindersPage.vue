<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const count = computed(() => store.state.count);
const doubleCount = computed(() => store.getters.doubleCount);

onMounted(() => {
  console.log(store.state.count);
});
</script>

<template>
  <div class="buttons">
    <h2>{{ count }}</h2>
    <div>
      <button @click="store.commit('INCREMENT_COUNT', 1)">increment</button>
    </div>
    <div>
      <button @click="store.commit('DECREMENT_COUNT', 1)">decrement</button>
    </div>
    <div>
      <button @click="store.dispatch('incrementAsync')">async increment</button>
    </div>

    <h2>{{ doubleCount }}</h2>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
button {
  border: 1px solid gray;
}
</style>
