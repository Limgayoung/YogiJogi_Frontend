<script setup>
import { ref, onMounted } from "vue";
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

const fetchPlanDetails = async () => {
  const id = route.params.id;
  try {
    const response = await axios.get(`http://localhost/api/trips/search/${id}`);
    console.log(response);
    const data = response.data.data;
    travelPlan.value = {
      title: data.title,
      startDate: data.createdAt,
      endDate: data.updatedAt,
      nickname: data.userName,
      theme: data.tripThemeId,
      views: data.views,
    };
    spaces.value = data.schedules.map(schedule => ({
      title: `Day ${schedule.dateSequence}`,
      items: [
        {
          name: schedule.spotInfo.spot.name,
        }
      ],
      content: schedule.spotInfo.spot.address,
    }));
    markerList.value = data.schedules.map(schedule => ({
      lat: schedule.spotInfo.spot.latitude,
      lng: schedule.spotInfo.spot.longitude,
      image,
      order: schedule.scheduleSequence.toString(),
    }));
  } catch (error) {
    console.error("Error fetching travel plan details:", error);
  }
};

onMounted(fetchPlanDetails);

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
        <v-stepper alt-labels>
          <v-stepper-header>
            <v-stepper-item v-for="(space, spaceIndex) in spaces" :key="spaceIndex">
              {{ space.title }}
            </v-stepper-item>
          </v-stepper-header>
          <div v-for="(space, spaceIndex) in spaces" :key="spaceIndex">
            <v-stepper-content :step="spaceIndex + 1">
              <v-card>
                <v-card-text>
                  <div v-for="(item, itemIndex) in space.items" :key="itemIndex">
                    {{ item.name }}
                  </div>
                </v-card-text>
              </v-card>
            </v-stepper-content>
          </div>
        </v-stepper>
        <div class="text-center mb-4" style="margin-top: 15px">
          <div class="content-des" v-for="(space, spaceIndex) in spaces" :key="spaceIndex">
            {{ space.content }}
          </div>
        </div>
      </div>
    </div>
    <v-row>
      <div>🔎GPT로 여행 이동 경로 시간 알아보기</div>
      <v-btn>click!</v-btn>
    </v-row>
  </div>
</template>

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
</style>
