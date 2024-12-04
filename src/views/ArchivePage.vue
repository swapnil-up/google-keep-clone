<template>
  <div class="archive-page">
    <h1>Archived Notes</h1>
    <p>
      Below are your archived notes. These are old notes that you may want to
      revisit.
    </p>

    <div class="archive-item">
      <h3>Note 1: Travel Plans</h3>
      <p>This note contains my plans for the summer vacation.</p>
      <small>Archived on: 2023-06-15</small>
    </div>

    <div class="archive-item">
      <h3>Note 2: Work Project</h3>
      <p>This note includes details about the project I worked on last year.</p>
      <small>Archived on: 2022-11-30</small>
    </div>

    <div class="archive-item">
      <h3>Note 3: Birthday Celebration</h3>
      <p>
        This note describes how I celebrated my birthday in 2021 with friends
        and family.
      </p>
      <small>Archived on: 2021-09-10</small>
    </div>

    <div class="archive-item">
      <h3>Note 4: Budget Plan</h3>
      <p>
        This is a budget plan I created for managing my finances over the last
        year.
      </p>
      <small>Archived on: 2022-01-05</small>
    </div>
  </div>
</template>

<script setup>
// No script necessary for dummy content
</script>

<style scoped>
.archive-page {
  padding: 20px;
  background-color: #f4f4f9;
}

.archive-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.archive-item h3 {
  margin: 0;
  font-size: 1.2em;
}

.archive-item p {
  margin: 5px 0;
}

.archive-item small {
  display: block;
  margin-top: 10px;
  font-size: 0.85em;
  color: #666;
}
</style>
