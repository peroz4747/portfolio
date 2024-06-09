import { Origin } from './types'
import { markRaw, type Component } from 'vue'
import CalendarIcon from '@/assets/app-icons/calendar-icon.svg'
import EmailIcon from '@/assets/app-icons/email-icon.svg'
import FileExplorerIcon from '@/assets/app-icons/file-explorer-icon.svg'
import BrowserIcon from '@/assets/app-icons/browser-icon.svg'
import CalculatorIcon from '@/assets/app-icons/calculator-icon.svg'
import AboutIcon from '@/assets/app-icons/about-icon.svg'
import ProjectIcon from '@/assets/app-icons/project-icon.svg'
import NotepadIcon from '@/assets/app-icons/notepad-icon.svg'
import MapsIcon from '@/assets/app-icons/maps-icon.svg'
import GinaOSIcon from '@/assets/start-menu-icon.svg'
import GameIcon from '@/assets/app-icons/game-icon.svg'
import SkillsIcon from '@/assets/app-icons/skills-icon.svg'
import TestimonialsIcon from '@/assets/app-icons/testimonialIcon.svg'
import AchievementsIcon from '@/assets/app-icons/achievements-icon.svg'
import CVIcon from '@/assets/app-icons/cv-icon.svg'
import CalculatorApp from '@/components/desktop/apps/CalculatorApp.vue'
import NotepadApp from '@/components/desktop/apps/NotepadApp.vue'
import CalendarApp from '@/components/desktop/apps/CalendarApp.vue'
import EmailApp from '@/components/desktop/apps/EmailApp.vue'
import BrowserApp from '@/components/desktop/apps/BrowserApp.vue'
import FileExplorerApp from '@/components/desktop/apps/shared/FileExplorerApp.vue'
import MapsApp from '@/components/desktop/apps/MapsApp.vue'
import EurovisionProject from '@/components/desktop/apps/projects/EurovisionProject.vue'
import SplitSmartProject from '@/components/desktop/apps/projects/SplitSmartProject.vue'
import GinaOSProject from '@/components/desktop/apps/projects/GinaOSProject.vue'
import AboutGinaOS from '@/components/desktop/apps/documents/AboutGinaOS.vue'
import ObstacleJumper from '@/components/desktop/apps/games/ObstacleJumper.vue'
import SkillsShowcase from '@/components/desktop/apps/documents/SkillsShowcase.vue'
import TestimonialsShowcase from '@/components/desktop/apps/documents/TestimonialsShowcase.vue'
import DownloadCV from '@/components/desktop/apps/documents/DownloadCV.vue'
import AchievementsShowcase from '@/components/desktop/apps/documents/AchievementsShowcase.vue'
import AboutMe from '@/components/desktop/apps/documents/AboutMe.vue'

interface NestedApp {
  name: string
  icon: string
  component: Component
}

interface Shareable {
  Hobbies?: NestedApp[]
  Projects?: NestedApp[]
  Games?: NestedApp[]
}

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
    this.nestedApps = nestedApps ?? []
  }
}

const shareable: Shareable[] = [
  {
    Hobbies: [
      // coming soon ...
      // { name: 'Travel', icon: AboutIcon, component: AboutApp },
      // { name: 'Music', icon: AboutIcon, component: AboutApp },
      // { name: 'Fitness', icon: AboutIcon, component: AboutApp },
      // { name: 'Gardening', icon: AboutIcon, component: AboutApp },
      // { name: 'Cooking', icon: AboutIcon, component: AboutApp },
      // { name: 'Programming', icon: AboutIcon, component: AboutApp }
    ]
  },
  {
    Projects: [
      { name: 'Eurovision Ranking App', icon: ProjectIcon, component: EurovisionProject },
      { name: 'Split Smart App', icon: ProjectIcon, component: SplitSmartProject },
      { name: 'GinaOS', icon: ProjectIcon, component: GinaOSProject }
    ]
  },
  {
    Games: [
      { name: 'Obstacle Jumper', icon: GameIcon, component: ObstacleJumper }
      // coming soon ...
      // { name: 'Flappy Bird', icon: AboutIcon, component: AboutApp },
      // { name: 'Memory match', icon: AboutIcon, component: AboutApp },
      // { name: 'Tic-tac-toe', icon: AboutIcon, component: AboutApp },
      // { name: 'Pong', icon: AboutIcon, component: AboutApp },
      // { name: 'Basketball', icon: AboutIcon, component: AboutApp },
      // { name: 'Chess', icon: AboutIcon, component: AboutApp },
    ]
  }
]

const createShareableApp = (appName: keyof Shareable, origin: Origin) => {
  const foundApp = shareable.find((app) => app[appName] !== undefined)

  if (!foundApp) {
    throw new Error(`No shareable app found with the name ${appName}`)
  }

  const nestedApps = foundApp[appName]

  if (!nestedApps) {
    throw new Error(`No nested apps found for ${appName}`)
  }

  return new App(
    appName,
    FileExplorerIcon,
    FileExplorerApp,
    origin,
    nestedApps.map(
      (nestedApp) => new App(nestedApp.name, nestedApp.icon, nestedApp.component, Origin.DESKTOP)
    )
  )
}
export const appList = [
  new App('About GinaOS', GinaOSIcon, AboutGinaOS, Origin.STARTMENU),
  new App('About me', AboutIcon, AboutMe, Origin.STARTMENU),
  createShareableApp('Projects', Origin.STARTMENU),
  new App('Skills', SkillsIcon, SkillsShowcase, Origin.STARTMENU),
  new App('Testimonials', TestimonialsIcon, TestimonialsShowcase, Origin.STARTMENU),
  new App('Achievements', AchievementsIcon, AchievementsShowcase, Origin.STARTMENU),
  // createShareableApp('Hobbies', Origin.STARTMENU),
  new App('Download CV', CVIcon, DownloadCV, Origin.STARTMENU),
  new App('Calculator', CalculatorIcon, CalculatorApp, Origin.DESKTOP),
  new App('Notepad', NotepadIcon, NotepadApp, Origin.DESKTOP),
  new App('Calendar', CalendarIcon, CalendarApp, Origin.DESKTOP),
  new App('Email', EmailIcon, EmailApp, Origin.DESKTOP),
  new App('Browser', BrowserIcon, BrowserApp, Origin.DESKTOP),
  new App('Maps', MapsIcon, MapsApp, Origin.DESKTOP),
  createShareableApp('Projects', Origin.DESKTOP),
  createShareableApp('Games', Origin.DESKTOP)
  // createShareableApp('Hobbies', Origin.DESKTOP)
  // new App('Terminal', TerminalIcon, TerminalApp, Origin.DESKTOP)
]
