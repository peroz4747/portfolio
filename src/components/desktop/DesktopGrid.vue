<template>
  <div class="desktop">
    <desktop-app-grid />
    <desktop-navigation-bar />
  </div>
</template>

<script setup lang="ts">
import DesktopNavigationBar from './desktop-navigation/DesktopNavigationBar.vue'
import DesktopAppGrid from './desktop-grid/DesktopAppGrid.vue'
</script>

<style scoped>
.desktop {
  width: 100vw;
  height: 100vh;
  background: #00d659;
  display: grid;
  grid-template-rows: auto 50px;
  position: fixed;
}
.navigation-bar {
  background: rgb(68, 68, 68);
}
</style>
