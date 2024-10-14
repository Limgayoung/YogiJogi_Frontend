TripMap.vue

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
    // orderBottomMargin: '40px'
  });
};

// 마커 삭제하기 버튼의 함수입니다
const deleteMarker = () => {
  markerList.value.pop();
};

const toggleItem = (clickedItem) => {
  items.value.forEach((item) => {
    item.active = item === clickedItem ? !item.active : false;
  });
};


const categories = [
  "🌄 관광지",
  "📖 문화시설",
  "👨‍👩‍👧‍👦 행사",
  "🏀 레포츠",
  "👜 쇼핑",
  "🍴 음식점",
];

const items = [
  { title: "추천테마", icon: "mdi-star" },
  { title: "여행코스", icon: "mdi-map" },
  { title: "인기여행지", icon: "mdi-heart" },
  { title: "나의여행", icon: "mdi-account" },
];
</script>

<template>
  <div class="navbar-left">
    <v-card class="custom-card">
      <v-layout>
        <v-navigation-drawer permanent width="100">
          <v-toolbar flat>
            <v-list>
              <v-list-item>
                <v-list-item-title class="title">
                  Application
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-toolbar>

          <v-divider></v-divider>

          <v-list
            dense
            class="pt-0"
            style="display: flex; flex-direction: column; align-items: center"
          >
            <v-btn
              v-for="item in items"
              :key="item.title"
              @click="toggleItem(item)"
              class="left-navbar-btn"
              :color="item.active ? 'yellow' : ''"
              >
              <!-- <div class="icon-wrapper">
                <v-icon size="40">{{ item.icon }}</v-icon>
              </div> -->
              <div class="title-wrapper">
                <v-list-item-title style="font-size: 14px">
                  {{ item.title }}
                </v-list-item-title>
              </div>
            </v-btn>
          </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer permanent class="category-list">
          <v-card
            variant="outlined"
            class="mx-auto"
            color="surface-variant"
            max-width="344"
            height="100px"
          >
            <v-row align="center">
              <!-- 왼쪽에 이미지 -->
              <v-col cols="12" sm="5">
                <v-img
                  class="card-img"
                  src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=cbeefd27-1f65-4a07-8f16-6705807bae9d"
                  alt="Image Alt Text"
                >
                </v-img>
              </v-col>

              <!-- 오른쪽에 제목과 부제목 -->
              <v-col
                cols="12"
                sm="7"
                style="height: 100%"
                class="right-element"
              >
                <v-card-title>경복궁</v-card-title>
                <v-card-subtitle>주소주소주소입니다.</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
          <v-card
            variant="outlined"
            class="mx-auto"
            color="surface-variant"
            max-width="344"
            height="100px"
          >
            <v-row align="center">
              <!-- 왼쪽에 이미지 -->
              <v-col cols="12" sm="5">
                <v-img
                  class="card-img"
                  src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=cbeefd27-1f65-4a07-8f16-6705807bae9d"
                  alt="Image Alt Text"
                >
                </v-img>
              </v-col>

              <!-- 오른쪽에 제목과 부제목 -->
              <v-col
                cols="12"
                sm="7"
                style="height: 100%"
                class="right-element"
              >
                <v-card-title>멀티캠퍼스</v-card-title>
                <v-card-subtitle>주소주소주소입니다.</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
  <div>
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

    <div class="top-btn">
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
    </div>
    <div>
      <button class="demo-button" @click="addMarker" style="margin-right: 10px">
        마커 추가하기
      </button>
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
  font-family: "GongGothicMedium";
}

.top-btn {
  position: absolute; /* 절대 위치 지정 */
  top: -720px; /* 원하는 위치로 조정 */
  left: 400px; /* 원하는 위치로 조정 */
  z-index: 1; /* 카카오맵 위에 표시되도록 설정 */
  margin-left: 0;
}

.v-item-group .v-item {
  margin-right: 10px; /* 원하는 간격으로 조절합니다. */
}
.navbar-left {
  top: 0; /* 페이지의 맨 위에 위치하도록 설정합니다. */
  left: 0; /* 좌측에 위치하도록 설정합니다. */
  z-index: 2; 
}
</style>
