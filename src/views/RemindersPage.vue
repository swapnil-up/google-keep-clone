<template>
  <div class="reminders-page">
    <h1>Your Reminders</h1>
    <p>Below are your upcoming reminders. Make sure to check them out!</p>

    <div class="reminder-item">
      <h3>Reminder 1: Dentist Appointment</h3>
      <p>Don't forget to attend your dentist appointment on April 20th.</p>
      <small>Reminder set for: 2024-04-19 10:00 AM</small>
    </div>

    <div class="reminder-item">
      <h3>Reminder 2: Grocery Shopping</h3>
      <p>
        Pick up groceries on the way home from work. Make sure to buy milk and
        eggs.
      </p>
      <small>Reminder set for: 2024-04-21 05:00 PM</small>
    </div>

    <div class="reminder-item">
      <h3>Reminder 3: Meeting with John</h3>
      <p>Discuss the marketing strategy with John at the office.</p>
      <small>Reminder set for: 2024-04-22 02:00 PM</small>
    </div>

    <div class="reminder-item">
      <h3>Reminder 4: Submit Project Report</h3>
      <p>Don't forget to submit the final project report by end of day.</p>
      <small>Reminder set for: 2024-04-23 09:00 AM</small>
    </div>
  </div>
</template>

<script setup>
// No script necessary for dummy content
</script>

<style scoped>
.reminders-page {
  padding: 20px;
  background-color: #f9f9f9;
}

.reminder-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.reminder-item h3 {
  margin: 0;
  font-size: 1.2em;
}

.reminder-item p {
  margin: 5px 0;
}

.reminder-item small {
  display: block;
  margin-top: 10px;
  font-size: 0.85em;
  color: #666;
}
</style>
