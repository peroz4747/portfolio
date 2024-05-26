<template>
  <document-reader-app :app="app">
    <div>
      <header>
        <h1>About GinaOS</h1>
      </header>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          GinaOS is a web-based operating system designed to mimic the look and feel of a
          traditional desktop environment. Inspired by my dog, Gina, this project aims to showcase
          my skills in web development and provide an interactive experience for visitors.
        </p>
      </section>

      <section id="features">
        <h2>Features</h2>
        <ul>
          <li>Desktop-like interface with draggable windows and icons</li>
          <li>Start Menu with access to various sections of the portfolio</li>
          <li>Responsive design for seamless experience on all devices</li>
          <li>Customizable themes and settings</li>
        </ul>
      </section>

      <section id="technologies">
        <h2>Technologies Used</h2>
        <ul>
          <li>HTML, CSS, and JavaScript for the front-end</li>
          <li>React.js for building the user interface</li>
          <li>Node.js and Express for the back-end</li>
          <li>MongoDB for database management</li>
          <li>Webpack for module bundling</li>
        </ul>
      </section>

      <section id="development-process">
        <h2>Development Process</h2>
        <p>The development of GinaOS involved several stages:</p>
        <ul>
          <li>Planning and Design: Outlining the features and creating wireframes</li>
          <li>Front-end Development: Building the user interface with Vue + Typescript</li>
          <li>Testing: Conducting thorough testing to ensure a smooth user experience</li>
          <li>Deployment: Deploying the application to a Netlify for public access</li>
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
