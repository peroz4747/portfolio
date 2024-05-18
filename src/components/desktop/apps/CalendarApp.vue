<template>
  <app-wrapper :app="props.app" :width="300" :height="300">
    <calendar is-dark="system" :first-day-of-week="2" expanded :attributes="attrs" />
  </app-wrapper>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import AppWrapper from './shared/AppWrapper.vue'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'
import { ref } from 'vue'

const props = defineProps<{
  app: OpenedApp
}>()

const attrs = ref([
  {
    key: 'test',
    highlight: true
  }
])
</script>

<style>
.vc-container {
  height: 100% !important;
}
button.vc-title,
button.vc-arrow {
  background-color: var(--vc-bg);
}
</style>
