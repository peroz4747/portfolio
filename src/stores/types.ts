import type { Component } from 'vue'

export type State = {
  desktopLoaded: boolean
  appList: App[]
  draggedItem: App | null
  openedAppWindows: OpenedApp[]
  desktopGridRef: HTMLElement | null
  currentTime: string
  appsGroupedByName: AppgGroupedByName[]
  sessionHistory: SessionHistory[]
  startMenuOpened: boolean
}

export type App = {
  id: number
  name: string
  icon: string
  component: Component
  position: {
    top: string
    left: string
  } | null
  origin: Origin
}

export type OpenedApp = App & {
  size: {
    width: string
    height: string
  }
  transition: string
  transitioned: boolean
  prevAppSizeAndPosition: {
    position: {
      top: string
      left: string
    }
    size: {
      width: string
      height: string
    }
  } | null
  dragDiff: {
    y: number
    x: number
  } | null
  resizeObserver: ResizeObserver | null
}

export type AppgGroupedByName = {
  name: string
  apps: OpenedApp[]
}

export type AppInstance = {
  id: number
  name: string
  icon: string
}

export type AppGroup = {
  appName: string
  appIcon: string
  appInstances: AppInstance[]
}

export type SessionHistory = {
  time: DOMHighResTimeStamp
  event: EventTypes
  app: OpenedApp
}

export enum EventTypes {
  OPENED = 'OPENED',
  MINIMISED = 'MINIMISED',
  FULLSCREEN = 'FULLSCREEN',
  DRAGSTART = 'DRAGSTART',
  DRAGING = 'DRAGING',
  DRAGEND = 'DRAGEND',
  RESIZE = 'RESIZE',
  CLOSED = 'CLOSED'
}

export enum Origin {
  DESKTOP = 'DESKTOP',
  STARTMENU = 'START MENU'
}
