<template>
  <div class="start-menu">
    <div
      class="start-menu-item"
      v-for="app in getStartMenuApps"
      :key="app.id"
      @click="handleClickApp(app)"
    >
      <img class="menu-item-icon" :src="app.icon" />
      <div class="menu-item-name">
        {{ app.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesktopAppStore } from '@/stores/desktopApp'
import type { App } from '@/stores/types'
import { computed } from 'vue'

const desktopAppStore = useDesktopAppStore()

const handleClickApp = (app: App) => desktopAppStore.handleOpenApp(app)
const getStartMenuApps = computed(() => desktopAppStore.getStartMenuApps)
</script>

<style scoped>
.start-menu {
  position: absolute;
  left: 0;
  bottom: 50px;
  width: fit-content;
  height: fit-content;
  background: rgb(68, 68, 68);
  display: inline-grid;
}
.start-menu-item {
  padding: 15px 30px;
  display: inline-flex;
  gap: 15px;
  cursor: pointer;
}
.start-menu-item:hover {
  background: rgba(150, 150, 150, 0.678);
}
.menu-item-icon {
  width: 35px;
  height: 35px;
}
.menu-item-name {
  text-align: center;
  margin: auto;
  color: white;
}
</style>
