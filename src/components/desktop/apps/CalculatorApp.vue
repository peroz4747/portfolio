<template>
  <app-wrapper :app="props.app" :width="300" :height="400">
    <div class="calculator-wrapper">
      <div class="results-view">
        <div class="results">
          {{ computation }}
        </div>
        <input
          type="text"
          class="input"
          ref="calcInput"
          @input="validateInput($event.target as HTMLInputElement)"
        />
      </div>
      <div class="numberpad-grid">
        <div class="pad-item delete" @click="clearInput">C</div>
        <div class="pad-item operation" @click="addSignChange">+/-</div>
        <div class="pad-item operation" @click="addToInput('%')">%</div>
        <div class="pad-item operation" @click="addToInput('/')">/</div>

        <div class="pad-item" @click="addToInput('7')">7</div>
        <div class="pad-item" @click="addToInput('8')">8</div>
        <div class="pad-item" @click="addToInput('9')">9</div>
        <div class="pad-item operation" @click="addToInput('*')">X</div>

        <div class="pad-item" @click="addToInput('4')">4</div>
        <div class="pad-item" @click="addToInput('5')">5</div>
        <div class="pad-item" @click="addToInput('6')">6</div>
        <div class="pad-item operation" @click="addToInput('-')">-</div>

        <div class="pad-item" @click="addToInput('1')">1</div>
        <div class="pad-item" @click="addToInput('2')">2</div>
        <div class="pad-item" @click="addToInput('3')">3</div>
        <div class="pad-item operation" @click="addToInput('+')">+</div>

        <div class="pad-item span2" @click="addToInput('0')">0</div>
        <div class="pad-item" @click="addToInput('.')">.</div>
        <div class="pad-item equal" @click="addToInput('=')">=</div>
      </div>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import AppWrapper from './shared/AppWrapper.vue'
import { ref, type Ref } from 'vue'
import { useCalculatorAppStore } from './stores/calculatorApp'
import { storeToRefs } from 'pinia'

var calcInput: Ref<HTMLInputElement> = ref(null!)
const calculatorAppStore = useCalculatorAppStore()

const { computation } = storeToRefs(calculatorAppStore)

const props = defineProps<{
  app: OpenedApp
}>()

const validateInput = (element: HTMLInputElement) => calculatorAppStore.validateInput(element)
const clearInput = () => calculatorAppStore.clearInput(calcInput.value)
const addToInput = (char: string) => calculatorAppStore.addToInput(calcInput.value, char)
const addSignChange = () => calculatorAppStore.addSignChange(calcInput.value)
</script>

<style scoped>
.calculator-wrapper {
  color: white;
  width: 100%;
  height: 100%;
}
.results-view {
  width: inherit;
  height: 30%;
}
.results {
  height: calc(40% - 20px);
  text-align: end;
  padding: 10px 15px;
  opacity: 0.65;
}
.input {
  resize: none;
  height: 60%;
  padding: 0;
  background: black;
  outline: none;
  color: white;
  font-size: 18pt;
  padding-left: 15px;
  width: calc(100% - 17px);
}
.numberpad-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  height: 70%;
  width: 100%;
}
.pad-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
  background: rgb(68, 68, 68);
  border: 1px solid black;
  transition: 0.3s;
}
.pad-item:hover {
  background: rgba(150, 150, 150, 0.678);
}
.span2 {
  grid-column: span 2;
}
.delete {
  background: red;
}
.operation {
  background: #ffd900f5;
}
.equal {
  background: #50d900;
}
</style>
