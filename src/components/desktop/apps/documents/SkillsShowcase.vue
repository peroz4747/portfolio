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
    title: 'Technical Skills',
    items: [
      { name: 'Java', level: 8 },
      { name: 'JavaScript', level: 8 },
      { name: 'HTML', level: 9 },
      { name: 'CSS', level: 8 },
      { name: 'SQL (Postgresql)', level: 7 },
      { name: 'Angular', level: 7 },
      { name: 'React', level: 7 },
      { name: 'Vue', level: 7 },
      { name: 'Pinia', level: 8 },
      { name: 'Redux', level: 6 },
      { name: 'Spring (Spring Boot, Spring Junit)', level: 7 },
      { name: 'Docker', level: 6 },
      { name: 'Jenkins', level: 6 },
      { name: 'Git', level: 8 },
      { name: 'WordPress', level: 7 },
      { name: 'Zendesk', level: 9 }
    ]
  },
  {
    title: 'Software Development',
    items: [
      { name: 'Full-stack development', level: 8 },
      { name: 'Custom solution development', level: 8 },
      { name: 'Debugging', level: 9 },
      { name: 'Internal tool development', level: 7 }
    ]
  },
  {
    title: 'Web Development',
    items: [
      { name: 'Responsive UX/UI Design', level: 7 },
      { name: 'Advanced JavaScript (jQuery)', level: 8 },
      { name: 'SEO Optimization', level: 6 },
      { name: 'Online Shop Management', level: 6 }
    ]
  },
  {
    title: 'Technical Support',
    items: [
      { name: 'Handling complex support tickets', level: 9 },
      { name: 'Technical documentation', level: 8 },
      { name: 'Mentoring and training', level: 8 },
      { name: 'Client support management', level: 8 }
    ]
  },
  {
    title: 'Project Management',
    items: [
      { name: 'Leading projects', level: 7 },
      { name: 'Team workflow optimization', level: 7 },
      { name: 'Mentoring and reviewing', level: 8 }
    ]
  },
  {
    title: 'Languages',
    items: [
      { name: 'Slovenian', level: 10 },
      { name: 'English', level: 9 },
      { name: 'Serbo-Croatian', level: 7 },
      { name: 'Italian', level: 4 },
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
