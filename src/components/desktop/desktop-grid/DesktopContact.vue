<template>
  <div class="contact-form">
    <div class="icon-container">
      <img :src="ContactIcon" alt="Contact Icon" class="contact-icon" @click="toggleOptions" />
      <div v-if="showOptions" class="options">
        <button @click="showContactForm">Contact Me</button>
        <button @click="showBugForm">Report a Bug</button>
      </div>
    </div>

    <section v-if="formType === 'bug'" id="report-bug">
      <button class="dismiss-button" @click="dismissForm">X</button>
      <h2>Report a Bug</h2>
      <form @submit.prevent="submitBugReport">
        <div class="form-group">
          <label for="bug-description">Bug Description:</label>
          <textarea id="bug-description" v-model="bugDescription" required></textarea>
        </div>
        <div class="form-group">
          <label for="bug-steps">Steps to Reproduce:</label>
          <textarea id="bug-steps" v-model="bugSteps" required></textarea>
        </div>
        <button type="submit">Submit Bug Report</button>
      </form>
    </section>

    <section v-if="formType === 'contact'" id="contact-me">
      <button class="dismiss-button" @click="dismissForm">X</button>
      <h2>Contact Me</h2>
      <form @submit.prevent="submitContactForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="contactName" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="contactEmail" required />
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" v-model="contactMessage" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContactIcon from '@/assets/contact-icon.svg'

const bugDescription = ref('')
const bugSteps = ref('')
const contactName = ref('')
const contactEmail = ref('')
const contactMessage = ref('')
const showOptions = ref(false)
const formType = ref('')

const toggleOptions = () => {
  showOptions.value = !showOptions.value
}

const showContactForm = () => {
  formType.value = 'contact'
  showOptions.value = false
}

const showBugForm = () => {
  formType.value = 'bug'
  showOptions.value = false
}

const dismissForm = () => {
  formType.value = ''
}

const submitBugReport = () => {
  const subject = `Bug Report ${new Date().toISOString()}`
  const body = `Bug Description: ${bugDescription.value}\nSteps to Reproduce: ${bugSteps.value}`
  window.location.href = `mailto:peter.zupanc7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const submitContactForm = () => {
  const subject = 'Contact from GinaOS'
  const body = `Name: ${contactName.value}\nEmail: ${contactEmail.value}\nMessage: ${contactMessage.value}`
  window.location.href = `mailto:peter.zupanc7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
</script>

<style scoped>
.contact-form {
  position: absolute;
  right: 0;
  top: 67px;
  width: 307px;
}

.icon-container {
  position: fixed;
  top: 0;
  right: 0;
  text-align: center;
  margin: 20px;
}

.contact-icon {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: 0.5s;
  float: right;
  margin-bottom: 10px;
}

.contact-icon:hover {
  width: 60px;
  height: 60px;
}

.options {
  margin-top: 10px;
}

.options button {
  display: block;
  margin: 5px auto;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.options button:hover {
  background-color: #45a049;
}

section {
  background-color: #fff;
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.dismiss-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: #333;
}

h2 {
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
  color: #fff;
}
</style>
