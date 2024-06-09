<template>
  <document-reader-app :app="app">
    <div>
      <header>
        <h1>About Me</h1>
      </header>

      <section id="introduction">
        <h2>Introduction</h2>
        <p>
          Welcome to my portfolio! I'm Peter Zupanc, a dedicated professional with a master's degree
          in economics and a passion for technology. I currently serve as a Senior Technical Support
          Specialist at Celtra in Ljubljana, a role I've embraced since May 2022. My journey in the
          tech world started as a full-stack engineer, where I spent a year and a half honing my
          skills before moving into technical support. I thrive on problem-solving and staying
          current with the latest advancements in programming and technology.
        </p>
      </section>

      <section id="background">
        <h2>Background</h2>
        <p>
          Originally from Maribor, Slovenia, I now live in a cozy apartment with my poodle, Gina. My
          professional background is complemented by a rich personal life, where I channel my
          creativity into music, playing bass and guitar in a punk rock band. This blend of
          technical and creative pursuits defines who I am.
        </p>
      </section>

      <section id="experiences">
        <h2>Memorable Experiences</h2>
        <p>
          One of the most memorable experiences in my life was a skydiving adventure that went awry,
          but my reserve parachute saved me, underscoring my resilience and composure under
          pressure. I aim to bring this same level of dedication and calm to every project I
          undertake.
        </p>
      </section>

      <section id="invitation">
        <h2>Invitation</h2>
        <p>
          I invite you to explore my portfolio, where you'll find a showcase of my projects, skills,
          and achievements. Whether you're here to learn more about my professional journey or to
          connect over shared interests, I welcome you to reach out. Let's chat about technology,
          music, or any exciting opportunities you might have in mind!
        </p>

        <p>Thank you for visiting!</p>
      </section>
    </div>
  </document-reader-app>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import DocumentReaderApp from '../shared/DocumentReaderApp.vue'

const props = defineProps<{
  app: OpenedApp
}>()

const app = props.app
</script>

<style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  text-align: center;
}
section {
  background-color: #fff;
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #333;
}
p {
  line-height: 1.6;
}
ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>
