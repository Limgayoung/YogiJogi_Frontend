<template>
  <div>
    <div class="kakao-map-wrapper">
      <KakaoMap width="100%" height="45rem" :lat="33.450701" :lng="126.570667" @onLoadKakaoMap="onLoadKakaoMap" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { KakaoMap } from 'vue3-kakao-maps';
import { useSearchStore } from '@/stores/searchStore.js';

// Pinia 스토어 사용
const searchStore = useSearchStore();
const searchResults = ref(searchStore.searchResults);

const map = ref(null);
let bounds = null;

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  bounds = new kakao.maps.LatLngBounds();
  setMarkers(searchResults.value);
};

const setMarkers = (results) => {
  if (map.value && bounds) {
    // 기존 마커 제거
    map.value.markers?.forEach(marker => marker.setMap(null));
    bounds = new kakao.maps.LatLngBounds();

    results.forEach((result) => {
      const point = new kakao.maps.LatLng(result.spot.latitude, result.spot.longitude);
      const marker = new kakao.maps.Marker({
        position: point,
      });
      marker.setMap(map.value);
      bounds.extend(point);
    });

    map.value.setBounds(bounds);
  }
};

watch(
  () => searchStore.searchResults,
  (newResults) => {
    searchResults.value = newResults;
    setMarkers(newResults);
  }
);

</script>

<style scoped>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
div {
  width: 100%;
  height: 100%;
}

.demo-button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 14px;
  background-color: #ffc700;
  border: none;
  color: white;
  cursor: pointer;
}

.demo-button:hover {
  background-color: #e0b400;
}
</style>
