<template>
  <desktop-grid></desktop-grid>
  <loading-screen v-if="!desktopLoaded"></loading-screen>
</template>

<script setup lang="ts">
import LoadingScreen from './components/loading/LoadingScreen.vue'
import DesktopGrid from './components/desktop/DesktopGrid.vue'
import { useDesktopAppStore } from './stores/desktopApp'
import { storeToRefs } from 'pinia'

const desktopApp = useDesktopAppStore()

const { desktopLoaded } = storeToRefs(desktopApp)
</script>

<style>
* {
  font-family: sans-serif;
}
</style>
