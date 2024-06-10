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
          <li>
            Managed client support for EMEA & APAC regions alone for 5 months, maintaining a high
            satisfaction rate of 95%
          </li>
          <li>Mentored and managed new hires, reducing onboarding time by 20%</li>
          <li>Named ROY for my efficiency in handling tasks at Celtra</li>
        </ul>
      </section>

      <section id="academic-achievements">
        <h2>Academic Achievements</h2>
        <ul>
          <li>
            Graduated with a master's degree in Economic and Business Sciences from the Faculty of
            Economics and Business
          </li>
          <li>
            Completed thesis on "The COVID-19 Impact to the Cyber Security in Business Environment"
          </li>
          <li>
            Graduated with a bachelor's degree in Economics and Business Sciences, with a thesis on
            "Artificial Intelligence in Economy"
          </li>
          <li>
            Obtained multiple Sololearn certificates in various programming languages and
            technologies, including:
            <ul>
              <li>
                <a href="https://www.sololearn.com/certificates/CT-JJKNSZR3" target="_blank">SQL</a>
              </li>
              <li>
                <a href="https://www.sololearn.com/certificates/CT-1Z7RZGDJ" target="_blank"
                  >Javascript</a
                >
              </li>
              <li>
                <a href="https://www.sololearn.com/certificates/CT-MAJ8JHCN" target="_blank"
                  >Python</a
                >
              </li>
              <li>
                <a href="https://www.sololearn.com/certificates/CT-8F3Q6YZI" target="_blank"
                  >HTML</a
                >
              </li>
              <li>
                <a href="https://www.sololearn.com/certificates/CT-BD1ORZXL" target="_blank"
                  >jQuery</a
                >
              </li>
              <li>
                <a href="https://www.sololearn.com/certificates/CT-SQDSNR2P" target="_blank">PHP</a>
              </li>
              <li>
                <a href="https://www.sololearn.com/certificates/CT-HIZN3C5R" target="_blank"
                  >Java</a
                >
              </li>
              <li>
                <a href="https://www.sololearn.com/certificates/CT-G3VYTBHM" target="_blank"
                  >React + Redux</a
                >
              </li>
            </ul>
          </li>
          <li>
            Certificate of Salesforce Knowledge (Issued by: Microsoft Imagine Academy, only physical
            copy)
          </li>
          <li>
            Certificate of Visio 2013 Knowledge (Issued by: Microsoft Imagine Academy, only physical
            copy)
          </li>
          <li>
            Certificate of completed course: Basics of SQL (Issued by: Faculty of Economics and
            Business and KPMG, only physical copy)
          </li>
          <li>
            Udemy Certificate of completion: Digital Marketing & Advertising Masterclass - 87+
            Lectures
            <a
              href="https://www.udemy.com/certificate/UC-836fb2ed-f7e7-4c01-9e8d-d07cb0f20896/"
              target="_blank"
              >View Certificate</a
            >
          </li>
          <li>
            Celtra Newcomer of the Year Award (Awarded to newly hired employee with the best
            performance throughout the year)
          </li>
        </ul>
      </section>

      <section id="personal-achievements">
        <h2>Personal Achievements</h2>
        <ul>
          <li>
            Developed responsive web applications, resulting in improved site performance and
            increased user engagement
          </li>
          <li>
            Created and maintained custom WordPress themes and plugins, enhancing website
            functionality and user experience
          </li>
          <li>
            Streamlined the onboarding process for new hires, reducing onboarding time by 20%
            through efficient training sessions and comprehensive documentation
          </li>
          <li>
            Delivered exceptional technical support, consistently achieving a client satisfaction
            rate of over 95%
          </li>
          <li>Improved team workflows by developing custom scripts and tools like workloggers</li>
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
