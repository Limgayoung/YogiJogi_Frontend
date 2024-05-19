<template>
  <div class="container-plan-detail">
    <div class="text-center mb-4">
      <div class="head-text">{{ travelPlan.title }}</div>
    </div>
    <div class="text-center mb-4">
      <div class="travel-info">
        <div class="travel-date">
          여행 일정: {{ travelPlan.startDate }} ~ {{ travelPlan.endDate }}
        </div>
        <div class="travel-theme">테마: {{ travelPlan.theme }}</div>
        <div class="nickname">닉네임: {{ travelPlan.nickname }}</div>
      </div>
    </div>

    <div class="buttons">
        <div style="display: flex; align-items: center; justify-content: space-between; width: 80%;">
                <div class="left_section">
                    <button type="button" class="btn_good" onclick="setLike();">
                        <span class="mdi mdi-heart-outline" style="font-size: 24px;"></span>
                        <span class="num" id="conLike">0</span>
                    </button>
                    <span class="num_view"><em class="tit"><span class="mdi mdi-eye-outline"
                                style="font-size: 24px;"></span></em><span class="num" id="conRead">904</span></span>
                </div>
                <div class="right_section">
                    <button type="button" class="btn_bookmark" onclick="setFavoContentDetail();">
                        <span class="mdi mdi-bookmark-outline" style="font-size: 24px;"></span>
                    </button>
                    <button type="button" class="btn_print" onclick="openPrint();" title="새창 열림">
                        <span class="mdi mdi-printer-outline" style="font-size: 24px;"></span>
                    </button>
                    <button type="button" class="btn_cos" onclick="myCourseCartDetail('C','12','');">
                        <span class="mdi mdi-map" style="font-size: 24px;"></span>
                    </button>
                    <button type="button" class="btn_sharing" onclick="openShare();">
                        <span class="mdi mdi-share-variant-outline" style="font-size: 24px;"></span>
                    </button>
                </div>
            </div>
    </div>
    
    <hr>
    <div class="kakao-map-wrapper-detail">
      <KakaoMap width="80%" height="25rem" :lat="33.452" :lng="126.573">
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

    <div class="body-content">
      <div class="timeline">
        <v-stepper
          alt-labels
          v-for="(space, spaceIndex) in spaces"
          :key="spaceIndex"
        >
          <v-stepper-header>
            <v-stepper-item>{{ space.title }}</v-stepper-item>
            <v-stepper-item
              v-for="(item, itemIndex) in space.items"
              :key="itemIndex"
              :title="item.name"
              :value="itemIndex + 1"
            >
            </v-stepper-item>
          </v-stepper-header>
          <div class="text-center mb-4" style="margin-top: 15px">
            <div class="content-des">{{ space.content }}</div>
          </div>
        </v-stepper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spaces: [
        {
          title: "1일차",
          items: [
            { name: "강남역" },
            { name: "멀티캠퍼스" },
            { name: "대림역" },
          ],
          content: "강남역 갔다가 멀캠에서 교육 듣고 대림역으로 집에 가자,,",
        },
        {
          title: "2일차",
          items: [{ name: "역삼역" }, { name: "노브랜드버거" }],
          content: "역삼역에서 돌아다니다가 노브랜드버거 먹으면 됌",
        },
      ],
      travelPlan: {
        title: "강남 나들이",
        startDate: "2024-05-19",
        endDate: "2024-05-20",
        nickname: "우히히",
        theme: "SSAFY",
      },
    };
  },
};
</script>

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
</script>

<style>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.head-text {
  font-size: 50px;
  margin-top: 30px;
}

.container-plan-detail {
  font-family: "GongGothicMedium";
}

.body-content {
  margin-top: 50px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 100px;
}

.content-des {
  margin-top: 20px;
  font-size: 20px;
}

.kakao-map-wrapper-detail {
  margin-left: 300px;
  margin-bottom: 70px;
  margin-top: 70px;
}

.buttons{
    margin-left: 300px;
}

.right_section {
    display: flex;
    justify-content: space-between;
}

.right_section button {
    margin-right: 10px;
}

.left_section {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left_section span,
.left_section button {
    margin-right: 10px;
    /* 각 요소 사이의 오른쪽 여백 설정 */
}
</style>
