<template>
  <app-wrapper :app="props.app" :width="500" :height="400">
    <div class="game-container" @click="jump">
      <div class="score">Score: {{ score }}</div>
      <div class="high-score">High score: {{ highScore }}</div>
      <div v-if="!isRunning" class="start-message">Press Space to Start/Restart</div>
      <div class="t-rex" :class="{ jump: isJumping }"></div>
      <div
        v-for="obstacle in obstacles"
        :key="obstacle.id"
        class="obstacle"
        :style="{ left: obstacle.position + 'px' }"
      ></div>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { OpenedApp } from '@/stores/types'
import AppWrapper from '../shared/AppWrapper.vue'

const props = defineProps<{
  app: OpenedApp
}>()

interface Obstacle {
  id: number
  position: number
  passed?: boolean // Optional property to mark if the obstacle is passed
}

const isJumping = ref(false)
const isRunning = ref(false)
const obstacles = ref<Obstacle[]>([])
const gameInterval = ref()
const speed = ref(10)
const obstacleCounter = ref(0)
const score = ref(0)
const highScore = ref(Number(localStorage.getItem('highScore')) || 0) // Initialize highScore from localStorage

const jump = () => {
  if (!isJumping.value && isRunning.value) {
    isJumping.value = true
    setTimeout(() => {
      isJumping.value = false
    }, 500)
  }
}

const createObstacle = () => {
  const lastObstacle = obstacles.value[obstacles.value.length - 1]
  if (!lastObstacle || lastObstacle.position < 600) {
    obstacles.value.push({ id: obstacleCounter.value++, position: 1000 })
  }
}

const startGame = () => {
  isRunning.value = true
  score.value = 0
  obstacles.value = []
  speed.value = 10
  obstacleCounter.value = 0

  gameInterval.value = setInterval(() => {
    obstacles.value.forEach((obstacle) => {
      obstacle.position -= speed.value
    })

    obstacles.value = obstacles.value.filter((obstacle) => obstacle.position > -20)

    if (obstacles.value.length < 3 && Math.random() > 0.95) {
      createObstacle()
    }

    speed.value += 0.01

    obstacles.value.forEach((obstacle) => {
      if (obstacle.position < 90 && obstacle.position > 50 && !isJumping.value) {
        clearInterval(gameInterval.value)
        isRunning.value = false
        // Store highScore in localStorage
        localStorage.setItem('highScore', String(highScore.value))
      } else if (obstacle.position <= 50 && !obstacle.passed) {
        score.value++
        obstacle.passed = true // Mark obstacle as passed
        if (score.value > highScore.value) {
          highScore.value = score.value
        }
      }
    })
  }, 50)
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    if (!isRunning.value) {
      startGame()
    } else {
      jump()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
  clearInterval(gameInterval.value)
})
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;
}

.score {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  font-weight: bold;
}

.high-score {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
}

.start-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #000;
}

.t-rex {
  position: absolute;
  bottom: 0;
  left: 50px;
  width: 40px;
  height: 40px;
  background-color: #000;
  transition: bottom 0.2s;
}

.t-rex.jump {
  bottom: 80px;
}

.obstacle {
  position: absolute;
  bottom: 0;
  width: 20px;
  height: 40px;
  background-color: red;
  transition: 0.1s;
}
</style>
