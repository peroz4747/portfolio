<template>
  <app-wrapper :app="props.app" :width="500" :height="350">
    <div class="email-app">
      <div class="sidebar">
        <ul>
          <li v-for="email in emails" :key="email.id" @click="selectEmail(email)">
            <span :class="{ unread: !email.read }">{{ email.subject }}</span>
          </li>
        </ul>
      </div>
      <div class="email-content" v-if="selectedEmail">
        <h2>{{ selectedEmail.subject }}</h2>
        <div v-html="selectedEmail.body"></div>
      </div>
      <div v-else class="no-email-selected">
        <p>Please select an email to view its content</p>
      </div>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import AppWrapper from './shared/AppWrapper.vue'
import { useEmailAppStore, type Email } from './stores/emailApp'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  app: OpenedApp
}>()

const emailAppStore = useEmailAppStore()
const { selectedEmail, emails } = storeToRefs(emailAppStore)

const selectEmail = (email: Email) => emailAppStore.selectEmail(email)
</script>

<style scoped>
.email-app {
  display: flex;
  background-color: #f0f0f0;
  height: 100%;
}

.sidebar {
  width: 200px;
  border-right: 1px solid #ccc;
  overflow: auto;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
}

.sidebar li:hover {
  background-color: #baffb1;
}

.sidebar .unread {
  font-weight: bold;
}

.email-content {
  padding: 20px;
  flex: 1;
  overflow: auto;
  overflow-wrap: anywhere;
}

.no-email-selected {
  padding: 20px;
  flex: 1;
  text-align: center;
}
</style>
