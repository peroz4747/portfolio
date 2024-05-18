import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { type App, type AppGroup, type OpenedApp, type State, EventTypes, Origin } from './types'
import cloneDeep from 'lodash.clonedeep'
import { appList } from './appList'
/**
 *
 * NAME IDEAS:
 * NexaOS
 * GinaOS
 * TODO:
 * dragging starts to lag exponentially
 * start menu icon
 *
 * BUGS:
 * transitions should be set on minimise and fullscreen
 *
 */

export const useDesktopAppStore = defineStore('desktopApp', {
  state: (): State => ({
    desktopLoaded: true,
    appList,
    draggedItem: null,
    openedAppWindows: [],
    desktopGridRef: null,
    currentTime: '',
    appsGroupedByName: [],
    sessionHistory: [],
    startMenuOpened: false
  }),
  actions: {
    logHistory(app: OpenedApp, event: EventTypes) {
      this.sessionHistory.push({
        time: performance.now(),
        event: event,
        app: cloneDeep(app)
      })
    },
    calculateAppGrid(elementRef: HTMLElement): void {
      this.desktopGridRef = elementRef
      const maxHeight = elementRef.clientHeight
      const appBoxSize = {
        height: 100,
        width: 80
      }

      const numRows = Math.floor(maxHeight / appBoxSize.height)

      elementRef.style.setProperty('--num-rows', numRows.toString())
      elementRef.style.setProperty('--app-box-height', `${appBoxSize.height}px`)
      elementRef.style.setProperty('--app-box-width', `${appBoxSize.width}px`)
    },
    dragStart(event: DragEvent, item: App) {
      if (!event.dataTransfer) return
      this.draggedItem = item
      event.dataTransfer.effectAllowed = 'move'
    },
    allowDrop(event: DragEvent) {
      event.preventDefault()
    },
    drop(event: DragEvent) {
      if (!this.desktopGridRef) return
      event.preventDefault()
      const desktopGridRect = this.desktopGridRef.getBoundingClientRect()
      const x = event.clientX - desktopGridRect.left
      const y = event.clientY - desktopGridRect.top

      if (this.draggedItem) {
        this.handleDropOnEmptySpace(this.draggedItem, x, y)
      }

      this.draggedItem = null
    },
    onAppStart(app: OpenedApp, appWrapper: HTMLElement) {
      this.logHistory(app, EventTypes.OPENED)
      appWrapper.classList.replace('unopened', 'opened')
      appWrapper.style.width = app.size.width
      appWrapper.style.height = app.size.height
    },
    handleDropOnEmptySpace(item: App, x: number, y: number) {
      const index = this.appList.findIndex((app) => app.id === item.id)
      this.appList[index].position = {
        top: `${y}px`,
        left: `${x}px`
      }
    },
    handleOpenApp(openedApp: App): void {
      if (!this.desktopGridRef) return
      const openedAppIndex = this.appList.findIndex((app) => app.id === openedApp.id)
      const appCopy = this.appList[openedAppIndex]

      const reactiveAppCopy = reactive({
        id: this.openedAppWindows.length,
        name: appCopy.name,
        icon: appCopy.icon,
        component: appCopy.component,
        position: {
          top: `${this.desktopGridRef.clientHeight * 0.3 - this.openedAppWindows.length * 10}px`,
          left: `${this.desktopGridRef.clientWidth * 0.2 + this.openedAppWindows.length * 10}px`
        },
        size: {
          width: '0px',
          height: '0px'
        },
        transition: '0.5s',
        transitioned: false,
        prevAppSizeAndPosition: null,
        dragDiff: null,
        resizeObserver: null
      }) as OpenedApp

      this.openedAppWindows.push(reactiveAppCopy)
    },
    handleTransitionEnd(app: OpenedApp, appWrapper: HTMLElement | null, event: TransitionEvent) {
      if (event.propertyName === 'opacity') {
        this.disableTransition(app)
        this.handleAppResize(app, appWrapper)
      }
      if (event.propertyName === 'height') {
        this.disableTransition(app)
      }
    },
    enableTransition(app: OpenedApp) {
      app.transitioned = false
      app.transition = '0.5s'
    },
    disableTransition(app: OpenedApp) {
      app.transitioned = true
      app.transition = '0s'
    },
    handleAppFullScreen(app: OpenedApp): void {
      if (!this.desktopGridRef) return
      if (
        app.size.height === `${this.desktopGridRef.clientHeight}px` &&
        app.size.width === `${this.desktopGridRef.clientWidth}px` &&
        app.prevAppSizeAndPosition
      ) {
        app.size = app.prevAppSizeAndPosition.size
        app.position = app.prevAppSizeAndPosition.position
      } else {
        this.logHistory(app, EventTypes.FULLSCREEN)
        if (app.position) {
          app.prevAppSizeAndPosition = {
            size: {
              height: app.size.height,
              width: app.size.width
            },
            position: {
              top: app.position.top,
              left: app.position.left
            }
          }
          app.size = {
            height: `${this.desktopGridRef.clientHeight}px`,
            width: `${this.desktopGridRef.clientWidth}px`
          }
          app.position = {
            top: '0px',
            left: '0px'
          }
        }
      }
    },
    handleAppMinimise(app: OpenedApp): void {
      if (!this.desktopGridRef) return
      this.logHistory(app, EventTypes.MINIMISED)
      app.size = {
        height: '0px',
        width: '0px'
      }
      app.position = {
        top: `${this.desktopGridRef.clientHeight}px`,
        left: '0px'
      }
    },
    hadnleAppClose(app: OpenedApp): void {
      this.logHistory(app, EventTypes.CLOSED)
      const appIndex = this.openedAppWindows.findIndex((openedApp) => openedApp.id === app.id)
      this.openedAppWindows.splice(appIndex, 1)
    },
    handleDragStart(app: OpenedApp, x: number, y: number): void {
      this.logHistory(app, EventTypes.DRAGSTART)
      if (app.position) {
        const currentTop = parseInt(app.position.top)
        const currentLeft = parseInt(app.position.left)
        const yDiff = y - currentTop
        const xDiff = x - currentLeft
        app.dragDiff = {
          y: yDiff,
          x: xDiff
        }
      }
    },
    handleAppMove(app: OpenedApp, x: number, y: number): void {
      this.logHistory(app, EventTypes.DRAGING)
      if (app.dragDiff) {
        app.position = {
          top: `${y - app.dragDiff.y}px`,
          left: `${x - app.dragDiff.x}px`
        }
      }
    },
    handleDragEnd(app: OpenedApp): void {
      this.logHistory(app, EventTypes.DRAGEND)
    },
    handleAppResize(app: OpenedApp, appWrapper: HTMLElement | null): void {
      if (!appWrapper) return
      const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        if (entries.length > 0) {
          const { width, height } = entries[0].contentRect
          this.updateAppSize(app, height, width)
        }
      })
      app.resizeObserver = resizeObserver
      resizeObserver.observe(appWrapper)
    },
    cleanUpAppListeners(app: OpenedApp, appWrapper: HTMLElement | null): void {
      if (appWrapper && app.resizeObserver) {
        app.resizeObserver.unobserve(appWrapper)
      }
    },
    updateAppSize(app: OpenedApp, height: number, width: number) {
      this.logHistory(app, EventTypes.RESIZE)
      app.size = {
        height: `${height}px`,
        width: `${width}px`
      }
    },
    getCurrentTime(): void {
      const currentTime = new Date()

      const hours = (currentTime.getHours() < 10 ? '0' : '') + currentTime.getHours()
      const minutes = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes()

      this.currentTime = hours + ':' + minutes
    },
    getAppsGroupedByComponent(): AppGroup[] {
      if (!this.openedAppWindows) {
        return []
      }

      const groups: { [key: string]: AppGroup } = this.openedAppWindows.reduce(
        (acc: { [key: string]: AppGroup }, app: App) => {
          if (!acc[app.name]) {
            acc[app.name] = {
              appName: app.name,
              appIcon: app.icon,
              appInstances: []
            }
          }
          acc[app.name].appInstances.push(app)
          return acc
        },
        {}
      )

      return Object.values(groups)
    },
    handleNavBarAppIconClick(app: AppGroup) {
      const pastEventsArray = this.sessionHistory.filter(
        (h) =>
          app.appInstances.map((ai) => ai.id).includes(h.app.id) && h.event === EventTypes.MINIMISED
      )
      const undoInstance = pastEventsArray[pastEventsArray.length - 1].app

      const appInstance = this.openedAppWindows.find((a) => a.id === undoInstance.id)

      if (appInstance) {
        this.logHistory(appInstance, EventTypes.OPENED)
        appInstance.size = undoInstance.size
        appInstance.position = undoInstance.position
      }
    },
    handleStartMenuIconClick() {
      this.startMenuOpened = !this.startMenuOpened
    }
  },
  getters: {
    getStartMenuApps(state: State): App[] {
      return state.appList.filter((app) => app.origin === Origin.STARTMENU)
    },
    getDesktopApps(state: State): App[] {
      return state.appList.filter((app) => app.origin === Origin.DESKTOP)
    }
  }
})
