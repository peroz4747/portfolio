<template>
  <div class="loading-wrapper" ref="loadingWrapper">
    <div class="loading-grid">
      <div class="os-icon-text-wrapper">
        <h3 class="ginaos-text" ref="ginaText">Gina</h3>
        <img class="loading-spinner" src="../../assets/start-menu-icon.svg" ref="spinner" />
        <h3 class="ginaos-text" ref="osText">S</h3>
      </div>
      <div class="loading-text" ref="loadingText">
        <h3>LOADING ...</h3>
        <p>
          Welcome to my personal portfolio project inspired by my dog Gina with the goal to showcase
          my development skills
        </p>
      </div>
    </div>
    <div class="mobile-message">
      <p>
        While the app will still work, I recommend visiting the site on a desktop instead for a more
        streamlined experience.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesktopAppStore } from '@/stores/desktopApp'
import { storeToRefs } from 'pinia'
import { ref, type Ref, onMounted } from 'vue'

const loadingText: Ref<HTMLImageElement | null> = ref(null)
const loadingWrapper: Ref<HTMLImageElement | null> = ref(null)
const spinner: Ref<HTMLImageElement | null> = ref(null)
const ginaText: Ref<HTMLHeadingElement | null> = ref(null)
const osText: Ref<HTMLHeadingElement | null> = ref(null)

const desktopAppStore = useDesktopAppStore()
const { desktopLoaded } = storeToRefs(desktopAppStore)

onMounted(() => {
  if (spinner.value) {
    spinner.value.addEventListener('animationend', () => {
      if (ginaText.value && osText.value && loadingText.value) {
        ginaText.value.style.opacity = '1'
        osText.value.style.opacity = '1'
        loadingText.value.style.opacity = '0'
        setTimeout(() => {
          spinner.value?.classList.add('zoom-in')
          loadingWrapper.value?.classList.add('dissolve')
        }, 1000)
        setTimeout(() => {
          desktopLoaded.value = true
        }, 4000)
      }
    })
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

.loading-wrapper {
  margin: auto;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #000;
  color: #fff;
  position: fixed;
}

.loading-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  width: 75px;
  height: 75px;
  font-size: medium;
  font-family: sans-serif;
  animation: rotate 3s linear;
}

.loading-text {
  width: 300px;
  transition: opacity 1s;
}

.loading-text > p {
  font-family: 'Open Sans', sans-serif;
}

.os-icon-text-wrapper {
  font-size: 50pt;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.ginaos-text {
  opacity: 0;
  transition: opacity 1s;
}

.zoom-in {
  animation: zoom 3s forwards;
}

.dissolve {
  animation: dissolve 3s forwards;
}

h3 {
  margin: 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
    margin-right: 250px;
  }
  100% {
    transform: rotate(1080deg);
  }
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1000);
  }
}

@keyframes dissolve {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.mobile-message {
  display: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #000000;
  text-align: center;
  margin-top: 20px;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
  width: 80%;
  background: yellowgreen;
  padding: 10px;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .mobile-message {
    display: block;
  }
}
</style>
