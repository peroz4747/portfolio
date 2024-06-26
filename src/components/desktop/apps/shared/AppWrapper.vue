<template>
  <div
    class="app-wrapper unopened"
    ref="appWrapper"
    @transitionend="handleTransitionEnd"
    @dragstart="handleDragStart($event)"
    @drag="handleAppDrag($event)"
    @dragend="handleDragEnd"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    draggable="true"
  >
    <nav class="app-navbar">
      <div class="navbar-action-buttons">
        <button class="fullscreen-btn" @click="handleAppFullScreen">^</button>
        <button class="minimise-btn" @click="handleAppMinimise">-</button>
        <button class="close-btn" @click="handleAppClose">X</button>
      </div>
    </nav>
    <div class="app-content-wrapper" v-if="props.app.transitioned">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesktopAppStore } from '@/stores/desktopApp'
import type { OpenedApp } from '@/stores/types'
import { defineProps, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

const props = defineProps<{
  app: OpenedApp
  width: number
  height: number
}>()

const appWrapper: Ref<HTMLDivElement | null> = ref(null)

const desktopAppStore = useDesktopAppStore()

const handleTransitionEnd = (event: TransitionEvent) =>
  desktopAppStore.handleTransitionEnd(props.app, appWrapper.value, event)
const handleAppFullScreen = () => desktopAppStore.handleAppFullScreen(props.app)
const handleAppMinimise = () => desktopAppStore.handleAppMinimise(props.app)
const handleAppClose = () => desktopAppStore.handleAppClose(props.app)
const handleDragStart = (event: DragEvent) =>
  desktopAppStore.handleDragStart(props.app, event.clientX, event.clientY)
const handleAppDrag = (event: DragEvent) =>
  desktopAppStore.handleAppMove(props.app, event.clientX, event.clientY)
const handleDragEnd = () => desktopAppStore.handleDragEnd(props.app)

// Mouse events
const handleMouseDown = (event: MouseEvent) => {
  event.preventDefault()
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  desktopAppStore.handleDragStart(props.app, event.clientX, event.clientY)
}

const handleMouseMove = (event: MouseEvent) => {
  desktopAppStore.handleAppMove(props.app, event.clientX, event.clientY)
}

const handleMouseUp = () => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  desktopAppStore.handleDragEnd(props.app)
}

// Touch events
let touchStartX = 0
let touchStartY = 0
const dragThreshold = 10

const handleTouchStart = (event: TouchEvent) => {
  const touch = event.touches[0]
  touchStartX = touch.clientX
  touchStartY = touch.clientY
  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
  desktopAppStore.handleDragStart(props.app, touch.clientX, touch.clientY)
}

const handleTouchMove = (event: TouchEvent) => {
  const touch = event.touches[0]
  const deltaX = touch.clientX - touchStartX
  const deltaY = touch.clientY - touchStartY

  if (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold) {
    desktopAppStore.handleAppMove(props.app, touch.clientX, touch.clientY)
  }
}

const handleTouchEnd = (event: TouchEvent) => {
  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - touchStartX
  const deltaY = touch.clientY - touchStartY

  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)

  if (Math.abs(deltaX) <= dragThreshold && Math.abs(deltaY) <= dragThreshold) {
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement
    if (targetElement) {
      targetElement.click()
    }
  }

  desktopAppStore.handleDragEnd(props.app)
}

watch(props.app, (newdApp) => {
  if (!appWrapper.value) return
  if (newdApp.transitioned) {
    appWrapper.value.style.width = newdApp.size.width
    appWrapper.value.style.height = newdApp.size.height
  }
})

onMounted(() => {
  desktopAppStore.updateAppSize(props.app, props.height, props.width)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (appWrapper.value) {
        desktopAppStore.onAppStart(props.app, appWrapper.value)
      }
    })
  })
})

onUnmounted(() => {
  desktopAppStore.cleanUpAppListeners(props.app, appWrapper.value)
})
</script>

<style scoped>
.app-wrapper {
  background-color: black;
  border-radius: 5px;
  overflow: hidden;
  resize: both;
}
.app-wrapper:active {
  opacity: 1;
  transition: '0s';
}
.app-content-wrapper {
  height: calc(100% - 30px);
  width: 100%;
}
.unopened {
  width: 1px;
  height: 1px;
  top: 0;
  left: 0;
  opacity: 0;
}
.opened {
  opacity: 1;
}
.app-navbar {
  height: 30px;
  width: 100%;
  background: lightgray;
}
.navbar-action-buttons {
  float: right;
  padding: 3px;
}
.navbar-action-buttons > button {
  margin: 1px;
  border-radius: 5px;
  border: none;
  height: 22px;
  width: 22px;
}
.fullscreen-btn {
  background: #00fb2a;
}
.minimise-btn {
  background: #f1e202;
}
.close-btn {
  background: #ff0000;
}
.fullscreen-btn:hover {
  background: #00a01b;
}
.minimise-btn:hover {
  background: #afa400;
}
.close-btn:hover {
  background: #be0000;
}
</style>
