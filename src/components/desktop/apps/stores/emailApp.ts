import { defineStore } from 'pinia'
import welcome from './emails/Welcome.html'

export interface Email {
  id: number
  subject: string
  body: string
  read: boolean
}

interface State {
  emails: Email[]
  selectedEmail: Email | null
}

export const useEmailAppStore = defineStore('emailApp', {
  state: (): State => ({
    emails: [
      {
        id: 1,
        subject: 'Welcome to GinaOS',
        body: welcome,
        read: false
      }
    ],
    selectedEmail: null
  }),
  actions: {
    selectEmail(email: Email) {
      this.selectedEmail = email
      email.read = true
    }
  }
})
