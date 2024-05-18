<template>
  <app-wrapper :app="props.app" :width="300" :height="400">
    <div class="calc">Email</div>
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
.calc {
  color: white;
}
</style>
