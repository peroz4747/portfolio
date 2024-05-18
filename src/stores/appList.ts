import { Origin } from './types'
import { markRaw, type Component } from 'vue'
import CalendarIcon from '@/assets/app-icons/calendar-icon.svg'
import EmailIcon from '@/assets/app-icons/email-icon.svg'
import FileExplorerIcon from '@/assets/app-icons/file-explorer-icon.svg'
import StocksIcon from '@/assets/app-icons/stocks-icon.svg'
import BrowserIcon from '@/assets/app-icons/browser-icon.svg'
import TerminalIcon from '@/assets/app-icons/terminal-icon.svg'
import CalculatorIcon from '@/assets/app-icons/calculator-icon.svg'
import AboutIcon from '@/assets/app-icons/about-icon.svg'
import NotepadIcon from '@/assets/app-icons/notepad-icon.svg'
import CalculatorApp from '@/components/desktop/apps/CalculatorApp.vue'
import NotepadApp from '@/components/desktop/apps/NotepadApp.vue'
import AboutApp from '@/components/desktop/apps/AboutApp.vue'
import CalendarApp from '@/components/desktop/apps/CalendarApp.vue'
import EmailApp from '@/components/desktop/apps/EmailApp.vue'
import BrowserApp from '@/components/desktop/apps/BrowserApp.vue'
import TerminalApp from '@/components/desktop/apps/TerminalApp.vue'
import FileExprorerApp from '@/components/desktop/apps/FileExprorerApp.vue'
import StocksApp from '@/components/desktop/apps/StocksApp.vue'

class App {
  static lastId = 1

  id: number
  name: string
  icon: string
  component: Component
  position: {
    top: string
    left: string
  } | null
  origin: Origin

  constructor(name: string, icon: string, component: Component, origin: Origin) {
    this.id = ++App.lastId
    this.name = name
    this.icon = icon
    this.component = markRaw(component)
    this.position = null
    this.origin = origin
  }
}

export const appList = [
  new App('About', AboutIcon, AboutApp, Origin.STARTMENU),
  new App('Calculator', CalculatorIcon, CalculatorApp, Origin.DESKTOP),
  new App('Notepad', NotepadIcon, NotepadApp, Origin.DESKTOP),
  new App('Calendar', CalendarIcon, CalendarApp, Origin.DESKTOP),
  new App('Email', EmailIcon, EmailApp, Origin.DESKTOP),
  new App('Browser', BrowserIcon, BrowserApp, Origin.DESKTOP),
  new App('Terminal', TerminalIcon, TerminalApp, Origin.DESKTOP),
  new App('File Explorer', FileExplorerIcon, FileExprorerApp, Origin.DESKTOP),
  new App('Stocks', StocksIcon, StocksApp, Origin.DESKTOP)
]
