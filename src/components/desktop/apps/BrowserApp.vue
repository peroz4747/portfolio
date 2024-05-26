<template>
  <app-wrapper :app="props.app" :width="450" :height="400">
    <div class="container">
      <h1>Search Results</h1>
      <div class="search-bar">
        <input v-model="url" @keyup.enter="loadUrl" placeholder="Enter search query" />
        <button @click="loadUrl">Search</button>
      </div>
      <ul class="results">
        <li v-for="result in searchResults" :key="result.link" class="result-item">
          <a :href="result.link" target="_blank">{{ result.title }}</a>
          <p>{{ result.snippet }}</p>
        </li>
      </ul>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import AppWrapper from './shared/AppWrapper.vue'
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps<{ app: OpenedApp }>()
const url = ref('')
const searchResults = ref<any[]>([])

const loadUrl = async () => {
  try {
    const response = await axios.get('/.netlify/functions/search', {
      params: {
        q: url.value
      }
    })
    searchResults.value = response.data.items
  } catch (error) {
    console.error('Error fetching search results:', error)
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
  height: 100%;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

ul.results {
  list-style-type: none;
  padding: 0;
}

.result-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.result-item a {
  text-decoration: none;
  color: #007bff;
  font-size: 18px;
  transition: color 0.3s ease;
}

.result-item a:hover {
  color: #0056b3;
}

.result-item p {
  margin: 5px 0 0;
  color: #666;
}
</style>
