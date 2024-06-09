<template>
  <app-wrapper :app="props.app" :width="550" :height="350">
    <div class="testimonial-gallery-wrapper">
      <div class="testimonial-gallery" @touchstart="touchStart" @touchend="touchEnd">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial"
          v-show="currentTestimonialIndex === index"
        >
          <p>{{ testimonial }}</p>
        </div>

        <div class="progress-indicator">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="progress-dot"
            :class="{ active: currentTestimonialIndex === index }"
          ></div>
        </div>
        <button @click="prevTestimonial">Previous</button>
        <button @click="nextTestimonial">Next</button>
      </div>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import type { OpenedApp } from '@/stores/types'
import AppWrapper from '../shared/AppWrapper.vue'
import { ref } from 'vue'

const props = defineProps<{
  app: OpenedApp
}>()

const testimonials = ref([
  'Awsome support was always at least half of the satisfaction working with you. Thumbs up, stay always like this, be the best!',
  'Peter was able to provided a helpful explanation to help resolve my issue',
  'Peter has always been really helpful and quick to respond in any enquiries I’ve had.',
  'Peter answered my concern instantly. He gave a proper explanation regarding my problem. Thank you',
  'Peter was very helpful, he never gave up on the case until it is solved. Thank you.',
  'Peter Zupanc is always very helpful every time I need anything, and Andy also provides great support.',
  'Peter has been most helpful throughout the whole process. Much appreciated',
  'Peter was very helpful once I explained my needs more clearly and I was able to generate and render test tag as requested. Responses were fast and I could resolve my query same day. Thanks Peter!',
  'Peter is always super helpful :)',
  'Peter was super fast in responding and solved the problem immediately.',
  'It was perfect! Thank you, Peter!',
  'Peter is so helpful all the time! He always provides detailed answers to all of our questions and he knows everything. Our team loves Peter!! Thanks again :)',
  'Peter is always very quick to reply with a good level of detail',
  'Peter has been incredibly helpful. I really appreciated his guidance and quick response in explaining newer aspects of Celtra I’d been struggling with.',
  'Thanks for your advice Peter. Great help as ever!',
  'Peter is always very responsive and provides not only a solution, but also an explanation for whatever the issue is.',
  'I greatly appreciate the assistance on this project. Peter was beyond helpful in helping us take this idea to the place we wanted it to be. Thanks again Peter.',
  'Peter was brilliant and I can’t thank him enough for his help. He was succinct, explained everything beautifully and went out his way to help me with my issue. Amazing support!',
  'The issue was resolved quickly and Peter helped to keep me informed about what was happening',
  'Peter was super quick with the response and very informative with the solution he supplied. He was very helpful and made the experience very pleasant. Kudos to you Peter! Amazing work! Thank you again! :)',
  'Peter helped me to resolve my problem!',
  'Peter replied really quickly and with a very clear solution. Thanks!',
  'Peter was amazingly fast & helpful with his replays, as he always is! Truly an amazing support experience every time!',
  'Simply amazing, I can’t even describe how happy I am every time Peter comes out with those outstanding solutions. Great job!',
  'Peter is a professional. Always received good service and tips from him!',
  'Thanks to Peter for the swift support!'
])

const currentTestimonialIndex = ref(0)
const startX = ref(0)

function prevTestimonial() {
  currentTestimonialIndex.value =
    currentTestimonialIndex.value > 0
      ? currentTestimonialIndex.value - 1
      : testimonials.value.length - 1
}

function nextTestimonial() {
  currentTestimonialIndex.value =
    currentTestimonialIndex.value < testimonials.value.length - 1
      ? currentTestimonialIndex.value + 1
      : 0
}

function touchStart(event: TouchEvent) {
  startX.value = event.touches[0].clientX
}

function touchEnd(event: TouchEvent) {
  const endX = event.changedTouches[0].clientX
  if (startX.value > endX + 50) {
    nextTestimonial()
  } else if (startX.value < endX - 50) {
    prevTestimonial()
  }
}
</script>

<style scoped>
.testimonial-gallery-wrapper {
  background: rgb(112, 112, 112);
  height: 100%;
  width: 100%;
}

.testimonial-gallery {
  max-width: 600px;
  margin: auto;
  text-align: center;
  position: relative;
  padding: 30px;
}

.testimonial {
  display: block;
  min-height: 160px;
}

.testimonial p {
  font-size: 1.2em;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin: 0;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.progress-indicator {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.progress-dot {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #ccc;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.progress-dot.active {
  background-color: #007bff;
}
</style>
