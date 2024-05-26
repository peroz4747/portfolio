import { defineStore } from 'pinia'

interface State {
  computation: string
  result: boolean
}

const allowedChars = /^[0-9+\-*/%()=.]*$/
const operationalChar = /[\d%)]\s*[+\-*/]/
const equalChar = /[\d%)]\s*[=]/

export const useCalculatorAppStore = defineStore('calculatorApp', {
  state: (): State => ({
    computation: '',
    result: false
  }),
  actions: {
    validateInput(element: HTMLInputElement) {
      if (!allowedChars.test(element.value)) {
        element.value = element.value.slice(0, -1)
      }
      if (operationalChar.test(element.value)) {
        if (this.result) {
          this.computation = ''
          this.result = false
        }
        this.computation += element.value
        element.value = ''
      }
      if (equalChar.test(element.value)) {
        this.computation += element.value.replace('=', '')
        element.value = eval(this.computation.replace(/%/g, ''))
        element.value += this.computation.includes('%') ? '%' : ''
        this.result = true
      }
    },
    clearInput(element: HTMLInputElement) {
      if (!element) return
      this.result = false
      this.computation = ''
      element.value = ''
    },
    addToInput(element: HTMLInputElement, char: string) {
      if (!element) return
      element.value += char
      this.validateInput(element)
    },
    addSignChange(element: HTMLInputElement) {
      if (!element) return
      element.value = `-(${element.value})`
    }
  },
  getters: {}
})
