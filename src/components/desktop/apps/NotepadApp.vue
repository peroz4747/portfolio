<template>
  <app-wrapper :app="props.app" :width="450" :height="400">
    <div class="notepad-wrapper">
      <nav class="toolbar">
        <button @click="toggleFontSizeDropdown">Aa</button>
        <select
          id="font-size"
          v-model="fontSize"
          v-show="showFontSizeDropdown"
          @change="applySelectionStyle('fontSize')"
        >
          <option value="1">12</option>
          <option value="2">14</option>
          <option value="3">16</option>
          <option value="4">18</option>
          <option value="5">20</option>
          <option value="6">24</option>
        </select>
        <input
          id="font-color"
          type="color"
          v-model="fontColor"
          @change="applySelectionStyle('foreColor')"
        />
        <select id="font-family" v-model="fontFamily" @change="applySelectionStyle('fontName')">
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <button @click="applySelectionStyle('bold')" style="font-weight: bold">B</button>
        <button @click="applySelectionStyle('italic')" style="font-style: italic">I</button>
        <button @click="applySelectionStyle('underline')" style="text-decoration: underline">
          U
        </button>
        <button
          @click="applySelectionStyle('hiliteColor', highlightColor)"
          style="background-color: yellow"
        >
          H
        </button>
      </nav>
      <div class="text-input" contenteditable="true" @input="updateContent" ref="textInput"></div>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { OpenedApp } from '@/stores/types'
import AppWrapper from './shared/AppWrapper.vue'

const props = defineProps<{
  app: OpenedApp
}>()

const fontSize: Ref<string> = ref('3')
const fontColor: Ref<string> = ref('#000000')
const fontFamily: Ref<string> = ref('Arial')
const highlightColor: Ref<string> = ref('yellow')
const textContent: Ref<string> = ref('')

const textInput = ref<HTMLElement | null>(null)
const showFontSizeDropdown = ref<boolean>(false)

const toggleFontSizeDropdown = (): void => {
  showFontSizeDropdown.value = !showFontSizeDropdown.value
}

const applySelectionStyle = (command: string, value: string | undefined = undefined): void => {
  document.execCommand(command, false, value || getCommandValue(command))
}

const getCommandValue = (command: string): string | undefined => {
  switch (command) {
    case 'fontSize':
      return fontSize.value
    case 'foreColor':
      return fontColor.value
    case 'fontName':
      return fontFamily.value
    case 'hiliteColor':
      return highlightColor.value
    default:
      return undefined
  }
}

const updateContent = (event: Event): void => {
  const target = event.target as HTMLElement
  textContent.value = target.innerHTML
}
</script>

<style scoped>
.notepad-wrapper {
  width: 100%;
  height: 100%;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 20px);
  height: 10%;
  background: whitesmoke;
  border-bottom: 1px solid lightgray;
  padding: 0 10px;
}
.text-input {
  width: calc(100% - 20px);
  height: calc(90% - 20px);
  resize: none;
  border: none;
  outline: none;
  padding: 10px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  background-color: #fff684;
}
#font-color {
  border: 0;
  padding: 0;
}
</style>
