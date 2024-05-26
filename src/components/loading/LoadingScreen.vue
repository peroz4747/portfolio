<template>
  <div class="loading-wrapper">
    <div class="loading-grid">
      <img class="loading-spinner" src="#" />
      <h3 class="loading-text">LOADING</h3>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loading-wrapper {
  margin: auto;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #000;
  color: #ffff;
}
.loading-spinner {
  width: 75px;
  height: 75px;
  font-size: medium;
  font-family: sans-serif;
}
</style>
