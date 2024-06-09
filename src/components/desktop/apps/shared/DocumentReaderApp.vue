<template>
  <app-wrapper :app="props.app" :width="600" :height="500">
    <div class="document-reader-wrapper">
      <div class="document-reader">
        <div class="document-content" ref="slotContainer">
          <slot></slot>
        </div>
      </div>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import AppWrapper from './AppWrapper.vue'
import { onMounted, ref } from 'vue'
import { nextTick } from 'process'

const props = defineProps<{
  app: OpenedApp
}>()

const slotContainer = ref<HTMLElement | null>(null)

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  } else {
    console.error('Speech Synthesis not supported')
  }
}

const extractTextFromHTML = (html: HTMLElement) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html.innerHTML
  return tempDiv.textContent || ''
}

onMounted(() => {
  nextTick(() => {
    console.log(slotContainer.value)
    if (slotContainer.value) {
      const textContent = extractTextFromHTML(slotContainer.value)
      if (textContent) {
        speak(textContent)
      }
    }
  })
})
</script>

<style scoped>
.document-reader-wrapper {
  height: 100%;
  width: 100%;
  overflow: auto;
  background: rgb(112, 112, 112);
}
.document-reader {
  width: calc(100% - 60px);
  height: calc(100% - 30px);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 30px;
}
.document-content {
  min-height: calc(100% - 30px);
  height: auto;
  width: 100%;
  box-shadow: 1px 1px 15px black;
  background: whitesmoke;
  border-radius: 5px;
  padding: 10px;
}
</style>
