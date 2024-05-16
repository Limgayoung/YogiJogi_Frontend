<script setup>
import DefaultMap from '@/components/map/DefaultMap.vue'
import TripMap from '@/components/map/TripMap.vue'
import LeftNav from '@/components/map/LeftNav.vue'

</script>

<template>
    <div class="container">
        <!-- <DefaultMap></DefaultMap> -->
        <LeftNav></LeftNav>
        <TripMap></TripMap>
    </div>

</template>

<style>
.container {
    display: flex;
}

/* TripMap의 스타일을 조정하여 우측에 붙이기 */
.TripMap {
    flex: 1;
    /* TripMap이 남은 공간을 모두 차지하도록 함 */
}
</style>