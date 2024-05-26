<template>
  <app-wrapper :app="props.app" :width="450" :height="400">
    <div id="map">
      <l-map
        :useGlobalLeaflet="false"
        v-model:zoom="zoom"
        :center="[46.04998, 14.50686]"
        style="height: 100%; width: 100%"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <l-geo-json :geojson="geojson" :options="geojsonOptions" />
      </l-map>
    </div>
  </app-wrapper>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import { LMap, LGeoJson, LTileLayer } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import AppWrapper from './shared/AppWrapper.vue'
import type { OpenedApp } from '@/stores/types'

const props = defineProps<{
  app: OpenedApp
}>()

const zoom = ref(7)

const geojson = ref({
  type: 'FeatureCollection',
  features: [
    // Your GeoJSON features here
  ]
})

const geojsonOptions = ref({
  // Options that don't rely on Leaflet methods.
})

onMounted(async () => {
  // Load Leaflet components only in client-side
  const { circleMarker } = await import('leaflet/dist/leaflet-src.esm')

  // Use the Leaflet circleMarker function in the geojsonOptions
  geojsonOptions.value.pointToLayer = (feature, latLng) => circleMarker(latLng, { radius: 8 })
})
</script>

<style>
/* Ensure the map container takes the full size of its parent */
#map {
  height: 100%;
  width: 100%;
}
</style>
