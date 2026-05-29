<template>
  <document-reader-app :app="app">
    <div>
      <header>
        <h1>About Me</h1>
      </header>

      <section id="introduction">
        <h2>Introduction</h2>
        <p>
          Welcome to my portfolio. My name is Peter Zupanc, a Military Officer in
          the Slovenian Armed Forces with a background in software development,
          enterprise technical support, and information systems. I hold a Master
          of Science degree in Information Management and Informatics and have
          several years of experience working in technology-focused environments.
        </p>

        <p>
          Throughout my career, I have combined technical expertise with
          leadership and problem-solving. My experience ranges from software
          development and enterprise support to military communications and
          operational planning. I am passionate about learning new technologies
          and continuously improving my skills.
        </p>
      </section>

      <section id="background">
        <h2>Background</h2>
        <p>
          Currently serving in a communications unit within the Slovenian Armed
          Forces, I work with communications and information systems while also
          leading personnel and supporting operational readiness. My professional
          background allows me to bridge the gap between technology and leadership.
        </p>

        <p>
          Before joining the military, I worked as a Full Stack Developer and
          later as a Senior Technical Support Engineer, gaining valuable
          experience in software development, customer support, troubleshooting,
          and process improvement.
        </p>
      </section>

      <section id="interests">
        <h2>Interests</h2>
        <p>
          Outside of work, I enjoy exploring cybersecurity, homelab
          technologies, Linux systems, networking, virtualization, artificial
          intelligence, and software-defined radio (SDR). I maintain a personal
          homelab environment where I experiment with self-hosted services,
          Docker containers, virtualization platforms, and infrastructure
          technologies.
        </p>

        <p>
          I am also interested in new technologies, communications systems,
          outdoor activities, and continuous learning through personal projects
          and technical research.
        </p>
      </section>

      <section id="invitation">
        <h2>Let's Connect</h2>
        <p>
          Thank you for visiting my portfolio. Here you can explore my projects,
          skills, and professional experience. Whether you are interested in
          technology, cybersecurity, communications systems, or potential
          collaboration opportunities, I would be glad to connect and exchange
          ideas.
        </p>

        <p>
          Feel free to reach out through any of the contact channels listed in
          this portfolio.
        </p>
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
