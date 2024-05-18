TheMapView.vue

<script setup>
import DefaultMap from "@/components/map-test/DefaultMap.vue";
import TripMap from "@/components/map-test/TripMap.vue";
import Navbar from "@/components/map-test/Navbar.vue";
</script>

<template>
  <div class="container">
    <Navbar></Navbar>
    <TripMap></TripMap>
  </div>
</template>

<style>
.container {
  display: flex;
}

.Navbar {
  flex: 1; /* Navbar의 크기를 자동으로 설정 */
}

.TripMap {
  flex: 1; /* TripMap이 나머지 공간을 모두 채우도록 설정 */
}
</style>
