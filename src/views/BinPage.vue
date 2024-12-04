<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you're looking for does not exist.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script setup>
// This component doesn't need any JavaScript logic for a simple 404 page
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 3em;
  color: #ff6347;
}

.not-found p {
  font-size: 1.5em;
}

.not-found a {
  font-size: 1.2em;
  color: #007bff;
  text-decoration: none;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
