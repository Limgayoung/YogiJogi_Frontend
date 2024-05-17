<script setup>
import { ref } from "vue";
// import Sidebar from "@/components/bootstrapTest/Sidebar.vue";
// import TripMap from "@/components/bootstrapTest/TripMap.vue";
import Sidebar from "@/components/bootstrapTest/Sidebar.vue";
import TripMap from "@/components/bootstrapTest/TripMap.vue";
</script>

<template>
  <div class="container">
    <Sidebar></Sidebar>
    <!-- <TopButton></TopButton> -->
    <TripMap></TripMap>
  </div>
</template>

<style>
.container {
  display: flex;
}

.Sidebar {
  z-index: 1;
}

.TripMap {
  flex: 1; /* TripMap이 나머지 공간을 모두 채우도록 설정 */
}
</style>
