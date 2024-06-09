<template>
  <document-reader-app :app="app">
    <div>
      <header>
        <h1>Achievements</h1>
      </header>

      <section id="career-achievements">
        <h2>Career Achievements</h2>
        <ul>
          <li>
            Promoted to Senior Technical Support Specialist at Celtra within one year of joining
          </li>
          <li>
            Successfully led a project to improve customer support efficiency, resulting in a 20%
            reduction in response time
          </li>
          <li>
            Developed and implemented a new training program for junior technical support staff
          </li>
        </ul>
      </section>

      <section id="academic-achievements">
        <h2>Academic Achievements</h2>
        <ul>
          <li>Graduated with a master's degree in economics from the University of Ljubljana</li>
          <li>
            Published a research paper on the impact of technology on economic growth in a reputed
            journal
          </li>
          <li>Received the Dean's Award for academic excellence</li>
        </ul>
      </section>

      <section id="personal-achievements">
        <h2>Personal Achievements</h2>
        <ul>
          <li>Successfully completed a full-stack development bootcamp</li>
          <li>Played bass and guitar in a punk rock band, performing at various local venues</li>
          <li>Completed a skydiving course and several solo jumps</li>
        </ul>
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
