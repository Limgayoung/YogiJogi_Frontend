<template>
  <div>
    <div class="kakao-map-wrapper">
      <KakaoMap
        width="100%"
        height="45rem"
        :lat="33.450701"
        :lng="126.570667"
        @onLoadKakaoMap="onLoadKakaoMap"
      >
        <!-- Conditionally render Polyline or Markers -->
        <template v-if="drawLines">
          <KakaoMapMarkerPolyline
            :markerList="markerList"
            :showMarkerOrder="true"
            strokeColor="#C74C5E"
            :strokeOpacity="1"
            strokeStyle="solid"
          />
        </template>
        <template v-else>
          <KakaoMapMarker
            v-for="(marker, index) in markerList"
            :lat="marker.lat"
            :lng="marker.lng"
            :infoWindow="marker.infoWindow"
            :clickable="true"
            @onClickKakaoMapMarker="onClickMapMarker(marker)"
          />
        </template>
      </KakaoMap>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { KakaoMap, KakaoMapMarkerPolyline, KakaoMapMarker } from "vue3-kakao-maps";
import { useSearchStore } from "@/stores/searchStore.js";

const searchStore = useSearchStore();
const searchResults = ref(searchStore.searchResults);
const drawLines = ref(searchStore.drawLines);

const map = ref(null);
let bounds = null;
const markerList = ref([]);

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  bounds = new kakao.maps.LatLngBounds();
  setMarkers(markerList.value);
};

const setMarkers = (results) => {
  if (!results || results.length === 0) {
    return;
  }

  if (map.value && bounds) {
    map.value.markers?.forEach(marker => marker.setMap(null));
    bounds = new kakao.maps.LatLngBounds();

    results.forEach((result) => {
      if (result.lat && result.lng) {
        const point = new kakao.maps.LatLng(result.lat, result.lng);
        bounds.extend(point);
      }
    });
    map.value.setBounds(bounds);
  }
};

// const clearMarkers = () => {
//   markerList.value.forEach((marker) => marker.setMap(null));
// };

watch(
  () => searchStore.searchResults,
  (newResults) => {
    searchResults.value = newResults;
    markerList.value = newResults
      .map((spot) => ({
        lat: spot.spot.latitude,
        lng: spot.spot.longitude,
      }))
      .filter((marker) => marker.lat && marker.lng);
    setMarkers(markerList.value);
  }
);

watch(
  () => searchStore.drawLines,
  (newValue) => {
    drawLines.value = newValue;
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
