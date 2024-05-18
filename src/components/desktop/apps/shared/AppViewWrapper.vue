<template>
  <div
    v-if="props.app"
    class="app-view-wrapper unopened"
    ref="appViewWrapper"
    :style="styleVariables"
  >
    <component :is="appComponent" :app="props.app"></component>
  </div>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import { onMounted, ref, defineProps, computed, type Ref, shallowRef } from 'vue'

const props = defineProps<{
  app: OpenedApp
}>()

const appViewWrapper: Ref<HTMLDivElement | null> = ref(null)
const appComponent = shallowRef(props.app.component)

onMounted(() => {
  if (!appViewWrapper.value) return
  appViewWrapper.value.style.position = 'absolute'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!appViewWrapper.value) return
      appViewWrapper.value.classList.replace('unopened', 'opened')
    })
  })
})

const styleVariables = computed(() => ({
  '--app-top': props.app.position ? props.app.position.top : 0,
  '--app-left': props.app.position ? props.app.position.left : 0,
  '--app-transition': props.app.transition
}))
</script>

<style scoped>
.unopened {
  width: 1px;
  height: 1px;
  top: 100vh;
  left: 0;
}
.opened {
  top: var(--app-top);
  left: var(--app-left);
  transition: var(--app-transition);
  z-index: 100;
}
</style>
