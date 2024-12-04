<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const search = computed({
  get() {
    return route.query.search ?? "";
  },
  set(search) {
    router.replace({ query: { search } });
  },
});
</script>

<template>
  <div class="about">
    <h1>About Page</h1>
    <p>This is the about page for the app.</p>
  </div>
  <label>
    Search: <input class="input" v-model.trim="search" maxlength="20" />
  </label>
</template>

<style scoped>
.about {
  padding: 20px;
}
.input {
  border: 1px solid gray;
}
</style>
