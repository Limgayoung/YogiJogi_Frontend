<script setup>
import { ref } from "vue";
import {
  KakaoMap,
  KakaoMapMarkerPolyline,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";

/**
 * 해당 장소에 대한 세부 내용 Server로부터 받는다.
 * 받은 정보를 토대로 마커 띄우고 인포윈도우 띄운다.
 * 사이드바의 추가 버튼으로 여행 계획에 해당 장소를 추가할 수 있다.
 */
const image = {
  imageSrc: "src/assets/images/marker/15.png",
  imageWidth: 30,
  imageHeight: 40,
};

const newImage = {
  imageSrc: "src/assets/images/marker/12.png",
  imageWidth: 30,
  imageHeight: 40,
};

const markerList = ref([
  { lat: 33.4509, lng: 126.571, image, order: "출발" },
  { lat: 33.451, lng: 126.572, image },
  { lat: 33.452, lng: 126.573, image },
  { lat: 33.4518, lng: 126.5725, image },
]);

// 마커 추가하기 버튼의 함수입니다
const addMarker = () => {
  markerList.value.push({
    lat: 33.4509 + Math.random() * 0.003,
    lng: 126.571 + Math.random() * 0.003,
    image,
  });
};

// 마커 삭제하기 버튼의 함수입니다
const deleteMarker = () => {
  markerList.value.pop();
};

// Define the onClickKakaoMapMarker method
const onClickKakaoMapMarker = () => {
  alert("Marker clicked!");
};

const categories = [
  "🌄 관광지",
  "📖 문화시설",
  "👨‍👩‍👧‍👦 행사",
  "🏀 레포츠",
  "👜 쇼핑",
  "🍴 음식점",
];
</script>
<template>
  <div>
    <!-- <div class="top-btn">
      <v-item-group selected-class="bg-yellow" multiple>
        <div class="text-caption mb-2">Tags</div>
        <v-item
          v-for="(category, index) in categories"
          :key="index"
          v-slot="{ selectedClass, toggle }"
        >
          <v-chip :class="selectedClass" @click="toggle">{{ category }}</v-chip>
        </v-item>
      </v-item-group>
    </div> -->
    <div class="kakao-map-wrapper">
    <KakaoMap width="100%" height="45rem" :lat="33.452" :lng="126.573">
      <KakaoMapMarkerPolyline
        :markerList="markerList"
        :showMarkerOrder="true"
        strokeColor="#C74C5E"
        :strokeOpacity="1"
        strokeStyle="shortdot"
      />

      <KakaoMapMarker
        :lat="33.450705"
        :lng="126.570667"
        :image="newImage"
        @onClickKakaoMapMarker="onClickKakaoMapMarker"
        :clickable="true"
      />
    </KakaoMap>
  </div>
    <div>
      <button class="demo-button" @click="addMarker">마커 추가하기</button>
      <button class="demo-button" @click="deleteMarker">마커 삭제하기</button>
    </div>
  </div>
</template>
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

.top-btn {
  font-family: "GongGothicMedium";
  position: absolute; /* 절대 위치 지정 */
  top: -520px; /* 원하는 위치로 조정 */
  left: 500px; /* 원하는 위치로 조정 */
  z-index: 2; /* 카카오맵 위에 표시되도록 설정 */
  margin-left: 0;
}

.v-item-group .v-item {
  margin-right: 10px; /* 원하는 간격으로 조절합니다. */
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

/* .kakao-map-wrapper{
  margin-top: 15px;
} */
</style>
