<template>
  <app-wrapper :app="props.app" :width="300" :height="400">
    <div class="notepad-wrapper">
      <nav class="toolbar">Aa size color highlight</nav>
      <textarea class="text-input"></textarea>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import AppWrapper from './shared/AppWrapper.vue'

const props = defineProps<{
  app: OpenedApp
}>()
</script>

<style scoped>
.notepad-wrapper {
  width: 100%;
  height: 100%;
}
.toolbar {
  width: 100%;
  height: 10%;
  background: whitesmoke;
  border-bottom: 1px solid lightgray;
}
.text-input {
  width: 100%;
  height: 90%;
  resize: none;
  border: none;
  outline: none;
  background: rgb(241, 241, 90);
}
</style>
