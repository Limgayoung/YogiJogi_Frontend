<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import {
  KakaoMap,
  KakaoMapMarkerPolyline,
  KakaoMapMarker,
} from "vue3-kakao-maps";

const route = useRoute();
const travelPlan = ref({
  title: '',
  startDate: '',
  endDate: '',
  nickname: '',
  theme: '',
  views: 0,
});

const spaces = ref([]);
const markerList = ref([]);
// const kakaoMarkerList = ref([]);
const map = ref(null);
let bounds = null;
const loading = ref(true); // 로딩 상태 변수
const mapCenter = ref({ lat: 37.5665, lng: 126.978 }); // 서울의 위도와 경도

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
// const onLoadKakaoMap = (mapRef) => {
//   map.value = mapRef;
//   bounds = new kakao.maps.LatLngBounds();
//   setMarkers(searchResults.value);
// };

// const setMarkers = (results) => {
//   if (!results || results.length === 0) {
//     clearMarkers(); // 기존 마커 제거
//     return;
//   }

//   if (map.value && bounds) {
//     clearMarkers(); // 기존 마커 제거
//     bounds = new kakao.maps.LatLngBounds();

//     results.forEach((result) => {
//       const point = new kakao.maps.LatLng(result.spot.latitude, result.spot.longitude);
//       const marker = new kakao.maps.Marker({
//         position: point,
//       });
//       marker.setMap(map.value);
//       markers.value.push(marker); // 새로운 마커 저장
//       bounds.extend(point);
//     });

//     map.value.setBounds(bounds);
//   }
// };


// watch(kakaoMarkerList, (newVal) => {
//   console.log("kakao Marker list updated:", newVal);
// });

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
    // 기존 마커 제거
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

const fetchPlanDetails = async () => {
  const id = route.params.id;
  // console.log("params으로 받은 id: ", id);
  try {
    const response = await axios.get(`http://localhost/api/trips/search/${id}`);
    console.log("response: ", response);
    const data = response.data.data;
    travelPlan.value = {
      title: data.title,
      startDate: data.createdAt,
      endDate: data.updatedAt,
      nickname: data.userName,
      theme: data.tripThemeId,
      views: data.views,
    };

    // dataSequence 별로 그룹화
    const groupedSchedules = data.schedules.reduce((acc, schedule) => {
      const { dateSequence } = schedule;
      if (!acc[dateSequence]) {
        acc[dateSequence] = { items: [], content: data.content[dateSequence - 1] };
      }
      acc[dateSequence].items.push(schedule);
      return acc;
    }, {});

    // 그룹화된 데이터를 배열로 변환 및 scheduleSequence 순서대로 정렬
    spaces.value = Object.keys(groupedSchedules).map(dateSequence => {
      return {
        title: `Day ${dateSequence}`,
        items: groupedSchedules[dateSequence].items
          .sort((a, b) => a.scheduleSequence - b.scheduleSequence)
          .map(schedule => ({
            name: schedule.spotInfo.spot.name,
            address: schedule.spotInfo.spot.address,
            imgUrl: schedule.spotInfo.spot.imgUrl // imgUrl을 spotInfo.spot에서 가져옴
          })),
        content: groupedSchedules[dateSequence].content
      };
    });

    // console.log(spaces.value);

    markerList.value = data.schedules.map(schedule => ({
      key: schedule.index,
      lat: schedule.spotInfo.spot.latitude,
      lng: schedule.spotInfo.spot.longitude,
      // order: schedule.scheduleSequence.toString(),
    })).filter(marker => marker.lat && marker.lng); // 필터링 추가
    // console.log('markerList: ', markerList.value);

    setMarkers(markerList.value); // 여기서 마커 설정 -> 맵 bound 설정
  } catch (error) {
    console.error("Error fetching travel plan details:", error);
  } finally {
    loading.value = false;
  }

};

onMounted(async () => { 
  // console.log('loading 전: ', loading.value); 
  await fetchPlanDetails();
  // console.log('loading 후: ', loading.value);
});

const setLike = () => {
  // 좋아요 버튼 클릭 처리 로직
};

const setFavoContentDetail = () => {
  // 북마크 버튼 클릭 처리 로직
};

