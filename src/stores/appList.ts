import { Origin } from './types'
import { markRaw, type Component } from 'vue'
import CalendarIcon from '@/assets/app-icons/calendar-icon.svg'
import EmailIcon from '@/assets/app-icons/email-icon.svg'
import FileExplorerIcon from '@/assets/app-icons/file-explorer-icon.svg'
import BrowserIcon from '@/assets/app-icons/browser-icon.svg'
import TerminalIcon from '@/assets/app-icons/terminal-icon.svg'
import CalculatorIcon from '@/assets/app-icons/calculator-icon.svg'
import AboutIcon from '@/assets/app-icons/about-icon.svg'
import NotepadIcon from '@/assets/app-icons/notepad-icon.svg'
import MapsIcon from '@/assets/app-icons/maps-icon.svg'
import CalculatorApp from '@/components/desktop/apps/CalculatorApp.vue'
import NotepadApp from '@/components/desktop/apps/NotepadApp.vue'
import AboutApp from '@/components/desktop/apps/AboutApp.vue'
import CalendarApp from '@/components/desktop/apps/CalendarApp.vue'
import EmailApp from '@/components/desktop/apps/EmailApp.vue'
import BrowserApp from '@/components/desktop/apps/BrowserApp.vue'
import TerminalApp from '@/components/desktop/apps/TerminalApp.vue'
import FileExprorerApp from '@/components/desktop/apps/shared/FileExprorerApp.vue'
import MapsApp from '@/components/desktop/apps/MapsApp.vue'
import EurovisionProject from '@/components/desktop/apps/projects/EurovisionProject.vue'
import SplitSmartProject from '@/components/desktop/apps/projects/SplitSmartProject.vue'
import GinaOSProject from '@/components/desktop/apps/projects/GinaOSProject.vue'
import AboutGinaOS from '@/components/desktop/apps/documents/AboutGinaOS.vue'

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
  nestedApps: App[]

  constructor(
    name: string,
    icon: string,
    component: Component,
    origin: Origin,
    nestedApps?: App[]
  ) {
    this.id = ++App.lastId
    this.name = name
    this.icon = icon
    this.component = markRaw(component)
    this.position = null
    this.origin = origin
    this.nestedApps = nestedApps ?? null
  }
}

export const appList = [
  new App('About GinaOS', AboutIcon, AboutGinaOS, Origin.STARTMENU),
  new App('About me', AboutIcon, AboutApp, Origin.STARTMENU),
  new App('Projects', FileExplorerIcon, FileExprorerApp, Origin.STARTMENU, [
    new App('Eurovision Ranking App', AboutIcon, EurovisionProject, Origin.DESKTOP),
    new App('Split Smart App', AboutIcon, SplitSmartProject, Origin.DESKTOP),
    new App('GinaOS', AboutIcon, GinaOSProject, Origin.DESKTOP)
  ]),
  new App('Skills', AboutIcon, AboutApp, Origin.STARTMENU),
  new App('Testimonials', AboutIcon, AboutApp, Origin.STARTMENU),
  new App('Achievements', AboutIcon, AboutApp, Origin.STARTMENU),
  new App('Hobbies', FileExplorerIcon, FileExprorerApp, Origin.STARTMENU, [
    new App('Travel', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Music', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Fitness', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Gardening', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Cooking', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Programming', AboutIcon, AboutApp, Origin.DESKTOP)
  ]),
  new App('CV', AboutIcon, AboutApp, Origin.STARTMENU),
  new App('Calculator', CalculatorIcon, CalculatorApp, Origin.DESKTOP),
  new App('Notepad', NotepadIcon, NotepadApp, Origin.DESKTOP),
  new App('Calendar', CalendarIcon, CalendarApp, Origin.DESKTOP),
  new App('Email', EmailIcon, EmailApp, Origin.DESKTOP),
  new App('Browser', BrowserIcon, BrowserApp, Origin.DESKTOP),
  new App('Maps', MapsIcon, MapsApp, Origin.DESKTOP),
  new App('Dev Projects', FileExplorerIcon, FileExprorerApp, Origin.DESKTOP, [
    new App('Eurovision Ranking App', AboutIcon, EurovisionProject, Origin.DESKTOP),
    new App('Split Smart App', AboutIcon, SplitSmartProject, Origin.DESKTOP),
    new App('GinaOS', AboutIcon, GinaOSProject, Origin.DESKTOP)
  ]),
  new App('Games', FileExplorerIcon, FileExprorerApp, Origin.DESKTOP, [
    new App('Jumper', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Flappy Bird', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Memory match', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Tic-tac-toe', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Pong', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Basketball', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Chess', AboutIcon, AboutApp, Origin.DESKTOP)
  ]),
  new App('Hobbies', FileExplorerIcon, FileExprorerApp, Origin.DESKTOP, [
    new App('Travel', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Music', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Fitness', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Gardening', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Cooking', AboutIcon, AboutApp, Origin.DESKTOP),
    new App('Programming', AboutIcon, AboutApp, Origin.DESKTOP)
  ]),
  new App('Terminal', TerminalIcon, TerminalApp, Origin.DESKTOP)
]
