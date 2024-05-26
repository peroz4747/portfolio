<template>
  <app-wrapper :app="props.app" :width="450" :height="400">
    <div class="file-explorer">
      <div
        :key="app.id"
        v-for="app in props.app.nestedApps"
        class="folder-app"
        @click="handleClickApp(app)"
      >
        <img class="app-icon" :src="app.icon" />
        <p class="app-name">{{ app.name }}</p>
      </div>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import type { App } from '@/stores/types'
import AppWrapper from './AppWrapper.vue'
import { useDesktopAppStore } from '@/stores/desktopApp'

const props = defineProps<{
  app: OpenedApp
}>()

const desktopAppStore = useDesktopAppStore()

const handleClickApp = (app: App) => desktopAppStore.handleOpenApp(app)
</script>

<style scoped>
.file-explorer {
  background: whitesmoke;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}

.folder-app {
  width: 80px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 5px;
}
.folder-app:hover {
  background: rgba(0, 160, 125, 0.836);
  color: white;
  border-radius: 3px;
}
.app-icon {
  width: 50px;
  height: 50px;
}

.app-name {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: -webkit-box;
  font-size: 11pt;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-align: center;
}
</style>