const openPrint = () => {
  // 인쇄 버튼 클릭 처리 로직
};

const myCourseCartDetail = (type, id, other) => {
  // 코스 버튼 클릭 처리 로직
};

const openShare = () => {
  // 공유 버튼 클릭 처리 로직
};

const onClickKakaoMapMarker = () => {
  alert("Marker clicked!");
};
</script>

<template>
  <div class="container-plan-detail">
    <div v-if="loading">로딩 중...</div>
    <div v-else>
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
        <div class="button-container">
          <div class="left_section">
            <button type="button" class="btn_good" @click="setLike">
              <span class="mdi mdi-heart-outline" style="font-size: 24px"></span>
              <span class="num" id="conLike">0</span>
            </button>
            <span class="num_view">
              <em class="tit">
                <span class="mdi mdi-eye-outline" style="font-size: 24px"></span>
              </em>
              <span class="num" id="conRead">{{ travelPlan.views }}</span>
            </span>
          </div>
          <div class="right_section">
            <button type="button" class="btn_bookmark" @click="setFavoContentDetail">
              <span class="mdi mdi-bookmark-outline" style="font-size: 24px"></span>
            </button>
            <button type="button" class="btn_print" @click="openPrint" title="새창 열림">
              <span class="mdi mdi-printer-outline" style="font-size: 24px"></span>
            </button>
            <button type="button" class="btn_cos" @click="myCourseCartDetail('C', '12', '')">
              <span class="mdi mdi-map" style="font-size: 24px"></span>
            </button>
            <button type="button" class="btn_sharing" @click="openShare">
              <span class="mdi mdi-share-variant-outline" style="font-size: 24px"></span>
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div class="kakao-map-wrapper-detail">
        <!-- <KakaoMap width="80%" height="25rem" :lat="37.5099674377" :lng="127.0377755568"> -->
        <KakaoMap width="80%" height="25rem" :lat="33.452" :lng="126.573" @onLoadKakaoMap="onLoadKakaoMap">
            <KakaoMapMarkerPolyline :markerList="markerList" :showMarkerOrder="true" strokeColor="#C74C5E"
            :strokeOpacity="1" strokeStyle="solid" />
        </KakaoMap>
      </div>

      <div class="body-content">
        <div class="timeline">
          <v-stepper alt-labels v-for="(space, spaceIndex) in spaces" :key="spaceIndex">
            <v-stepper-header>
              <v-stepper-item>{{ space.title }}</v-stepper-item>
              <v-stepper-item v-for="(item, itemIndex) in space.items" :key="itemIndex" :title="item.name"
                :value="itemIndex + 1">
                <div class="stepper-title">{{ item.address }}</div>
                <div class="stepper-image"><img :src="item.imgUrl" alt=""></div>
              </v-stepper-item>
            </v-stepper-header>
            <v-stepper-content>
              <v-card>
                <v-card-text>
                  <div class="content-des">내용: {{ space.content }}</div>
                </v-card-text>
              </v-card>
            </v-stepper-content>
          </v-stepper>
        </div>
      </div>
      <v-row>
        <div>🔎GPT로 여행 이동 경로 시간 알아보기</div>
        <v-btn>click!</v-btn>
      </v-row>
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff") format("woff");
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
  text-align: center;
  /* 텍스트를 가운데 정렬 */
}

.kakao-map-wrapper-detail {
  margin-left: 300px;
  margin-bottom: 70px;
  margin-top: 70px;
}

.buttons {
  margin-left: 300px;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
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

.stepper-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stepper-image img {
  width: 100px;
  /* 이미지 가로 크기 조절 */
  height: auto;
  /* 이미지 세로 크기는 비율에 맞게 자동 조절 */
  opacity: 1;
  /* 불투명도 설정 */
  display: block;
  margin-left: auto;
  margin-right: auto;
}

img {
  width: 120px;
  /* 이미지 가로 크기 조절 */
  height: auto;
  /* 이미지 세로 크기는 비율에 맞게 자동 조절 */
  opacity: 1;
  /* 불투명도 설정 */
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.v-stepper {
  margin-bottom: 40px;
  /* 일자 간 간격 추가 */
}
</style>
