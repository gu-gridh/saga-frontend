<template>
    <div class="letters-view">
        <div id="map"></div>
    </div>
</template>

<script setup lang="ts">
import { fetchCaseSite } from '@/assets/db';
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const letters = ref([]);

onMounted(() => {
    initMap();

});

const initMap = () => {
    const map = L.map('map').setView([60.1695, 24.9354], 13); // Helsinki coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    return map;
};
</script>

<style scoped>
.letters-view {
    position: relative;
    height: 100vh;
    width: 100%;
    padding: 20px;
}
#map {
    height: 80vh;
    width: 80%;
    position: absolute;
    top: 0;
    left: 0;

}

</style>