<template>
  <div
    class="desktop-app-grid"
    ref="desktopGrid"
    @dragover.prevent="allowDrop($event)"
    @drop="drop($event)"
  >
    <!--TODO: improve draggable vs drop-zone-->
    <div
      v-for="app in getDesktopApps"
      :key="app.id"
      draggable="true"
      @dragstart="dragStart($event, app)"
      @click="handleClickApp(app)"
      class="app draggable-item"
    >
      <div class="app-container">
        <img class="app-icon" :src="app.icon" />
        <p class="app-name">{{ app.name }}</p>
      </div>
    </div>
    <app-view-wrapper v-bind:key="app.id" v-for="app in openedAppWindows" :app="app" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useDesktopAppStore } from '@/stores/desktopApp'
import { storeToRefs } from 'pinia'
import AppViewWrapper from '../apps/shared/AppViewWrapper.vue'
import type { App } from '@/stores/types'

const desktopGrid = ref(null)

const desktopAppStore = useDesktopAppStore()

const { openedAppWindows } = storeToRefs(desktopAppStore)

const dragStart = (e: DragEvent, app: App) => desktopAppStore.dragStart(e, app)
const allowDrop = (e: DragEvent) => desktopAppStore.allowDrop(e)
const drop = (e: DragEvent) => desktopAppStore.drop(e)
const handleClickApp = (app: App) => desktopAppStore.handleOpenApp(app)
const getDesktopApps = computed(() => desktopAppStore.getDesktopApps)

onMounted(() => {
  if (desktopGrid.value) {
    desktopAppStore.calculateAppGrid(desktopGrid.value)
  }
})
</script>

<style scoped>
.desktop-app-grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(var(--num-rows, 10), var(--app-box-height));
  grid-gap: 0;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
  justify-content: start;
}
.app {
  width: var(--app-box-width);
  height: var(--app-box-height);
}
.app:hover {
  background: rgba(0, 160, 125, 0.836);
  color: white;
  border-radius: 3px;
}
.app-container {
  text-align: center;
  padding: 5px;
  width: max-content;
  height: -webkit-fill-available;
  margin: auto;
}
.app-view-wrapper {
  position: absolute;
}
.app-icon {
  width: 50px;
  height: 50px;
}
.app-name {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(var(--app-box-width) - 10px);
  display: -webkit-box;
  font-size: 11pt;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
</style>
