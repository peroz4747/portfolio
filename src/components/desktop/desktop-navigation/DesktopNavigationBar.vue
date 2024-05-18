<template>
  <desktop-start-menu v-if="startMenuOpened" />
  <nav class="navigation-bar">
    <div class="sm-img-wrapper" @click="handleStartMenuIconClick">
      <img class="sm-img" :src="StartMenuIcon" />
    </div>
    <div
      v-for="app in appsGroupedByComponent()"
      :key="app.appName"
      class="navbar-apps"
      @click="handleNavBarAppIconClick(app)"
    >
      <img class="nav-app-icon" :src="app.appIcon" />
    </div>

    <div class="current-time">
      {{ currentTime }}
    </div>
  </nav>
</template>

<script setup lang="ts">
import StartMenuIcon from '@/assets/start-menu-icon.svg'
import DesktopStartMenu from './DesktopStartMenu.vue'
import { useDesktopAppStore } from '@/stores/desktopApp'
import type { AppGroup } from '@/stores/types'
import { storeToRefs } from 'pinia'
import { computed, onBeforeUnmount, onMounted } from 'vue'

const desktopAppStore = useDesktopAppStore()

const { currentTime, startMenuOpened } = storeToRefs(desktopAppStore)

const appsGroupedByComponent = computed(() => desktopAppStore.getAppsGroupedByComponent)
const handleNavBarAppIconClick = (app: AppGroup) => desktopAppStore.handleNavBarAppIconClick(app)
const handleStartMenuIconClick = computed(() => desktopAppStore.handleStartMenuIconClick)

let animationFrameId: number | null = null

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)
  desktopAppStore.getCurrentTime()
}

onMounted(() => {
  desktopAppStore.getCurrentTime()
  animate()
})

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.navigation-bar {
  background: rgb(68, 68, 68);
  display: inline-flex;
  align-items: center;
  border-top: 1px solid black;
}
.sm-img-wrapper {
  padding: 6px;
  border-right: 1px solid rgba(150, 150, 150, 0.678);
  transition: 0.3s;
}
.sm-img-wrapper:hover,
.navbar-apps:hover {
  background: rgba(150, 150, 150, 0.678);
}
.sm-img {
  width: 40px;
  height: 40px;
}
.current-time {
  color: white;
  font-weight: bold;
  width: fit-content;
  height: fit-content;
  right: 0;
  position: fixed;
  padding: 15px;
}
.navbar-apps {
  padding: 5px;
}
.nav-app-icon {
  width: 35px;
  height: 35px;
}
</style>
