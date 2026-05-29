<template>
  <document-reader-app :app="app">
    <div class="skills-container">
      <section v-for="category in skills" :key="category.title">
        <h2>{{ category.title }}</h2>
        <ul>
          <li v-for="skill in category.items" :key="skill.name">
            <strong>{{ skill.name }}:</strong>
            <div class="stars">
              <span v-for="n in 10" :key="n" class="star" :class="{ filled: n <= skill.level }"
                >★</span
              >
            </div>
          </li>
        </ul>
      </section>
    </div>
  </document-reader-app>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import DocumentReaderApp from '../shared/DocumentReaderApp.vue'
import { ref } from 'vue'

const props = defineProps<{
  app: OpenedApp
}>()

const app = props.app

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  title: string
  items: Skill[]
}

const skills = ref<SkillCategory[]>([
  {
    title: 'Military & Leadership',
    items: [
      { name: 'Personnel Leadership', level: 8 },
      { name: 'Operational Planning', level: 7 },
      { name: 'Risk Assessment', level: 7 },
      { name: 'Training & Mentoring', level: 8 },
      { name: 'Communications Systems', level: 8 }
    ]
  },
  {
    title: 'Cybersecurity & Infrastructure',
    items: [
      { name: 'Linux', level: 8 },
      { name: 'Networking', level: 7 },
      { name: 'Docker', level: 7 },
      { name: 'Git', level: 8 },
      { name: 'Virtualization', level: 7 },
      { name: 'Homelab Administration', level: 8 }
    ]
  },
  {
    title: 'Software Development',
    items: [
      { name: 'Java', level: 8 },
      { name: 'JavaScript', level: 8 },
      { name: 'Python', level: 7 },
      { name: 'SQL', level: 7 },
      { name: 'Spring Boot', level: 7 },
      { name: 'Full-Stack Development', level: 8 }
    ]
  },
  {
    title: 'Frontend Development',
    items: [
      { name: 'HTML', level: 9 },
      { name: 'CSS', level: 8 },
      { name: 'Angular', level: 7 },
      { name: 'React', level: 7 },
      { name: 'Vue', level: 7 }
    ]
  },
  {
    title: 'Technical Support',
    items: [
      { name: 'Troubleshooting', level: 9 },
      { name: 'Zendesk', level: 9 },
      { name: 'Customer Support', level: 9 },
      { name: 'Technical Documentation', level: 8 },
      { name: 'Process Improvement', level: 8 }
    ]
  },
  {
    title: 'Languages',
    items: [
      { name: 'Slovenian', level: 10 },
      { name: 'English', level: 9 },
      { name: 'Croatian', level: 7 },
      { name: 'German', level: 4 }
    ]
  }
])
</script>

<style scoped>
.skills-container {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

section {
  margin-bottom: 20px;
}

h2 {
  background-color: #f4f4f4;
  padding: 10px;
  border-left: 5px solid #007bff;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

li strong {
  display: inline-block;
  width: 200px;
}

.stars {
  display: flex;
}

.star {
  font-size: 20px;
  color: #ddd;
}

.star.filled {
  color: #ffd700;
}
</style>
